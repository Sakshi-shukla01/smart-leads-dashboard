
import React, { ChangeEvent } from 'react';
import { LeadFilters, LeadSource, LeadStatus } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface LeadFiltersProps {
  filters: LeadFilters;
  onFilterChange: (filters: Partial<LeadFilters>) => void;
  onExportCSV: () => void;
  isExporting?: boolean;
}

const LeadFiltersComponent: React.FC<LeadFiltersProps> = ({
  filters,
  onFilterChange,
  onExportCSV,
  isExporting = false,
}) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Search */}
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={filters.search || ''}
          onChange={handleSearch}
        />
      </div>

      {/* Status Filter */}
      <select
        value={filters.status || ''}
        onChange={(e) => onFilterChange({ status: e.target.value as LeadStatus | '' })}
        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
          text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2
          focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        {Object.values(LeadStatus).map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Source Filter */}
      <select
        value={filters.source || ''}
        onChange={(e) => onFilterChange({ source: e.target.value as LeadSource | '' })}
        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
          text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2
          focus:ring-blue-500"
      >
        <option value="">All Sources</option>
        {Object.values(LeadSource).map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={filters.sort || 'latest'}
        onChange={(e) => onFilterChange({ sort: e.target.value as 'latest' | 'oldest' })}
        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
          text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2
          focus:ring-blue-500"
      >
        <option value="latest">Latest First</option>
        <option value="oldest">Oldest First</option>
      </select>

      {/* Export Button */}
      <Button
        variant="secondary"
        onClick={onExportCSV}
        isLoading={isExporting}
      >
        ↓ Export CSV
      </Button>
    </div>
  );
};

export default LeadFiltersComponent;