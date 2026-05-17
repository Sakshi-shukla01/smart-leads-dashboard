import { Response } from 'express';
import { body, query } from 'express-validator';
import { FilterQuery } from 'mongoose';
import Lead from '../models/lead.model';
import { AuthRequest, ILead, LeadSource, LeadStatus, UserRole } from '../types';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse';
import { generateCSV } from '../utils/csvExport';

// ─── Validation Rules ─────────────────────────────────────────────────────────

export const leadValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),

  body('status')
    .optional()
    .isIn(Object.values(LeadStatus)).withMessage('Invalid status'),

  body('source')
    .notEmpty().withMessage('Source is required')
    .isIn(Object.values(LeadSource)).withMessage('Invalid source'),
];

export const queryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be 1–100'),
  query('status').optional().isIn(Object.values(LeadStatus)).withMessage('Invalid status filter'),
  query('source').optional().isIn(Object.values(LeadSource)).withMessage('Invalid source filter'),
  query('sort').optional().isIn(['latest', 'oldest']).withMessage('Sort must be latest or oldest'),
];

// ─── Helper: Build Filter Query ───────────────────────────────────────────────

const buildFilterQuery = (
  queryParams: Record<string, string | undefined>,
  userId: string,
  userRole: UserRole
): FilterQuery<ILead> => {
  const filter: FilterQuery<ILead> = {};

  // Sales users can only see their own leads; admins see all
  if (userRole === UserRole.Sales) {
    filter.createdBy = userId;
  }

  if (queryParams.status) filter.status = queryParams.status;
  if (queryParams.source) filter.source = queryParams.source;

  if (queryParams.search) {
    const searchRegex = new RegExp(queryParams.search, 'i');
    filter.$or = [
      { name: searchRegex },
      { email: searchRegex },
    ];
  }

  return filter;
};

// ─── GET /leads ───────────────────────────────────────────────────────────────

export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      page = '1',
      limit = '10',
      status,
      source,
      search,
      sort = 'latest',
    } = req.query as Record<string, string | undefined>;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const filter = buildFilterQuery(
      { status, source, search },
      req.user!.id,
      req.user!.role
    );

    const sortOrder = sort === 'oldest' ? 1 : -1;

    const [leads, totalRecords] = await Promise.all([
      Lead.find(filter)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limitNum)
        .populate('createdBy', 'name email'),
      Lead.countDocuments(filter),
    ]);

    sendPaginated(res, 'Leads fetched successfully', leads, pageNum, totalRecords, limitNum);
  } catch (error) {
    sendError(res, 'Failed to fetch leads', 500, (error as Error).message);
  }
};

// ─── GET /leads/:id ───────────────────────────────────────────────────────────

export const getLeadById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id).populate('createdBy', 'name email');
    if (!lead) {
      sendError(res, 'Lead not found', 404);
      return;
    }

    // Sales user can only view their own leads
    if (
      req.user!.role === UserRole.Sales &&
      lead.createdBy.toString() !== req.user!.id
    ) {
      sendError(res, 'Not authorized to view this lead', 403);
      return;
    }

    sendSuccess(res, 'Lead fetched successfully', lead);
  } catch (error) {
    sendError(res, 'Failed to fetch lead', 500, (error as Error).message);
  }
};

// ─── POST /leads ──────────────────────────────────────────────────────────────

export const createLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, status, source } = req.body as {
      name: string;
      email: string;
      status?: LeadStatus;
      source: LeadSource;
    };

    const lead = await Lead.create({
      name,
      email,
      status: status || LeadStatus.New,
      source,
      createdBy: req.user!.id,
    });

    sendSuccess(res, 'Lead created successfully', lead, 201);
  } catch (error) {
    sendError(res, 'Failed to create lead', 500, (error as Error).message);
  }
};

// ─── PATCH /leads/:id ─────────────────────────────────────────────────────────

export const updateLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      sendError(res, 'Lead not found', 404);
      return;
    }

    // Sales user can only update their own leads
    if (
      req.user!.role === UserRole.Sales &&
      lead.createdBy.toString() !== req.user!.id
    ) {
      sendError(res, 'Not authorized to update this lead', 403);
      return;
    }

    const { name, email, status, source } = req.body as Partial<{
      name: string;
      email: string;
      status: LeadStatus;
      source: LeadSource;
    }>;

    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, email, status, source },
      { new: true, runValidators: true }
    );

    sendSuccess(res, 'Lead updated successfully', updated);
  } catch (error) {
    sendError(res, 'Failed to update lead', 500, (error as Error).message);
  }
};

// ─── DELETE /leads/:id ────────────────────────────────────────────────────────

export const deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      sendError(res, 'Lead not found', 404);
      return;
    }

    // Only admin can delete leads
    if (req.user!.role !== UserRole.Admin) {
      sendError(res, 'Only admins can delete leads', 403);
      return;
    }

    await Lead.findByIdAndDelete(req.params.id);
    sendSuccess(res, 'Lead deleted successfully');
  } catch (error) {
    sendError(res, 'Failed to delete lead', 500, (error as Error).message);
  }
};

// ─── GET /leads/export/csv ─────────────────────────────────────────────────────

export const exportLeadsCSV = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, source, search } = req.query as Record<string, string | undefined>;

    const filter = buildFilterQuery(
      { status, source, search },
      req.user!.id,
      req.user!.role
    );

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    const csv = generateCSV(leads);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.status(200).send(csv);
  } catch (error) {
    sendError(res, 'Failed to export leads', 500, (error as Error).message);
  }
};