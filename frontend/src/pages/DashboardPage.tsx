import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import LeadFiltersComponent from '../components/leads/LeadFilters';
import LeadTable from '../components/leads/LeadTable';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import LeadForm from '../components/leads/LeadForm';
import { useLeads } from '../hooks/useLeads';
import { LeadFormData } from '../types';

const DashboardPage: React.FC = () => {
  const {
    leads,
    pagination,
    isLoading,
    error,
    filters,
    setFilters,
    createLead,
    updateLead,
    deleteLead,
    exportCSV,
  } = useLeads();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    await exportCSV();
    setIsExporting(false);
  };

  const handleCreateLead = async (data: LeadFormData): Promise<boolean> => {
    return createLead(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Lead Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {pagination
                ? `${pagination.totalRecords} total leads`
                : 'Manage your sales pipeline'}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsCreateOpen(true)}
          >
            + Add Lead
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <LeadFiltersComponent
            filters={filters}
            onFilterChange={setFilters}
            onExportCSV={() => void handleExport()}
            isExporting={isExporting}
          />
        </div>

        {/* Error State */}
        {error && !isLoading && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200
            dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Table / Empty State */}
        {!error && leads.length === 0 && !isLoading ? (
          <EmptyState
            title="No leads found"
            description="Try adjusting your filters or add a new lead to get started."
            icon="📭"
            action={
              <Button variant="primary" onClick={() => setIsCreateOpen(true)}>
                Add Your First Lead
              </Button>
            }
          />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200
            dark:border-gray-700 overflow-hidden">
            <LeadTable
              leads={leads}
              onUpdate={updateLead}
              onDelete={deleteLead}
              isLoading={isLoading}
            />
            {pagination && (
              <Pagination
                pagination={pagination}
                onPageChange={(page) => setFilters({ page })}
              />
            )}
          </div>
        )}
      </main>

      {/* Create Lead Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add New Lead"
      >
        <LeadForm
          onSubmit={handleCreateLead}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default DashboardPage;