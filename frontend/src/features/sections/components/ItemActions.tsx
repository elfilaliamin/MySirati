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
  <div className="inline-flex items-center rounded-lg border border-border bg-surface p-0.5 shadow-subtle">
    {onMoveUp && (
      <button
        type="button"
        disabled={!canMoveUp}
        onClick={onMoveUp}
        aria-label="Move up"
        className="p-1 rounded text-text-muted hover:text-text hover:bg-surface-raised disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronUp className="h-3.5 w-3.5" />
      </button>
    )}
    {onMoveDown && (
      <button
        type="button"
        disabled={!canMoveDown}
        onClick={onMoveDown}
        aria-label="Move down"
        className="p-1 rounded text-text-muted hover:text-text hover:bg-surface-raised disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    )}
  </div>
);

const ActionButtons: FC<{
  onEdit: () => void;
  onDeleteRequest: () => void;
}> = ({ onEdit, onDeleteRequest }) => (
  <>
    <Button
      variant="ghost"
      size="sm"
      onClick={onEdit}
      aria-label="Edit item"
      className="hover:bg-primary-soft hover:text-primary text-text-muted"
    >
      <Edit2 className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="sm"
      onClick={onDeleteRequest}
      className="text-text-muted hover:text-danger hover:bg-danger/10"
      aria-label="Delete item"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
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

  return (
    <>
      <div className="flex items-center gap-1.5 shrink-0">
        {(onMoveUp || onMoveDown) && (
          <MoveButtons
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          />
        )}
        <ActionButtons onEdit={onEdit} onDeleteRequest={() => setConfirmOpen(true)} />
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete();
        }}
        title={deleteTitle}
        description={deleteDescription}
        confirmLabel="Delete"
      />
    </>
  );
};
