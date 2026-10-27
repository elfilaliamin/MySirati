import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { LinksEditor } from './LinksEditor';
import { ProjectFields } from './ProjectFields';
import { Button, Modal } from '../../../components/ui';
import type { ProjectItem } from '../sections.types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ProjectItem>) => Promise<void>;
  item?: ProjectItem | null;
}

export const ProjectModal: FC<ProjectModalProps> = ({ isOpen, onClose, onSave, item }) => {
  const [form, setForm] = useState<Partial<ProjectItem>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm(item || { name: '', links: [] });
  }, [item, isOpen]);

  const update = (k: keyof ProjectItem, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSave({
        ...form,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item ? 'Edit Project' : 'Add Project'} maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <ProjectFields
          name={form.name || ''}
          setName={(v) => update('name', v)}
          role={form.role || ''}
          setRole={(v) => update('role', v)}
          startDate={form.startDate || ''}
          setStartDate={(v) => update('startDate', v)}
          endDate={form.endDate || ''}
          setEndDate={(v) => update('endDate', v)}
          description={form.description || ''}
          setDescription={(v) => update('description', v)}
        />
        <LinksEditor links={form.links || []} onChange={(v) => update('links', v)} />
        <div className="flex justify-end gap-3 pt-3 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isSubmitting}>{item ? 'Save Changes' : 'Add Project'}</Button>
        </div>
      </form>
    </Modal>
  );
};
