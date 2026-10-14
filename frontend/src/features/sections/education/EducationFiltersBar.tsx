import type { FC } from 'react';

import { EducationFilterFooter } from './EducationFilterFooter';
import { EducationFilterInputs } from './EducationFilterInputs';
import type { EducationSortOption } from './educationFilterUtils';

interface EducationFiltersBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  sortBy: EducationSortOption;
  onSortChange: (value: EducationSortOption) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  filteredCount: number;
  totalCount: number;
}

export const EducationFiltersBar: FC<EducationFiltersBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  onReset,
  hasActiveFilters,
  filteredCount,
  totalCount,
}) => (
  <div className="bg-surface rounded-xl border border-border p-4 shadow-sm space-y-3">
    <EducationFilterInputs
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      selectedType={selectedType}
      onTypeChange={onTypeChange}
      selectedStatus={selectedStatus}
      onStatusChange={onStatusChange}
      sortBy={sortBy}
      onSortChange={onSortChange}
    />
    <EducationFilterFooter
      filteredCount={filteredCount}
      totalCount={totalCount}
      hasActiveFilters={hasActiveFilters}
      onReset={onReset}
    />
  </div>
);
