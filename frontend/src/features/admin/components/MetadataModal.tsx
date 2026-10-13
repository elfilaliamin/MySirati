import type { FC } from 'react';

import { Button, Modal } from '../../../components/ui';

interface MetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: Record<string, unknown> | null;
  action: string;
}

export const MetadataModal: FC<MetadataModalProps> = ({
  isOpen,
  onClose,
  metadata,
  action,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={`Audit Metadata: ${action}`}>
    <div className="space-y-4 text-xs">
      <pre className="p-3 rounded-xl bg-surface-muted border border-border text-text font-mono text-[11px] overflow-x-auto max-h-80">
        {JSON.stringify(metadata ?? {}, null, 2)}
      </pre>
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  </Modal>
);
