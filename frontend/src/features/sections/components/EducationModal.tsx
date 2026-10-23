import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { EducationFields } from './EducationFields';
import { LinksEditor } from './LinksEditor';
import { Button, Modal } from '../../../components/ui';
import type { EducationItem, EducationType } from '../sections.types';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<EducationItem>) => Promise<void>;
  item?: EducationItem | null;
  initialType?: EducationType;
}

const getModalTitle = (item?: EducationItem | null, type?: EducationType) => {
  if (item) return 'Edit Education Item';
  switch (type) {
    case 'course':
      return 'Add Online Course';
    case 'bootcamp':
      return 'Add Bootcamp';
    case 'certificate':
      return 'Add Certification';
    default:
      return 'Add Academic Degree';
  }
};

const ModalFooter: FC<{
  isSubmitting: boolean;
  isEdit: boolean;
  onCancel: () => void;
}> = ({ isSubmitting, isEdit, onCancel }) => (
  <div className="flex justify-end gap-3 pt-3 border-t border-border">
    <Button type="button" variant="outline" onClick={onCancel}>
      Cancel
    </Button>
    <Button type="submit" isLoading={isSubmitting}>
      {isEdit ? 'Save Changes' : 'Add Item'}
    </Button>
  </div>
);

const EducationFormBody: FC<{
  form: Partial<EducationItem>;
  update: (k: keyof EducationItem, v: unknown) => void;
}> = ({ form, update }) => (
  <>
    <EducationFields
      type={form.type || 'academic'}
      setType={(v) => update('type', v)}
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
  </>
);

export const EducationModal: FC<EducationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
  initialType = 'academic',
}) => {
  const [form, setForm] = useState<Partial<EducationItem>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm(item || { type: initialType, institution: '', links: [] });
  }, [item, isOpen, initialType]);

  const update = (k: keyof EducationItem, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSave({
        ...form,
        type: form.type || 'academic',
        endDate: form.isCurrent ? null : form.endDate || null,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getModalTitle(item, form.type)} maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <EducationFormBody form={form} update={update} />
        <ModalFooter isSubmitting={isSubmitting} isEdit={Boolean(item)} onCancel={onClose} />
      </form>
    </Modal>
  );
};
