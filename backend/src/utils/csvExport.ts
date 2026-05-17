import { ILead } from '../types';

export const generateCSV = (leads: ILead[]): string => {
  const headers = ['Name', 'Email', 'Status', 'Source', 'Created At'];

  const rows = leads.map((lead) => [
    `"${lead.name}"`,
    `"${lead.email}"`,
    `"${lead.status}"`,
    `"${lead.source}"`,
    `"${new Date(lead.createdAt).toLocaleDateString()}"`,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  return csvContent;
};