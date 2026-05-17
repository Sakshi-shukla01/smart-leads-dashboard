import { Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { AuthRequest, JwtPayload, UserRole } from '../types';
import { sendSuccess, sendError } from '../utils/apiResponse';

// ─── Validation Rules ─────────────────────────────────────────────────────────

export const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2–50 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('role')
    .optional()
    .isIn(Object.values(UserRole)).withMessage('Invalid role'),
];

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required'),
];

// ─── Token Generator ──────────────────────────────────────────────────────────

const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

// ─── Controllers ──────────────────────────────────────────────────────────────

export const register = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body as {
      name: string;
      email: string;
      password: string;
      role?: UserRole;
    };

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      sendError(res, 'User with this email already exists', 409);
      return;
    }

    const user = await User.create({ name, email, password, role });

    const token = generateToken({ id: user._id.toString(), role: user.role });

    sendSuccess(
      res,
      'Registration successful',
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      201
    );
  } catch (error) {
    sendError(res, 'Registration failed', 500, (error as Error).message);
  }
};

export const login = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    // Include password since it's excluded by default
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      sendError(res, 'Invalid credentials', 401);
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      sendError(res, 'Invalid credentials', 401);
      return;
    }

    const token = generateToken({ id: user._id.toString(), role: user.role });

    sendSuccess(res, 'Login successful', {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    sendError(res, 'Login failed', 500, (error as Error).message);
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }
    sendSuccess(res, 'User fetched', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    sendError(res, 'Failed to fetch user', 500, (error as Error).message);
  }
};