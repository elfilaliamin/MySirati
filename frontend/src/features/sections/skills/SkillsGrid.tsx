import { FilterX } from 'lucide-react';
import type { FC } from 'react';

import { EmptyState } from '../../../components/ui';
import { SkillCard } from '../components/SkillCard';
import type { SkillItem } from '../sections.types';

interface SkillsGridProps {
  filteredItems: SkillItem[];
  allItems: SkillItem[];
  isManualOrderActive: boolean;
  onMoveUp: (idx: number) => void;
  onMoveDown: (idx: number) => void;
  onEdit: (item: SkillItem) => void;
  onDelete: (id: string) => void;
  onResetFilters: () => void;
}

export const SkillsGrid: FC<SkillsGridProps> = ({
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
        title="No matching skills"
        description="No skills match your current search and filter criteria. Try adjusting your query or resetting the filters."
        actionLabel="Clear all filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {filteredItems.map((item, idx) => (
        <SkillCard
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
