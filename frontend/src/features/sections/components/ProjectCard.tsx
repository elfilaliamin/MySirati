import { Calendar, FolderGit2 } from 'lucide-react';
import type { FC } from 'react';

import { ItemActions } from './ItemActions';
import { ItemLinksList } from './ItemLinksList';
import { Card } from '../../../components/ui';
import type { ProjectItem } from '../sections.types';

interface ProjectCardProps {
  item: ProjectItem;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const formatDateRange = (item: ProjectItem) => {
  if (!item.startDate && !item.endDate) return null;
  return `${item.startDate || 'Unknown'} — ${item.endDate || 'Present'}`;
};

export const ProjectCard: FC<ProjectCardProps> = ({
  item,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}) => {
  const dateStr = formatDateRange(item);

  return (
    <Card className="hover:border-primary/30 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2">
              <FolderGit2 className="h-4 w-4 text-primary shrink-0" />
              <h3 className="text-base font-semibold text-text">{item.name}</h3>
            </div>
            {item.role && (
              <p className="text-xs sm:text-sm font-medium text-text-muted mt-0.5">
                {item.role}
              </p>
            )}
          </div>
          {dateStr && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Calendar className="h-3.5 w-3.5" />
              <span>{dateStr}</span>
            </div>
          )}
          {item.description && (
            <p className="text-xs sm:text-sm text-text-muted mt-2 whitespace-pre-wrap">{item.description}</p>
          )}
          <ItemLinksList links={item.links} />
        </div>
        <ItemActions
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onEdit={onEdit}
          onDelete={onDelete}
          deleteTitle="Delete Project"
          deleteDescription={`Are you sure you want to delete "${item.name}"? This action cannot be undone.`}
        />
      </div>
    </Card>
  );
};
