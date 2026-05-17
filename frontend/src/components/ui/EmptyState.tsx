import React from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon = '📭',
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <span className="text-5xl mb-4">{icon}</span>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
    {description && (
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-xs">{description}</p>
    )}
    {action}
  </div>
);

export default EmptyState;