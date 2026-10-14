import { RotateCcw } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '../../../components/ui';

interface EducationFilterFooterProps {
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const EducationFilterFooter: FC<EducationFilterFooterProps> = ({
  filteredCount,
  totalCount,
  hasActiveFilters,
  onReset,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60 text-xs">
    <div className="flex items-center gap-2 text-text-muted">
      <span>
        Showing <strong className="text-text font-semibold">{filteredCount}</strong> of{' '}
        <strong className="text-text font-semibold">{totalCount}</strong> items
      </span>
      {hasActiveFilters && (
        <span className="hidden sm:inline text-text-muted/80">
          • Reordering paused while filtered
        </span>
      )}
    </div>
    {hasActiveFilters && (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="h-7 px-2.5 text-xs text-primary hover:text-primary-hover gap-1.5"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Clear filters
      </Button>
    )}
  </div>
);
