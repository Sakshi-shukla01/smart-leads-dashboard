import axiosInstance from './axios';
import {
  ApiResponse,
  Lead,
  LeadFilters,
  LeadFormData,
  PaginatedResponse,
} from '../types';

export const leadsApi = {
  getLeads: async (filters: LeadFilters): Promise<PaginatedResponse<Lead>> => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.source) params.append('source', filters.source);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.page) params.append('page', String(filters.page));
    params.append('limit', '10');

    const { data } = await axiosInstance.get<PaginatedResponse<Lead>>(
      `/leads?${params.toString()}`
    );
    return data;
  },

  getLeadById: async (id: string): Promise<Lead> => {
    const { data } = await axiosInstance.get<ApiResponse<Lead>>(`/leads/${id}`);
    return data.data!;
  },

  createLead: async (payload: LeadFormData): Promise<Lead> => {
    const { data } = await axiosInstance.post<ApiResponse<Lead>>('/leads', payload);
    return data.data!;
  },

  updateLead: async (id: string, payload: Partial<LeadFormData>): Promise<Lead> => {
    const { data } = await axiosInstance.patch<ApiResponse<Lead>>(
      `/leads/${id}`,
      payload
    );
    return data.data!;
  },

  deleteLead: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/leads/${id}`);
  },

  exportCSV: async (filters: Omit<LeadFilters, 'page'>): Promise<Blob> => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.source) params.append('source', filters.source);
    if (filters.search) params.append('search', filters.search);

    const response = await axiosInstance.get(
      `/leads/export/csv?${params.toString()}`,
      { responseType: 'blob' }
    );
    return response.data as Blob;
  },
};