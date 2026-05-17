import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { RegisterFormData, UserRole } from '../types';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage: React.FC = () => {
  const { register, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: UserRole.Sales,
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validate = (): boolean => {
    const e: Partial<RegisterFormData> = {};
    if (!formData.name || formData.name.length < 2)
      e.name = 'Name must be at least 2 characters';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
      e.email = 'Valid email is required';
    if (!formData.password || formData.password.length < 6)
      e.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) {
      const message = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message || 'Registration failed';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br
      from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8
        border border-gray-200 dark:border-gray-700">
        <div className="mb-8 text-center">
          <span className="text-3xl">⚡</span>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            Create account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Join SmartLeads Dashboard
          </p>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4" noValidate>
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
            error={errors.name}
            placeholder="John Doe"
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            error={errors.email}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
            error={errors.password}
            placeholder="Min 6 characters"
          />
          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData((p) => ({ ...p, confirmPassword: e.target.value }))}
            error={errors.confirmPassword}
            placeholder="Repeat password"
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData((p) => ({ ...p, role: e.target.value as UserRole }))
              }
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
                text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={UserRole.Sales}>Sales User</option>
              <option value={UserRole.Admin}>Admin</option>
            </select>
          </div>

          <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;