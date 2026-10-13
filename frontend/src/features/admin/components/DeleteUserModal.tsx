import type { FC, FormEvent } from 'react';
import { useState } from 'react';

import { Button, Input, Modal } from '../../../components/ui';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  expectedEmail: string;
  onConfirm: (confirmEmail: string) => Promise<void>;
  isLoading: boolean;
}

export const DeleteUserModal: FC<DeleteUserModalProps> = ({
  isOpen,
  onClose,
  expectedEmail,
  onConfirm,
  isLoading,
}) => {
  const [typedEmail, setTypedEmail] = useState('');

  const isMatched = typedEmail.trim().toLowerCase() === expectedEmail.toLowerCase();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isMatched) return;
    await onConfirm(typedEmail.trim());
    setTypedEmail('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Permanently Delete User Account">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <p className="text-red-500 font-semibold">
          Warning: This action is irreversible. All profile data, education, experiences, projects,
          skills, languages, and share links will be permanently deleted.
        </p>
        <p className="text-text-muted">
          To confirm, please type the user email{' '}
          <span className="font-semibold text-text">{expectedEmail}</span> below:
        </p>

        <Input
          placeholder={expectedEmail}
          value={typedEmail}
          onChange={(e) => setTypedEmail(e.target.value)}
        />

        <div className="flex justify-end gap-2 pt-3 border-t border-border">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            type="submit"
            isLoading={isLoading}
            disabled={!isMatched}
          >
            Permanently Delete User
          </Button>
        </div>
      </form>
    </Modal>
  );
};
