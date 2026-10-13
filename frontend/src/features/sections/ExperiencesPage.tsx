import { Briefcase } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { ExperienceCard } from './components/ExperienceCard';
import { ExperienceModal } from './components/ExperienceModal';
import { SectionHeader } from './components/SectionHeader';
import type { ExperienceItem } from './sections.types';
import { swapAndReorder } from './useReorderHelper';
import { useSection } from './useSections';
import { EmptyState } from '../../components/ui';

export const ExperiencesPage: FC = () => {
  const { items, createItem, updateItem, deleteItem, reorderItems } =
    useSection<ExperienceItem>('experiences');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);

  const handleOpenAdd = () => { setEditingItem(null); setModalOpen(true); };
  const handleOpenEdit = (it: ExperienceItem) => { setEditingItem(it); setModalOpen(true); };
  const handleSave = async (data: Partial<ExperienceItem>) => {
    if (editingItem) await updateItem({ id: editingItem.id, data });
    else await createItem(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SectionHeader
        icon={<Briefcase className="h-6 w-6" />}
        title="Work Experiences"
        subtitle="Professional roles, employment history, and key achievements."
        actionLabel="Add Experience"
        onAction={handleOpenAdd}
      />
      {items.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-6 w-6 text-primary" />}
          title="No work experiences yet"
          description="Add your career roles and achievements to highlight your track record."
          actionLabel="Add Experience"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="space-y-4">
          {items.map((item, idx) => (
            <ExperienceCard
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
      <ExperienceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} item={editingItem} />
    </div>
  );
};
