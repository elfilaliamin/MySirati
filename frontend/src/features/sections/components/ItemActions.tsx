import { ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '../../../components/ui';

interface ItemActionsProps {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onEdit: () => void;
  onDelete: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export const ItemActions: FC<ItemActionsProps> = ({
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  canMoveUp,
  canMoveDown,
}) => (
  <div className="flex items-center gap-1">
    {onMoveUp && (
      <Button variant="ghost" size="sm" disabled={!canMoveUp} onClick={onMoveUp} aria-label="Move up">
        <ChevronUp className="h-4 w-4" />
      </Button>
    )}
    {onMoveDown && (
      <Button variant="ghost" size="sm" disabled={!canMoveDown} onClick={onMoveDown} aria-label="Move down">
        <ChevronDown className="h-4 w-4" />
      </Button>
    )}
    <Button variant="ghost" size="sm" onClick={onEdit} aria-label="Edit item">
      <Edit2 className="h-4 w-4 text-primary" />
    </Button>
    <Button variant="ghost" size="sm" onClick={onDelete} className="text-danger hover:bg-danger/10 hover:text-danger" aria-label="Delete item">
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
);
