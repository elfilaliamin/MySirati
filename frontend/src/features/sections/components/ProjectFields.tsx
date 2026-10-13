import type { FC } from 'react';

import { DateRangeFields } from './DateRangeFields';
import { Input } from '../../../components/ui';

interface ProjectFieldsProps {
  name: string;
  setName: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
}

export const ProjectFields: FC<ProjectFieldsProps> = ({
  name,
  setName,
  role,
  setRole,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  description,
  setDescription,
}) => (
  <>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input label="Project Name" required placeholder="e.g. DataFlow" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Role" placeholder="e.g. Creator" value={role} onChange={(e) => setRole(e.target.value)} />
    </div>

    <DateRangeFields
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
    />

    <div className="flex flex-col gap-1.5 text-left w-full">
      <label className="text-xs font-semibold text-text">Project Description</label>
      <textarea
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Technical architecture, stars, impact..."
        className="w-full rounded-xl border border-border bg-surface-raised px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  </>
);
