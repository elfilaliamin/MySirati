import { Code2 } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { SectionHeader } from './components/SectionHeader';
import { SkillModal } from './components/SkillModal';
import type { SkillItem } from './sections.types';
import { SkillsContent } from './skills/SkillsContent';
import { useSkillFilters } from './skills/useSkillFilters';
import { useSection } from './useSections';

export const SkillsPage: FC = () => {
  const { items, isLoading, createItem, updateItem, deleteItem } =
    useSection<SkillItem>('skills');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SkillItem | null>(null);
  const filter = useSkillFilters(items);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };
  const handleOpenEdit = (it: SkillItem) => {
    setEditingItem(it);
    setModalOpen(true);
  };
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
      <SkillsContent
        items={items}
        filter={filter}
        onEdit={handleOpenEdit}
        onDelete={(id) => deleteItem(id)}
        onAdd={handleOpenAdd}
        isLoading={isLoading}
      />
      <SkillModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        item={editingItem}
      />
    </div>
  );
};
