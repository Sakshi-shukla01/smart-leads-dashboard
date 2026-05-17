import { Response } from 'express';
import { ApiResponse, PaginatedResponse } from '../types';

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  error?: string
): Response => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    error,
  };
  return res.status(statusCode).json(response);
};

export const sendPaginated = <T>(
  res: Response,
  message: string,
  data: T[],
  currentPage: number,
  totalRecords: number,
  limit: number
): Response => {
  const totalPages = Math.ceil(totalRecords / limit);
  const response: PaginatedResponse<T> = {
    success: true,
    message,
    data,
    pagination: {
      currentPage,
      totalPages,
      totalRecords,
      limit,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
  return res.status(200).json(response);
};