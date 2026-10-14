import { FilterX } from 'lucide-react';
import type { FC } from 'react';

import { EmptyState } from '../../../components/ui';
import { EducationCard } from '../components/EducationCard';
import type { EducationItem } from '../sections.types';

interface EducationListProps {
  filteredItems: EducationItem[];
  allItems: EducationItem[];
  isManualOrderActive: boolean;
  onMoveUp: (idx: number) => void;
  onMoveDown: (idx: number) => void;
  onEdit: (item: EducationItem) => void;
  onDelete: (id: string) => void;
  onResetFilters: () => void;
}

export const EducationList: FC<EducationListProps> = ({
  filteredItems,
  allItems,
  isManualOrderActive,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  onResetFilters,
}) => {
  if (filteredItems.length === 0) {
    return (
      <EmptyState
        icon={<FilterX className="h-6 w-6 text-primary" />}
        title="No matching education or courses"
        description="No items match your current search and filter criteria. Try adjusting your query or resetting the filters."
        actionLabel="Clear all filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="space-y-4">
      {filteredItems.map((item, idx) => (
        <EducationCard
          key={item.id}
          item={item}
          canMoveUp={isManualOrderActive && idx > 0}
          canMoveDown={isManualOrderActive && idx < allItems.length - 1}
          onMoveUp={() => onMoveUp(idx)}
          onMoveDown={() => onMoveDown(idx)}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
};
