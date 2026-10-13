import { BookOpen, Calendar } from 'lucide-react';
import type { FC } from 'react';

import { ItemActions } from './ItemActions';
import { ItemLinksList } from './ItemLinksList';
import { Card } from '../../../components/ui';
import type { EducationItem } from '../sections.types';

interface EducationCardProps {
  item: EducationItem;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const formatDateRange = (item: EducationItem) => {
  if (!item.startDate && !item.endDate && !item.isCurrent) return null;
  const end = item.isCurrent ? 'Present' : item.endDate || 'Unknown';
  return `${item.startDate || 'Unknown'} — ${end}`;
};

export const EducationCard: FC<EducationCardProps> = ({
  item,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}) => {
  const dateStr = formatDateRange(item);
  const degreeStr = [item.degree, item.fieldOfStudy].filter(Boolean).join(' in ');

  return (
    <Card className="hover:border-primary/30 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary shrink-0" />
            <h3 className="text-base font-semibold text-text">{item.institution}</h3>
          </div>
          {degreeStr && <p className="text-sm font-medium text-text-muted">{degreeStr}</p>}
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
        />
      </div>
    </Card>
  );
};
