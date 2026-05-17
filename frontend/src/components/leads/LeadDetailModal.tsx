
import React from 'react';
import { Lead } from '../../types';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
}

const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose }) => {
  if (!lead) return null;

  const createdBy =
    typeof lead.createdBy === 'object'
      ? `${lead.createdBy.name} (${lead.createdBy.email})`
      : lead.createdBy;

  const fields: { label: string; value: React.ReactNode }[] = [
    { label: 'Name', value: lead.name },
    { label: 'Email', value: lead.email },
    { label: 'Status', value: <Badge value={lead.status} /> },
    { label: 'Source', value: <Badge value={lead.source} /> },
    { label: 'Created By', value: createdBy },
    { label: 'Created At', value: new Date(lead.createdAt).toLocaleString() },
    { label: 'Last Updated', value: new Date(lead.updatedAt).toLocaleString() },
  ];

  return (
    <Modal isOpen={!!lead} onClose={onClose} title="Lead Details" size="md">
      <dl className="space-y-4">
        {fields.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {label}
            </dt>
            <dd className="text-sm text-gray-900 dark:text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
};

export default LeadDetailModal;