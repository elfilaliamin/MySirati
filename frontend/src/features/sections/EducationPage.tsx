import { BookOpen } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { EducationCard } from './components/EducationCard';
import { EducationModal } from './components/EducationModal';
import { SectionHeader } from './components/SectionHeader';
import type { EducationItem } from './sections.types';
import { swapAndReorder } from './useReorderHelper';
import { useSection } from './useSections';
import { EmptyState } from '../../components/ui';

export const EducationPage: FC = () => {
  const { items, createItem, updateItem, deleteItem, reorderItems } =
    useSection<EducationItem>('education');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);

  const handleOpenAdd = () => { setEditingItem(null); setModalOpen(true); };
  const handleOpenEdit = (it: EducationItem) => { setEditingItem(it); setModalOpen(true); };
  const handleSave = async (data: Partial<EducationItem>) => {
    if (editingItem) await updateItem({ id: editingItem.id, data });
    else await createItem(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SectionHeader
        icon={<BookOpen className="h-6 w-6" />}
        title="Education"
        subtitle="Academic credentials, degrees, and institutions."
        actionLabel="Add Degree"
        onAction={handleOpenAdd}
      />
      {items.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="h-6 w-6 text-primary" />}
          title="No education qualifications yet"
          description="Add your degrees, certifications, or academic programs to enrich your CV."
          actionLabel="Add Degree"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="space-y-4">
          {items.map((item, idx) => (
            <EducationCard
              key={item.id}
              item={item}
              canMoveUp={idx > 0}
              canMoveDown={idx < items.length - 1}
              onMoveUp={() => swapAndReorder(items, idx, 'up', reorderItems)}
              onMoveDown={() => swapAndReorder(items, idx, 'down', reorderItems)}
              onEdit={() => handleOpenEdit(item)}
              onDelete={() => deleteItem(item.id)}
            />
          ))}
        </div>
      )}
      <EducationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} item={editingItem} />
    </div>
  );
};
