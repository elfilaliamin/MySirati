import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { EducationFields } from './EducationFields';
import { LinksEditor } from './LinksEditor';
import { Button, Modal } from '../../../components/ui';
import type { EducationItem } from '../sections.types';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<EducationItem>) => Promise<void>;
  item?: EducationItem | null;
}

export const EducationModal: FC<EducationModalProps> = ({ isOpen, onClose, onSave, item }) => {
  const [form, setForm] = useState<Partial<EducationItem>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm(item || { institution: '', links: [] });
  }, [item, isOpen]);

  const update = (k: keyof EducationItem, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

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
    <Modal isOpen={isOpen} onClose={onClose} title={item ? 'Edit Education' : 'Add Education'} maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <EducationFields
          institution={form.institution || ''}
          setInstitution={(v) => update('institution', v)}
          degree={form.degree || ''}
          setDegree={(v) => update('degree', v)}
          fieldOfStudy={form.fieldOfStudy || ''}
          setFieldOfStudy={(v) => update('fieldOfStudy', v)}
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
          <Button type="submit" isLoading={isSubmitting}>{item ? 'Save Changes' : 'Add Item'}</Button>
        </div>
      </form>
    </Modal>
  );
};
