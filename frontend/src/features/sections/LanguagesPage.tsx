import { Languages } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { LanguageCard } from './components/LanguageCard';
import { LanguageModal } from './components/LanguageModal';
import { SectionHeader } from './components/SectionHeader';
import type { LanguageItem } from './sections.types';
import { swapAndReorder } from './useReorderHelper';
import { useSection } from './useSections';
import { EmptyState, SkeletonList } from '../../components/ui';

export const LanguagesPage: FC = () => {
  const { items, isLoading, createItem, updateItem, deleteItem, reorderItems } =
    useSection<LanguageItem>('languages');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LanguageItem | null>(null);

  const handleOpenAdd = () => { setEditingItem(null); setModalOpen(true); };
  const handleOpenEdit = (it: LanguageItem) => { setEditingItem(it); setModalOpen(true); };
  const handleSave = async (data: Partial<LanguageItem>) => {
    if (editingItem) await updateItem({ id: editingItem.id, data });
    else await createItem(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SectionHeader
        icon={<Languages className="h-6 w-6" />}
        title="Languages"
        subtitle="Spoken and written language competencies."
        actionLabel="Add Language"
        onAction={handleOpenAdd}
      />
      {isLoading ? (
        <SkeletonList count={2} />
      ) : items.length === 0 ? (
        <EmptyState
          icon={<Languages className="h-6 w-6 text-primary" />}
          title="No languages added yet"
          description="Add spoken and written languages along with your fluency level."
          actionLabel="Add Language"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item, idx) => (
            <LanguageCard
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
      <LanguageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} item={editingItem} />
    </div>
  );
};
