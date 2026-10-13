import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { LinksEditor } from './LinksEditor';
import { SkillFields } from './SkillFields';
import { Button, Modal } from '../../../components/ui';
import type { ResourceLink, SkillItem } from '../sections.types';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<SkillItem>) => Promise<void>;
  item?: SkillItem | null;
}

export const SkillModal: FC<SkillModalProps> = ({ isOpen, onClose, onSave, item }) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [links, setLinks] = useState<ResourceLink[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(item?.name || '');
    setLevel(item?.level || '');
    setCategory(item?.category || '');
    setLinks(item?.links || []);
  }, [item, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSave({ name, level: level || null, category: category || null, links });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item ? 'Edit Skill' : 'Add Skill'} maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <SkillFields name={name} setName={setName} level={level} setLevel={setLevel} category={category} setCategory={setCategory} />
        <LinksEditor links={links} onChange={setLinks} />
        <div className="flex justify-end gap-3 pt-3 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isSubmitting}>{item ? 'Save Changes' : 'Add Skill'}</Button>
        </div>
      </form>
    </Modal>
  );
};
