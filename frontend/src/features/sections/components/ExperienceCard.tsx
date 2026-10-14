import { Briefcase, Calendar, MapPin } from 'lucide-react';
import type { FC } from 'react';

import { ItemActions } from './ItemActions';
import { ItemLinksList } from './ItemLinksList';
import { Badge, Card } from '../../../components/ui';
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
  if (!item.startDate && !item.endDate && !item.isCurrent) return null;
  const end = item.isCurrent ? 'Present' : item.endDate || 'Present';
  return `${item.startDate || 'Start'} — ${end}`;
};

const ExperienceHeader: FC<{ location?: string | null }> = ({ location }) => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge variant="primary" size="sm">
      <Briefcase className="h-3 w-3" />
      <span>Experience</span>
    </Badge>
    {location && (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-surface text-text-muted border border-border">
        <MapPin className="h-3 w-3 text-text-muted/80" />
        <span>{location}</span>
      </span>
    )}
  </div>
);

const ExperienceDateRow: FC<{ dateStr: string | null; isCurrent: boolean }> = ({ dateStr, isCurrent }) => {
  if (!dateStr) return null;
  return (
    <div className="flex items-center gap-1.5 text-xs text-text-muted">
      <Calendar className="h-3.5 w-3.5 text-text-muted/80" />
      <span>{dateStr}</span>
      {isCurrent && (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active
        </span>
      )}
    </div>
  );
};

export const ExperienceCard: FC<ExperienceCardProps> = ({
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
    <Card className="hover:border-primary/30 transition-all shadow-sm hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-2 flex-1 min-w-0">
          <ExperienceHeader location={item.location} />
          <div>
            <h3 className="text-base font-semibold text-text">{item.title}</h3>
            {item.company && (
              <p className="text-sm font-medium text-text-muted mt-0.5">{item.company}</p>
            )}
          </div>
          <ExperienceDateRow dateStr={dateStr} isCurrent={item.isCurrent} />
          {item.description && (
            <p className="text-xs sm:text-sm text-text-muted mt-2 whitespace-pre-wrap leading-relaxed">
              {item.description}
            </p>
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
          deleteTitle="Delete Experience"
          deleteDescription={`Are you sure you want to delete "${item.title}" at "${item.company}"? This action cannot be undone.`}
        />
      </div>
    </Card>
  );
};

