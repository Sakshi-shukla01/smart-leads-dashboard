import React from 'react';
import { LeadStatus, LeadSource } from '../../types';

type BadgeVariant = LeadStatus | LeadSource;

interface BadgeProps {
  value: BadgeVariant;
}

const statusStyles: Record<LeadStatus, string> = {
  [LeadStatus.New]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [LeadStatus.Contacted]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [LeadStatus.Qualified]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [LeadStatus.Lost]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const sourceStyles: Record<LeadSource, string> = {
  [LeadSource.Website]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  [LeadSource.Instagram]: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  [LeadSource.Referral]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
};

const allStyles = { ...statusStyles, ...sourceStyles };

const Badge: React.FC<BadgeProps> = ({ value }) => {
  const style = allStyles[value] || 'bg-gray-100 text-gray-800';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {value}
    </span>
  );
};

export default Badge;