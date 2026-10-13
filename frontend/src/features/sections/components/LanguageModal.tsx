import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { LanguageFields } from './LanguageFields';
import { Button, Modal } from '../../../components/ui';
import type { LanguageItem } from '../sections.types';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<LanguageItem>) => Promise<void>;
  item?: LanguageItem | null;
}

export const LanguageModal: FC<LanguageModalProps> = ({ isOpen, onClose, onSave, item }) => {
  const [name, setName] = useState('');
  const [proficiency, setProficiency] = useState('Professional Working');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(item?.name || '');
    setProficiency(item?.proficiency || 'Professional Working');
  }, [item, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSave({ name, proficiency });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item ? 'Edit Language' : 'Add Language'} maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <LanguageFields name={name} setName={setName} proficiency={proficiency} setProficiency={setProficiency} />
        <div className="flex justify-end gap-3 pt-3 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isSubmitting}>{item ? 'Save Changes' : 'Add Language'}</Button>
        </div>
      </form>
    </Modal>
  );
};
