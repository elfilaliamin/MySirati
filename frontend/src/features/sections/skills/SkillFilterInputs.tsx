import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import type { SkillSortOption } from './skillFilterUtils';
import { Input, Select } from '../../../components/ui';

interface SkillFilterInputsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  selectedLevel: string;
  onLevelChange: (value: string) => void;
  sortBy: SkillSortOption;
  onSortChange: (value: SkillSortOption) => void;
}

interface DropdownControlsProps {
  isExpanded: boolean;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedLevel: string;
  onLevelChange: (value: string) => void;
  sortBy: SkillSortOption;
  onSortChange: (value: SkillSortOption) => void;
}

const SORT_OPTIONS = [
  { value: 'default', label: 'Manual Order' },
  { value: 'name-asc', label: 'Name (A → Z)' },
  { value: 'name-desc', label: 'Name (Z → A)' },
  { value: 'level-desc', label: 'Level (High → Low)' },
  { value: 'level-asc', label: 'Level (Low → High)' },
];

const LEVEL_OPTIONS = [
  { value: '', label: 'All Levels' },
  { value: 'Expert', label: 'Expert' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Beginner', label: 'Beginner' },
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
  categories,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  sortBy,
  onSortChange,
}) => {
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((c) => ({ value: c, label: c })),
  ];

  return (
    <div className={`${isExpanded ? 'grid' : 'hidden'} sm:grid grid-cols-1 sm:grid-cols-3 gap-3`}>
      <Select
        options={categoryOptions}
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      />
      <Select
        options={LEVEL_OPTIONS}
        value={selectedLevel}
        onChange={(e) => onLevelChange(e.target.value)}
      />
      <Select
        options={SORT_OPTIONS}
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SkillSortOption)}
      />
    </div>
  );
};

export const SkillFilterInputs: FC<SkillFilterInputsProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedLevel,
  onLevelChange,
  sortBy,
  onSortChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubFilters = Boolean(selectedCategory || selectedLevel || sortBy !== 'default');

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <Input
            placeholder="Search skills or category..."
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
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        selectedLevel={selectedLevel}
        onLevelChange={onLevelChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
    </div>
  );
};
