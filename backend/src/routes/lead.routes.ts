import { Router } from 'express';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  exportLeadsCSV,
  leadValidation,
  queryValidation,
} from '../controllers/lead.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { UserRole } from '../types';

const router = Router();

// All routes require authentication
router.use(protect);

router.get('/', queryValidation, validate, getLeads);
router.get('/export/csv', exportLeadsCSV);
router.get('/:id', getLeadById);
router.post('/', leadValidation, validate, createLead);
router.patch('/:id', leadValidation, validate, updateLead);
router.delete('/:id', restrictTo(UserRole.Admin), deleteLead);

export default router;