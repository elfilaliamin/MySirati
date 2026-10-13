import { AlertTriangle, Lock } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { Button, Input, Modal } from '../../components/ui';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (password: string) => Promise<void>;
}

export const DeleteAccountModal: FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
}) => {
  const [password, setPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsDeleting(true);
      setErrorMsg(null);
      await onConfirmDelete(password);
      onClose();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Account" maxWidth="md">
      <form onSubmit={handleDelete} className="space-y-4">
        <div className="rounded-xl bg-danger/10 border border-danger/20 p-3 flex items-start gap-2.5 text-xs text-danger">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>Warning: All career data and generated AI share links will be permanently deleted.</span>
        </div>
        {errorMsg && <div className="text-xs text-danger">{errorMsg}</div>}
        <Input
          label="Confirm with Password"
          type="password"
          required
          placeholder="Your password"
          leftIcon={<Lock className="h-4 w-4" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end gap-3 pt-3 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="danger" isLoading={isDeleting}>Permanently Delete</Button>
        </div>
      </form>
    </Modal>
  );
};
