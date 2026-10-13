import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { ExperienceFields } from './ExperienceFields';
import { LinksEditor } from './LinksEditor';
import { Button, Modal } from '../../../components/ui';
import type { ExperienceItem } from '../sections.types';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ExperienceItem>) => Promise<void>;
  item?: ExperienceItem | null;
}

export const ExperienceModal: FC<ExperienceModalProps> = ({ isOpen, onClose, onSave, item }) => {
  const [form, setForm] = useState<Partial<ExperienceItem>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm(item || { company: '', title: '', links: [] });
  }, [item, isOpen]);

  const update = (k: keyof ExperienceItem, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSave({ ...form, endDate: form.isCurrent ? null : form.endDate || null });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item ? 'Edit Experience' : 'Add Experience'} maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <ExperienceFields
          company={form.company || ''}
          setCompany={(v) => update('company', v)}
          title={form.title || ''}
          setTitle={(v) => update('title', v)}
          location={form.location || ''}
          setLocation={(v) => update('location', v)}
          startDate={form.startDate || ''}
          setStartDate={(v) => update('startDate', v)}
          endDate={form.endDate || ''}
          setEndDate={(v) => update('endDate', v)}
          isCurrent={Boolean(form.isCurrent)}
          setIsCurrent={(v) => update('isCurrent', v)}
          description={form.description || ''}
          setDescription={(v) => update('description', v)}
        />
        <LinksEditor links={form.links || []} onChange={(v) => update('links', v)} />
        <div className="flex justify-end gap-3 pt-3 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isSubmitting}>{item ? 'Save Changes' : 'Add Experience'}</Button>
        </div>
      </form>
    </Modal>
  );
};
