import { Search } from 'lucide-react';
import type { FC } from 'react';

import { Input, Select } from '../../../components/ui';

interface UserFiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'suspended', label: 'Suspended' },
];

const ROLE_OPTIONS = [
  { value: '', label: 'All Roles' },
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
];

export const UserFiltersBar: FC<UserFiltersBarProps> = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  role,
  onRoleChange,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <Input
      placeholder="Search by email..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      leftIcon={<Search className="h-4 w-4" />}
    />
    <Select
      options={STATUS_OPTIONS}
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
    />
    <Select
      options={ROLE_OPTIONS}
      value={role}
      onChange={(e) => onRoleChange(e.target.value)}
    />
  </div>
);
