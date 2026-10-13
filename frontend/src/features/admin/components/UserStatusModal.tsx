import type { FC, FormEvent } from 'react';
import { useState } from 'react';

import { Button, Input, Modal } from '../../../components/ui';

interface UserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetStatus: 'active' | 'suspended';
  onConfirm: (reason: string) => Promise<void>;
  isLoading: boolean;
}

const DESCRIPTIONS = {
  suspended: 'Suspending this user immediately invalidates active sessions and disables all public AI share links.',
  active: 'Reactivating this user restores their ability to login and generate share links.',
};

export const UserStatusModal: FC<UserStatusModalProps> = ({
  isOpen,
  onClose,
  targetStatus,
  onConfirm,
  isLoading,
}) => {
  const [reason, setReason] = useState('');
  const isSuspend = targetStatus === 'suspended';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    await onConfirm(reason.trim());
    setReason('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isSuspend ? 'Suspend User Account' : 'Reactivate User Account'}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <p className="text-text-muted">{DESCRIPTIONS[targetStatus]}</p>
        <Input
          label="Moderation Reason"
          required
          placeholder="e.g. Terms violation, compromised account, or user request"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end gap-2 pt-3 border-t border-border">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={isSuspend ? 'danger' : 'primary'}
            size="sm"
            type="submit"
            isLoading={isLoading}
            disabled={!reason.trim()}
          >
            {isSuspend ? 'Confirm Suspension' : 'Confirm Reactivation'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
