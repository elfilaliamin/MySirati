import type { FC } from 'react';

import { SkillFilterFooter } from './SkillFilterFooter';
import { SkillFilterInputs } from './SkillFilterInputs';
import type { SkillSortOption } from './skillFilterUtils';

interface SkillFiltersBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  selectedLevel: string;
  onLevelChange: (value: string) => void;
  sortBy: SkillSortOption;
  onSortChange: (value: SkillSortOption) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  filteredCount: number;
  totalCount: number;
}

export const SkillFiltersBar: FC<SkillFiltersBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedLevel,
  onLevelChange,
  sortBy,
  onSortChange,
  onReset,
  hasActiveFilters,
  filteredCount,
  totalCount,
}) => (
  <div className="bg-surface rounded-xl border border-border p-4 shadow-sm space-y-3">
    <SkillFilterInputs
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      selectedCategory={selectedCategory}
      onCategoryChange={onCategoryChange}
      categories={categories}
      selectedLevel={selectedLevel}
      onLevelChange={onLevelChange}
      sortBy={sortBy}
      onSortChange={onSortChange}
    />
    <SkillFilterFooter
      filteredCount={filteredCount}
      totalCount={totalCount}
      hasActiveFilters={hasActiveFilters}
      onReset={onReset}
    />
  </div>
);
