import type { FC } from 'react';

import { Button, Modal } from '../../../components/ui';

interface RevokeLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}

export const RevokeLinksModal: FC<RevokeLinksModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Revoke All AI Share Links">
    <div className="space-y-4 text-xs">
      <p className="text-text-muted">
        Are you sure you want to revoke all active AI share links for this user?
        Any AI assistants or external clients attempting to access these links will receive a 404 response.
      </p>
      <div className="flex justify-end gap-2 pt-3 border-t border-border">
        <Button variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          size="sm"
          isLoading={isLoading}
          onClick={async () => {
            await onConfirm();
            onClose();
          }}
        >
          Revoke All Links
        </Button>
      </div>
    </div>
  </Modal>
);
