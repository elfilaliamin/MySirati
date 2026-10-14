import { ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { Button, ConfirmModal } from '../../../components/ui';

interface ItemActionsProps {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onEdit: () => void;
  onDelete: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  deleteTitle?: string;
  deleteDescription?: string;
}

const MoveButtons: FC<{
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}> = ({ onMoveUp, onMoveDown, canMoveUp, canMoveDown }) => (
  <>
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
  </>
);

export const ItemActions: FC<ItemActionsProps> = ({
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  canMoveUp = false,
  canMoveDown = false,
  deleteTitle = 'Delete Item',
  deleteDescription = 'Are you sure you want to delete this item? This action cannot be undone.',
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    onDelete();
  };

  return (
    <>
      <div className="flex items-center gap-1 shrink-0">
        <MoveButtons
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
        />
        <Button variant="ghost" size="sm" onClick={onEdit} aria-label="Edit item">
          <Edit2 className="h-4 w-4 text-primary" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setConfirmOpen(true)}
          className="text-danger hover:bg-danger/10 hover:text-danger"
          aria-label="Delete item"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title={deleteTitle}
        description={deleteDescription}
        confirmLabel="Delete"
      />
    </>
  );
};
