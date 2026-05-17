
import React, { useState, FormEvent } from 'react';
import { Lead, LeadFormData, LeadSource, LeadStatus } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface LeadFormProps {
  initialData?: Lead;
  onSubmit: (data: LeadFormData) => Promise<boolean>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  source?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    status: initialData?.status || LeadStatus.New,
    source: initialData?.source || LeadSource.Website,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.source) {
      newErrors.source = 'Source is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const success = await onSubmit(formData);
    if (success) onCancel();
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4" noValidate>
      <Input
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
        error={errors.name}
        placeholder="John Doe"
        required
      />

      <Input
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
        error={errors.email}
        placeholder="john@example.com"
        required
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as LeadStatus }))}
          className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
            text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.values(LeadStatus).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Source</label>
        <select
          value={formData.source}
          onChange={(e) => setFormData((p) => ({ ...p, source: e.target.value as LeadSource }))}
          className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
            text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.values(LeadSource).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.source && <p className="text-xs text-red-500">{errors.source}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading} className="flex-1">
          {initialData ? 'Update Lead' : 'Create Lead'}
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;