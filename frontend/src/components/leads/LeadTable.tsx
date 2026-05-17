import React, { useState } from 'react';
import { Lead, LeadFormData, UserRole } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import LeadForm from './LeadForm';
import LeadDetailModal from './LeadDetailModal';
import { useAuthContext } from '../../context/AuthContext';

interface LeadTableProps {
  leads: Lead[];
  onUpdate: (id: string, data: Partial<LeadFormData>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  isLoading?: boolean;
}

const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  onUpdate,
  onDelete,
  isLoading = false,
}) => {
  const { user } = useAuthContext();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isAdmin = user?.role === UserRole.Admin;

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              {['Name', 'Email', 'Status', 'Source', 'Created', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {lead.name}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{lead.email}</td>
                <td className="px-4 py-3">
                  <Badge value={lead.status} />
                </td>
                <td className="px-4 py-3">
                  <Badge value={lead.source} />
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedLead(lead)}
                    >
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingLead(lead)}
                    >
                      Edit
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="danger"
                        size="sm"
                        isLoading={deletingId === lead._id}
                        onClick={() => void handleDelete(lead._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingLead}
        onClose={() => setEditingLead(null)}
        title="Edit Lead"
      >
        {editingLead && (
          <LeadForm
            initialData={editingLead}
            onSubmit={(data) => onUpdate(editingLead._id, data)}
            onCancel={() => setEditingLead(null)}
          />
        )}
      </Modal>
    </>
  );
};

export default LeadTable;