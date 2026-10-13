import type { FC } from 'react';

import { Input } from '../../../components/ui';

interface DateRangeProps {
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  isCurrent?: boolean;
  setIsCurrent?: (v: boolean) => void;
  currentLabel?: string;
}

export const DateRangeFields: FC<DateRangeProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isCurrent,
  setIsCurrent,
  currentLabel,
}) => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <Input label="End Date" type="date" disabled={isCurrent} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
    </div>
    {setIsCurrent && currentLabel && (
      <label className="flex items-center gap-2 text-xs font-medium text-text cursor-pointer">
        <input
          type="checkbox"
          checked={isCurrent}
          onChange={(e) => setIsCurrent(e.target.checked)}
          className="rounded border-border text-primary focus:ring-primary"
        />
        <span>{currentLabel}</span>
      </label>
    )}
  </div>
);
