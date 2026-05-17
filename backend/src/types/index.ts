import { Request } from 'express';
import { Document, Types } from 'mongoose';

// ─── Enums ────────────────────────────────────────────────────────────────────

export enum LeadStatus {
  New = 'New',
  Contacted = 'Contacted',
  Qualified = 'Qualified',
  Lost = 'Lost',
}

export enum LeadSource {
  Website = 'Website',
  Instagram = 'Instagram',
  Referral = 'Referral',
}

export enum UserRole {
  Admin = 'admin',
  Sales = 'sales',
}

// ─── Mongoose Document Types ──────────────────────────────────────────────────

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

export interface ILead extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Request Types ─────────────────────────────────────────────────────────────

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
  };
}

// ─── API Response Types ────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// ─── Query Filter Types ────────────────────────────────────────────────────────

export interface LeadQueryFilters {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: 'latest' | 'oldest';
  page?: number;
  limit?: number;
}

// ─── Auth Payload ──────────────────────────────────────────────────────────────

export interface JwtPayload {
  id: string;
  role: UserRole;
}