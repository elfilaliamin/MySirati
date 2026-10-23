import { BookOpen } from 'lucide-react';
import type { FC } from 'react';

import { EducationFiltersBar } from './EducationFiltersBar';
import { EducationList } from './EducationList';
import type { useEducationFilters } from './useEducationFilters';
import { EmptyState, SkeletonList } from '../../../components/ui';
import type { EducationItem } from '../sections.types';

interface EducationContentProps {
  items: EducationItem[];
  filter: ReturnType<typeof useEducationFilters>;
  onMoveUp: (idx: number) => void;
  onMoveDown: (idx: number) => void;
  onEdit: (item: EducationItem) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  isLoading?: boolean;
}

const EducationEmptyState: FC<{ onAdd: () => void }> = ({ onAdd }) => (
  <EmptyState
    icon={<BookOpen className="h-6 w-6 text-primary" />}
    title="No education or courses added yet"
    description="Add your university degrees, online courses (Udemy, Coursera), bootcamps, and certificates to build an AI-ready career profile."
    actionLabel="Add Education"
    onAction={onAdd}
  />
);

export const EducationContent: FC<EducationContentProps> = ({
  items,
  filter,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  onAdd,
  isLoading = false,
}) => {
  if (isLoading) {
    return <SkeletonList count={3} />;
  }

  if (items.length === 0) {
    return <EducationEmptyState onAdd={onAdd} />;
  }

  return (
    <div className="space-y-4">
      <EducationFiltersBar
        searchQuery={filter.searchQuery}
        onSearchChange={filter.setSearchQuery}
        selectedType={filter.selectedType}
        onTypeChange={filter.setSelectedType}
        selectedStatus={filter.selectedStatus}
        onStatusChange={filter.setSelectedStatus}
        sortBy={filter.sortBy}
        onSortChange={filter.setSortBy}
        onReset={filter.resetFilters}
        hasActiveFilters={filter.hasActiveFilters}
        filteredCount={filter.filteredItems.length}
        totalCount={items.length}
      />
      <EducationList
        filteredItems={filter.filteredItems}
        allItems={items}
        isManualOrderActive={!filter.hasActiveFilters}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onEdit={onEdit}
        onDelete={onDelete}
        onResetFilters={filter.resetFilters}
      />
    </div>
  );
};
