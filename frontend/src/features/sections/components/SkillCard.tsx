import type { FC } from 'react';

import { ItemActions } from './ItemActions';
import { Badge, Card } from '../../../components/ui';
import type { SkillItem } from '../sections.types';

interface SkillCardProps {
  item: SkillItem;
  onEdit: () => void;
  onDelete: () => void;
}

export const SkillCard: FC<SkillCardProps> = ({
  item,
  onEdit,
  onDelete,
}) => (
  <Card className="p-4 flex items-center justify-between hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200">
    <div>
      <h4 className="text-sm font-bold text-text tracking-tight">{item.name}</h4>
      <div className="flex items-center gap-2 mt-1">
        {item.category && <span className="text-xs text-text-muted">{item.category}</span>}
        {item.level && <Badge size="sm" variant="primary">{item.level}</Badge>}
      </div>
    </div>
    <ItemActions
      onEdit={onEdit}
      onDelete={onDelete}
      deleteTitle="Delete Skill"
      deleteDescription={`Are you sure you want to delete "${item.name}"? This action cannot be undone.`}
    />
  </Card>
);
