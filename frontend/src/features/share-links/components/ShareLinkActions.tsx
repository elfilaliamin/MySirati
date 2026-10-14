import { Edit2, Key, Trash2, XCircle } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, ConfirmModal } from '../../../components/ui';

interface ShareLinkActionsProps {
  id: string;
  isRevoked: boolean;
  onRegenerate: (id: string) => void;
  onRevoke: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ShareLinkActions: FC<ShareLinkActionsProps> = ({
  id,
  isRevoked,
  onRegenerate,
  onRevoke,
  onDelete,
}) => {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleConfirmDelete = () => {
    setConfirmDeleteOpen(false);
    onDelete(id);
  };

  return (
    <>
      <div className="flex items-center gap-1.5 self-end sm:self-center">
        <Link to={`/share/${id}/edit`}>
          <Button variant="ghost" size="sm" aria-label="Edit link" title="Edit">
            <Edit2 className="h-4 w-4 text-primary" />
          </Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={() => onRegenerate(id)} aria-label="Regenerate key" title="Regenerate Key">
          <Key className="h-4 w-4" />
        </Button>
        {!isRevoked && (
          <Button variant="ghost" size="sm" onClick={() => onRevoke(id)} aria-label="Revoke link" title="Revoke">
            <XCircle className="h-4 w-4 text-amber-500" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setConfirmDeleteOpen(true)}
          className="text-danger hover:bg-danger/10 hover:text-danger"
          aria-label="Delete link"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <ConfirmModal
        isOpen={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Share Link"
        description="Are you sure you want to delete this share link? Anyone holding this link or cryptographic key will immediately lose access to your shared resume data."
        confirmLabel="Delete Link"
      />
    </>
  );
};
