import { FolderGit2 } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { SectionHeader } from './components/SectionHeader';
import type { ProjectItem } from './sections.types';
import { swapAndReorder } from './useReorderHelper';
import { useSection } from './useSections';
import { EmptyState, SkeletonList } from '../../components/ui';

export const ProjectsPage: FC = () => {
  const { items, isLoading, createItem, updateItem, deleteItem, reorderItems } =
    useSection<ProjectItem>('projects');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);

  const handleOpenAdd = () => { setEditingItem(null); setModalOpen(true); };
  const handleOpenEdit = (it: ProjectItem) => { setEditingItem(it); setModalOpen(true); };
  const handleSave = async (data: Partial<ProjectItem>) => {
    if (editingItem) await updateItem({ id: editingItem.id, data });
    else await createItem(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SectionHeader
        icon={<FolderGit2 className="h-6 w-6" />}
        title="Projects"
        subtitle="Portfolio, open-source work, and key personal projects."
        actionLabel="Add Project"
        onAction={handleOpenAdd}
      />
      {isLoading ? (
        <SkeletonList count={3} />
      ) : items.length === 0 ? (
        <EmptyState
          icon={<FolderGit2 className="h-6 w-6 text-primary" />}
          title="No projects yet"
          description="Showcase software, architecture whitepapers, or creative work."
          actionLabel="Add Project"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="space-y-4">
          {items.map((item, idx) => (
            <ProjectCard
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
      <ProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} item={editingItem} />
    </div>
  );
};
