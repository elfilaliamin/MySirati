import { Award, Calendar, GraduationCap, MonitorPlay, Terminal } from 'lucide-react';
import type { FC } from 'react';

import { ItemActions } from './ItemActions';
import { ItemLinksList } from './ItemLinksList';
import { Badge, type BadgeVariant, Card } from '../../../components/ui';
import type { EducationItem, EducationType } from '../sections.types';

interface EducationCardProps {
  item: EducationItem;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TYPE_META: Record<
  EducationType,
  {
    label: string;
    variant: BadgeVariant;
    icon: typeof GraduationCap;
  }
> = {
  academic: {
    label: 'Degree',
    variant: 'primary',
    icon: GraduationCap,
  },
  course: {
    label: 'Course',
    variant: 'success',
    icon: MonitorPlay,
  },
  bootcamp: {
    label: 'Bootcamp',
    variant: 'warning',
    icon: Terminal,
  },
  certificate: {
    label: 'Certification',
    variant: 'neutral',
    icon: Award,
  },
};

const formatDateRange = (item: EducationItem) => {
  if (!item.startDate && !item.endDate && !item.isCurrent) return null;
  const end = item.isCurrent ? 'In progress' : item.endDate || 'Completed';
  return `${item.startDate || 'Start'} — ${end}`;
};

const getEducationDetails = (item: EducationItem, isNonAcademic: boolean) => {
  const primaryTitle = isNonAcademic && item.degree ? item.degree : item.institution;
  const subtitle = isNonAcademic && item.degree
    ? `Provider: ${item.institution}`
    : [item.degree, item.fieldOfStudy].filter(Boolean).join(' in ');
  const topicTag = isNonAcademic && item.fieldOfStudy ? item.fieldOfStudy : null;
  return { primaryTitle, subtitle, topicTag };
};

const EducationHeader: FC<{
  meta: (typeof TYPE_META)[EducationType];
  topicTag: string | null;
  primaryTitle: string;
  subtitle: string;
}> = ({ meta, topicTag, primaryTitle, subtitle }) => {
  const Icon = meta.icon;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Badge variant={meta.variant} size="sm">
          <Icon className="h-3 w-3" />
          <span>{meta.label}</span>
        </Badge>
        {topicTag && (
          <span className="text-xs px-2 py-0.5 rounded-md bg-surface text-text-muted border border-border">
            {topicTag}
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold text-text">{primaryTitle}</h3>
      {subtitle && <p className="text-sm font-medium text-text-muted mt-0.5">{subtitle}</p>}
    </div>
  );
};

const EducationDateRow: FC<{ dateStr: string | null; isCurrent: boolean }> = ({ dateStr, isCurrent }) => {
  if (!dateStr) return null;
  return (
    <div className="flex items-center gap-2 text-xs text-text-muted">
      <Calendar className="h-3.5 w-3.5 text-text-muted/80 shrink-0" />
      <span className="font-mono tabular-nums">{dateStr}</span>
      {isCurrent && (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          Active
        </span>
      )}
    </div>
  );
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
  const itemType: EducationType = item.type || 'academic';
  const meta = TYPE_META[itemType] || TYPE_META.academic;
  const isNonAcademic = itemType !== 'academic';
  const { primaryTitle, subtitle, topicTag } = getEducationDetails(item, isNonAcademic);
  const dateStr = formatDateRange(item);

  return (
    <Card className="hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-2 flex-1 min-w-0">
          <EducationHeader
            meta={meta}
            topicTag={topicTag}
            primaryTitle={primaryTitle}
            subtitle={subtitle}
          />
          <EducationDateRow dateStr={dateStr} isCurrent={item.isCurrent} />
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
          deleteTitle="Delete Education"
          deleteDescription={`Are you sure you want to delete "${primaryTitle}"? This action cannot be undone.`}
        />
      </div>
    </Card>
  );
};
