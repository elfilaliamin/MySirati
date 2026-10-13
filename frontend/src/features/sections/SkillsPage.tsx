import { Code2 } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { SectionHeader } from './components/SectionHeader';
import { SkillCard } from './components/SkillCard';
import { SkillModal } from './components/SkillModal';
import type { SkillItem } from './sections.types';
import { swapAndReorder } from './useReorderHelper';
import { useSection } from './useSections';
import { EmptyState } from '../../components/ui';

export const SkillsPage: FC = () => {
  const { items, createItem, updateItem, deleteItem, reorderItems } =
    useSection<SkillItem>('skills');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SkillItem | null>(null);

  const handleOpenAdd = () => { setEditingItem(null); setModalOpen(true); };
  const handleOpenEdit = (it: SkillItem) => { setEditingItem(it); setModalOpen(true); };
  const handleSave = async (data: Partial<SkillItem>) => {
    if (editingItem) await updateItem({ id: editingItem.id, data });
    else await createItem(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SectionHeader
        icon={<Code2 className="h-6 w-6" />}
        title="Skills"
        subtitle="Technologies, tools, and competencies."
        actionLabel="Add Skill"
        onAction={handleOpenAdd}
      />
      {items.length === 0 ? (
        <EmptyState
          icon={<Code2 className="h-6 w-6 text-primary" />}
          title="No skills added yet"
          description="List your core technical proficiencies, frameworks, and methodologies."
          actionLabel="Add Skill"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item, idx) => (
            <SkillCard
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
      <SkillModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} item={editingItem} />
    </div>
  );
};
