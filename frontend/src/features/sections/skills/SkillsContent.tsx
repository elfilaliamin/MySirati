import { Code2 } from 'lucide-react';
import type { FC } from 'react';

import { SkillFiltersBar } from './SkillFiltersBar';
import { SkillsGrid } from './SkillsGrid';
import type { useSkillFilters } from './useSkillFilters';
import { EmptyState, SkeletonList } from '../../../components/ui';
import type { SkillItem } from '../sections.types';

interface SkillsContentProps {
  items: SkillItem[];
  filter: ReturnType<typeof useSkillFilters>;
  onEdit: (item: SkillItem) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  isLoading?: boolean;
}

export const SkillsContent: FC<SkillsContentProps> = ({
  items,
  filter,
  onEdit,
  onDelete,
  onAdd,
  isLoading = false,
}) => {
  if (isLoading) {
    return <SkeletonList count={3} />;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<Code2 className="h-6 w-6 text-primary" />}
        title="No skills added yet"
        description="List your core technical proficiencies, frameworks, and methodologies."
        actionLabel="Add Skill"
        onAction={onAdd}
      />
    );
  }

  return (
    <div className="space-y-4">
      <SkillFiltersBar
        searchQuery={filter.searchQuery}
        onSearchChange={filter.setSearchQuery}
        selectedCategory={filter.selectedCategory}
        onCategoryChange={filter.setSelectedCategory}
        categories={filter.categories}
        selectedLevel={filter.selectedLevel}
        onLevelChange={filter.setSelectedLevel}
        sortBy={filter.sortBy}
        onSortChange={filter.setSortBy}
        onReset={filter.resetFilters}
        hasActiveFilters={filter.hasActiveFilters}
        filteredCount={filter.filteredItems.length}
        totalCount={items.length}
      />
      <SkillsGrid
        filteredItems={filter.filteredItems}
        onEdit={onEdit}
        onDelete={onDelete}
        onResetFilters={filter.resetFilters}
      />
    </div>
  );
};
