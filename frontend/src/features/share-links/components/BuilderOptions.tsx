import type { FC } from 'react';

import { Select } from '../../../components/ui';

interface BuilderOptionsProps {
  includeEmail: boolean;
  onToggleEmail: (v: boolean) => void;
  includePhone: boolean;
  onTogglePhone: (v: boolean) => void;
  includeItemLinks: boolean;
  onToggleItemLinks: (v: boolean) => void;
  expiry: string;
  onChangeExpiry: (v: string) => void;
}

const EXPIRY_OPTIONS = [
  { value: '30', label: '30 days (Recommended)' },
  { value: '7', label: '7 days' },
  { value: '90', label: '90 days' },
  { value: 'never', label: 'Never expires' },
];

export const BuilderOptions: FC<BuilderOptionsProps> = ({
  includeEmail,
  onToggleEmail,
  includePhone,
  onTogglePhone,
  includeItemLinks,
  onToggleItemLinks,
  expiry,
  onChangeExpiry,
}) => (
  <div className="space-y-4 pt-2 border-t border-border">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <label className="flex items-center gap-2 text-xs font-medium text-text cursor-pointer">
        <input
          type="checkbox"
          checked={includeEmail}
          onChange={(e) => onToggleEmail(e.target.checked)}
          className="rounded border-border text-primary focus:ring-primary"
        />
        <span>Include Email</span>
      </label>
      <label className="flex items-center gap-2 text-xs font-medium text-text cursor-pointer">
        <input
          type="checkbox"
          checked={includePhone}
          onChange={(e) => onTogglePhone(e.target.checked)}
          className="rounded border-border text-primary focus:ring-primary"
        />
        <span>Include Phone</span>
      </label>
      <label className="flex items-center gap-2 text-xs font-medium text-text cursor-pointer">
        <input
          type="checkbox"
          checked={includeItemLinks}
          onChange={(e) => onToggleItemLinks(e.target.checked)}
          className="rounded border-border text-primary focus:ring-primary"
        />
        <span>Include Resource Links</span>
      </label>
    </div>

    <Select
      label="Link Expiration"
      options={EXPIRY_OPTIONS}
      value={expiry}
      onChange={(e) => onChangeExpiry(e.target.value)}
    />
  </div>
);
