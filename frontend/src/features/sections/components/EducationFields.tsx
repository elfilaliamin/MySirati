import type { FC } from 'react';

import { DateRangeFields } from './DateRangeFields';
import { Input } from '../../../components/ui';

interface EducationFieldsProps {
  institution: string;
  setInstitution: (v: string) => void;
  degree: string;
  setDegree: (v: string) => void;
  fieldOfStudy: string;
  setFieldOfStudy: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  isCurrent: boolean;
  setIsCurrent: (v: boolean) => void;
  description: string;
  setDescription: (v: string) => void;
}

export const EducationFields: FC<EducationFieldsProps> = ({
  institution,
  setInstitution,
  degree,
  setDegree,
  fieldOfStudy,
  setFieldOfStudy,
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
    <Input
      label="Institution"
      required
      placeholder="e.g. Technical University of Munich"
      value={institution}
      onChange={(e) => setInstitution(e.target.value)}
    />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input label="Degree" placeholder="e.g. M.Sc." value={degree} onChange={(e) => setDegree(e.target.value)} />
      <Input label="Field of Study" placeholder="e.g. Computer Science" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} />
    </div>

    <DateRangeFields
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      isCurrent={isCurrent}
      setIsCurrent={setIsCurrent}
      currentLabel="Currently studying here"
    />

    <div className="flex flex-col gap-1.5 text-left w-full">
      <label className="text-xs font-semibold text-text">Description</label>
      <textarea
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Honors, thesis, activities..."
        className="w-full rounded-xl border border-border bg-surface-raised px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  </>
);
