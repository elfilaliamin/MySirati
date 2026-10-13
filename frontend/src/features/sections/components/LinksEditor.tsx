import { Plus } from 'lucide-react';
import type { FC } from 'react';

import { LinkRow } from './LinkRow';
import { Button } from '../../../components/ui';
import type { ResourceLink } from '../sections.types';

interface LinksEditorProps {
  links: ResourceLink[];
  onChange: (links: ResourceLink[]) => void;
}

export const LinksEditor: FC<LinksEditorProps> = ({ links, onChange }) => {
  const handleAdd = () => onChange([...links, { label: '', url: '' }]);
  const handleRemove = (index: number) => onChange(links.filter((_, i) => i !== index));
  const handleChange = (index: number, field: keyof ResourceLink, val: string) => {
    const next = [...links];
    const current = next[index] || { label: '', url: '' };
    next[index] = { ...current, [field]: val };
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-text">Resource Links</label>
        <Button type="button" variant="ghost" size="sm" onClick={handleAdd} leftIcon={<Plus className="h-3.5 w-3.5" />}>
          Add Link
        </Button>
      </div>

      {links.length === 0 && (
        <p className="text-xs text-text-muted italic">No resource links added yet.</p>
      )}

      {links.map((link, idx) => (
        <LinkRow
          key={idx}
          link={link}
          onUpdate={(field, val) => handleChange(idx, field, val)}
          onRemove={() => handleRemove(idx)}
        />
      ))}
    </div>
  );
};
