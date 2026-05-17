import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    sendError(res, 'Validation failed', 400, err.message);
    return;
  }

  // Mongoose duplicate key error
  if ((err as NodeJS.ErrnoException).code === '11000') {
    sendError(res, 'Duplicate field value entered', 400);
    return;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    sendError(res, 'Invalid token', 401);
    return;
  }

  if (err.name === 'TokenExpiredError') {
    sendError(res, 'Token expired', 401);
    return;
  }

  sendError(res, message, statusCode, err.message);
};

export const notFound = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
};