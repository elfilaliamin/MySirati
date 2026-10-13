import type { FC } from 'react';

import { ItemActions } from './ItemActions';
import { Badge, Card } from '../../../components/ui';
import type { SkillItem } from '../sections.types';

interface SkillCardProps {
  item: SkillItem;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const SkillCard: FC<SkillCardProps> = ({
  item,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}) => (
  <Card className="p-4 flex items-center justify-between">
    <div>
      <h4 className="text-sm font-semibold text-text">{item.name}</h4>
      <div className="flex items-center gap-2 mt-1">
        {item.category && <span className="text-xs text-text-muted">{item.category}</span>}
        {item.level && <Badge size="sm" variant="primary">{item.level}</Badge>}
      </div>
    </div>
    <ItemActions
      canMoveUp={canMoveUp}
      canMoveDown={canMoveDown}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  </Card>
);
