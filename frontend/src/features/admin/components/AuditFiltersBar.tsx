import type { FC } from 'react';

import { Select } from '../../../components/ui';

interface FiltersProps {
  action: string;
  onActionChange: (action: string) => void;
}

const ACTION_OPTIONS = [
  { value: '', label: 'All Actions' },
  { value: 'VIEW_USER', label: 'VIEW_USER' },
  { value: 'SUSPEND_USER', label: 'SUSPEND_USER' },
  { value: 'REACTIVATE_USER', label: 'REACTIVATE_USER' },
  { value: 'REVOKE_ALL_LINKS', label: 'REVOKE_ALL_LINKS' },
  { value: 'DELETE_USER', label: 'DELETE_USER' },
];

export const AuditFiltersBar: FC<FiltersProps> = ({ action, onActionChange }) => (
  <div className="max-w-xs">
    <Select
      options={ACTION_OPTIONS}
      value={action}
      onChange={(e) => onActionChange(e.target.value)}
    />
  </div>
);
