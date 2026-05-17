import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { leadsApi } from '../api/leadsApi';
import {
  Lead,
  LeadFilters,
  LeadFormData,
  PaginationMeta,
} from '../types';
import { useDebounce } from './useDebounce';

interface UseLeadsReturn {
  leads: Lead[];
  pagination: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  filters: LeadFilters;
  setFilters: (filters: Partial<LeadFilters>) => void;
  refetch: () => void;
  createLead: (data: LeadFormData) => Promise<boolean>;
  updateLead: (id: string, data: Partial<LeadFormData>) => Promise<boolean>;
  deleteLead: (id: string) => Promise<boolean>;
  exportCSV: () => Promise<void>;
}

export const useLeads = (): UseLeadsReturn => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<LeadFilters>({
    page: 1,
    sort: 'latest',
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const setFilters = useCallback((newFilters: Partial<LeadFilters>) => {
    setFiltersState((prev) => ({
      ...prev,
      ...newFilters,
      // Reset to page 1 when filters change (except page itself)
      page: 'page' in newFilters ? newFilters.page : 1,
    }));
  }, []);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await leadsApi.getLeads({
        ...filters,
        search: debouncedSearch,
      });
      setLeads(response.data);
      setPagination(response.pagination);
    } catch (err) {
      const message = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message || 'Failed to fetch leads';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  const createLead = useCallback(async (data: LeadFormData): Promise<boolean> => {
    try {
      await leadsApi.createLead(data);
      toast.success('Lead created successfully');
      void fetchLeads();
      return true;
    } catch (err) {
      const message = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message || 'Failed to create lead';
      toast.error(message);
      return false;
    }
  }, [fetchLeads]);

  const updateLead = useCallback(async (
    id: string,
    data: Partial<LeadFormData>
  ): Promise<boolean> => {
    try {
      await leadsApi.updateLead(id, data);
      toast.success('Lead updated successfully');
      void fetchLeads();
      return true;
    } catch (err) {
      const message = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message || 'Failed to update lead';
      toast.error(message);
      return false;
    }
  }, [fetchLeads]);

  const deleteLead = useCallback(async (id: string): Promise<boolean> => {
    try {
      await leadsApi.deleteLead(id);
      toast.success('Lead deleted successfully');
      void fetchLeads();
      return true;
    } catch (err) {
      const message = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message || 'Failed to delete lead';
      toast.error(message);
      return false;
    }
  }, [fetchLeads]);

  const exportCSV = useCallback(async (): Promise<void> => {
    try {
      const blob = await leadsApi.exportCSV({
        status: filters.status,
        source: filters.source,
        search: debouncedSearch,
        sort: filters.sort,
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('CSV exported successfully');
    } catch {
      toast.error('Failed to export CSV');
    }
  }, [filters, debouncedSearch]);

  return {
    leads,
    pagination,
    isLoading,
    error,
    filters,
    setFilters,
    refetch: fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    exportCSV,
  };
};