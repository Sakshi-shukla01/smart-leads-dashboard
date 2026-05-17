import React from 'react';
import { PaginationMeta } from '../../types';
import Button from './Button';

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages, totalRecords, limit, hasNextPage, hasPrevPage } = pagination;

  const startRecord = (currentPage - 1) * limit + 1;
  const endRecord = Math.min(currentPage * limit, totalRecords);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing <span className="font-medium">{startRecord}</span>–
        <span className="font-medium">{endRecord}</span> of{' '}
        <span className="font-medium">{totalRecords}</span> leads
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={!hasPrevPage}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ← Prev
        </Button>
        <span className="text-sm text-gray-700 dark:text-gray-300 px-2">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next →
        </Button>
      </div>
    </div>
  );
};

export default Pagination;