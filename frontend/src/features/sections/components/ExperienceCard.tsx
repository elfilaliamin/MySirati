import { Briefcase, Calendar, MapPin } from 'lucide-react';
import type { FC } from 'react';

import { ItemActions } from './ItemActions';
import { ItemLinksList } from './ItemLinksList';
import { Card } from '../../../components/ui';
import type { ExperienceItem } from '../sections.types';

interface ExperienceCardProps {
  item: ExperienceItem;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const formatDateRange = (item: ExperienceItem) => {
  const end = item.isCurrent ? 'Present' : item.endDate || 'Unknown';
  return `${item.startDate || 'Unknown'} — ${end}`;
};

export const ExperienceCard: FC<ExperienceCardProps> = ({
  item,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}) => (
  <Card className="hover:border-primary/30 transition-colors">
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="space-y-1.5 flex-1">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-primary shrink-0" />
          <h3 className="text-base font-semibold text-text">{item.title}</h3>
          <span className="text-xs text-text-muted">at</span>
          <span className="text-sm font-medium text-text">{item.company}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
          {item.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{item.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDateRange(item)}</span>
          </div>
        </div>
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
      />
    </div>
  </Card>
);
