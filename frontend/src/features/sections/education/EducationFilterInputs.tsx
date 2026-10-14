import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import type { EducationSortOption } from './educationFilterUtils';
import { Input, Select } from '../../../components/ui';

interface EducationFilterInputsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  sortBy: EducationSortOption;
  onSortChange: (value: EducationSortOption) => void;
}

interface DropdownControlsProps {
  isExpanded: boolean;
  selectedType: string;
  onTypeChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  sortBy: EducationSortOption;
  onSortChange: (value: EducationSortOption) => void;
}

const TYPE_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'academic', label: 'Degree' },
  { value: 'course', label: 'Course' },
  { value: 'bootcamp', label: 'Bootcamp' },
  { value: 'certificate', label: 'Certification' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'In Progress / Active' },
  { value: 'completed', label: 'Completed' },
];

const SORT_OPTIONS = [
  { value: 'default', label: 'Manual Order' },
  { value: 'date-desc', label: 'Date (Newest first)' },
  { value: 'date-asc', label: 'Date (Oldest first)' },
  { value: 'institution-asc', label: 'Institution (A → Z)' },
  { value: 'institution-desc', label: 'Institution (Z → A)' },
  { value: 'degree-asc', label: 'Degree / Course (A → Z)' },
];

const ClearSearchButton: FC<{ onClear: () => void }> = ({ onClear }) => (
  <button
    type="button"
    onClick={onClear}
    className="text-text-muted hover:text-text focus:outline-none"
    aria-label="Clear search"
  >
    <X className="h-4 w-4" />
  </button>
);

const FilterToggleButton: FC<{
  isExpanded: boolean;
  hasActiveFilters: boolean;
  onToggle: () => void;
}> = ({ isExpanded, hasActiveFilters, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`sm:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors relative ${
      isExpanded || hasActiveFilters
        ? 'border-primary bg-primary-soft text-primary'
        : 'border-border bg-surface text-text-muted hover:text-text hover:bg-surface-raised'
    }`}
    aria-label="Toggle filters and sorting"
    title="Toggle filters and sorting"
  >
    <SlidersHorizontal className="h-4 w-4" />
    {hasActiveFilters && (
      <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
    )}
  </button>
);

const DropdownControls: FC<DropdownControlsProps> = ({
  isExpanded,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
}) => (
  <div className={`${isExpanded ? 'grid' : 'hidden'} sm:grid grid-cols-1 sm:grid-cols-3 gap-3`}>
    <Select
      options={TYPE_OPTIONS}
      value={selectedType}
      onChange={(e) => onTypeChange(e.target.value)}
    />
    <Select
      options={STATUS_OPTIONS}
      value={selectedStatus}
      onChange={(e) => onStatusChange(e.target.value)}
    />
    <Select
      options={SORT_OPTIONS}
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value as EducationSortOption)}
    />
  </div>
);

export const EducationFilterInputs: FC<EducationFilterInputsProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubFilters = Boolean(selectedType || selectedStatus || sortBy !== 'default');

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <Input
            placeholder="Search degrees, institutions, or courses..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            rightIcon={
              searchQuery ? <ClearSearchButton onClear={() => onSearchChange('')} /> : undefined
            }
          />
        </div>
        <FilterToggleButton
          isExpanded={isExpanded}
          hasActiveFilters={hasSubFilters}
          onToggle={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <DropdownControls
        isExpanded={isExpanded}
        selectedType={selectedType}
        onTypeChange={onTypeChange}
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
    </div>
  );
};
