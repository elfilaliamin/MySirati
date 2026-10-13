import type { FC } from 'react';

import { DateRangeFields } from './DateRangeFields';
import { Input } from '../../../components/ui';

interface ExperienceFieldsProps {
  company: string;
  setCompany: (v: string) => void;
  title: string;
  setTitle: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  isCurrent: boolean;
  setIsCurrent: (v: boolean) => void;
  description: string;
  setDescription: (v: string) => void;
}

export const ExperienceFields: FC<ExperienceFieldsProps> = ({
  company,
  setCompany,
  title,
  setTitle,
  location,
  setLocation,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isCurrent,
  setIsCurrent,
  description,
  setDescription,
}) => (
  <>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input label="Company" required placeholder="e.g. Acme Corp" value={company} onChange={(e) => setCompany(e.target.value)} />
      <Input label="Job Title" required placeholder="e.g. Senior Software Engineer" value={title} onChange={(e) => setTitle(e.target.value)} />
    </div>

    <Input label="Location" placeholder="e.g. Berlin, Germany (or Remote)" value={location} onChange={(e) => setLocation(e.target.value)} />

    <DateRangeFields
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      isCurrent={isCurrent}
      setIsCurrent={setIsCurrent}
      currentLabel="Currently working in this role"
    />

    <div className="flex flex-col gap-1.5 text-left w-full">
      <label className="text-xs font-semibold text-text">Responsibilities & Achievements</label>
      <textarea
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Architected microservices, led team of 5..."
        className="w-full rounded-xl border border-border bg-surface-raised px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  </>
);
