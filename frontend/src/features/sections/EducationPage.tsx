import { BookOpen } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { EducationModal } from './components/EducationModal';
import { SectionHeader } from './components/SectionHeader';
import { EducationContent } from './education/EducationContent';
import { useEducationFilters } from './education/useEducationFilters';
import type { EducationItem, EducationType } from './sections.types';
import { swapAndReorder } from './useReorderHelper';
import { useSection } from './useSections';

export const EducationPage: FC = () => {
  const { items, createItem, updateItem, deleteItem, reorderItems } =
    useSection<EducationItem>('education');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [modalInitialType, setModalInitialType] = useState<EducationType>('academic');
  const filter = useEducationFilters(items);

  const handleOpenAdd = (type: EducationType = 'academic') => {
    setEditingItem(null);
    setModalInitialType(type);
    setModalOpen(true);
  };

  const handleOpenEdit = (it: EducationItem) => {
    setEditingItem(it);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<EducationItem>) => {
    if (editingItem) await updateItem({ id: editingItem.id, data });
    else await createItem(data);
  };

  const initialAddType = (filter.selectedType as EducationType) || 'academic';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SectionHeader
        icon={<BookOpen className="h-6 w-6" />}
        title="Education & Certifications"
        subtitle="Academic degrees, online courses (Udemy, Coursera), bootcamps, and certifications."
        actionLabel="Add Education"
        onAction={() => handleOpenAdd(initialAddType)}
      />

      <EducationContent
        items={items}
        filter={filter}
        onMoveUp={(idx) => swapAndReorder(items, idx, 'up', reorderItems)}
        onMoveDown={(idx) => swapAndReorder(items, idx, 'down', reorderItems)}
        onEdit={handleOpenEdit}
        onDelete={(id) => deleteItem(id)}
        onAdd={() => handleOpenAdd(initialAddType)}
      />

      <EducationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        item={editingItem}
        initialType={modalInitialType}
      />
    </div>
  );
};

