import type { FC } from 'react';

import { ItemActions } from './ItemActions';
import { Badge, Card } from '../../../components/ui';
import type { LanguageItem } from '../sections.types';

interface LanguageCardProps {
  item: LanguageItem;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const LanguageCard: FC<LanguageCardProps> = ({
  item,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}) => (
  <Card className="p-4 flex items-center justify-between hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200">
    <div>
      <h4 className="text-sm font-bold text-text tracking-tight">{item.name}</h4>
      <div className="mt-1">
        <Badge size="sm" variant="success">{item.proficiency}</Badge>
      </div>
    </div>
    <ItemActions
      canMoveUp={canMoveUp}
      canMoveDown={canMoveDown}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      onEdit={onEdit}
      onDelete={onDelete}
      deleteTitle="Delete Language"
      deleteDescription={`Are you sure you want to delete "${item.name}"? This action cannot be undone.`}
    />
  </Card>
);
