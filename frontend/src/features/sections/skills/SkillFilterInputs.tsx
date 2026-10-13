import { Search, X } from 'lucide-react';
import type { FC } from 'react';

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
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    <Input
      placeholder="Search skills or category..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      leftIcon={<Search className="h-4 w-4" />}
      rightIcon={searchQuery ? <ClearSearchButton onClear={() => onSearchChange('')} /> : undefined}
    />
    <Select
      options={[
        { value: '', label: 'All Categories' },
        ...categories.map((c) => ({ value: c, label: c })),
      ]}
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
