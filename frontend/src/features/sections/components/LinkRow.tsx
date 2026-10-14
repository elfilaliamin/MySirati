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
  <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] items-center gap-2 p-2 sm:p-0 rounded-xl bg-surface/30 sm:bg-transparent border border-border/40 sm:border-0">
    <Input
      placeholder="Label (e.g. GitHub)"
      value={link.label}
      onChange={(e) => onUpdate('label', e.target.value)}
      containerClassName="w-full"
    />
    <Input
      placeholder="URL (https://...)"
      value={link.url}
      onChange={(e) => onUpdate('url', e.target.value)}
      containerClassName="w-full"
    />
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onRemove}
      className="text-danger hover:text-danger hover:bg-danger/10 h-10 w-10 p-0 shrink-0 self-center justify-self-end sm:justify-self-center rounded-xl"
      aria-label="Remove link"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
);
