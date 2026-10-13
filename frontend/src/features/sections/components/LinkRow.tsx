import { Trash2 } from 'lucide-react';
import type { FC } from 'react';

import { Button, Input } from '../../../components/ui';
import type { ResourceLink } from '../sections.types';

interface LinkRowProps {
  link: ResourceLink;
  onUpdate: (field: keyof ResourceLink, val: string) => void;
  onRemove: () => void;
}

export const LinkRow: FC<LinkRowProps> = ({ link, onUpdate, onRemove }) => (
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 sm:p-0 rounded-xl bg-surface/40 sm:bg-transparent border border-border/40 sm:border-0">
    <Input
      placeholder="Label (e.g. GitHub)"
      value={link.label}
      onChange={(e) => onUpdate('label', e.target.value)}
      className="flex-1"
    />
    <div className="flex items-center gap-2 flex-1">
      <Input
        placeholder="https://..."
        value={link.url}
        onChange={(e) => onUpdate('url', e.target.value)}
        className="flex-1"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="text-danger hover:text-danger hover:bg-danger/10 shrink-0"
        aria-label="Remove link"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  </div>
);
