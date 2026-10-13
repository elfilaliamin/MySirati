import { Plus } from 'lucide-react';
import type { FC, ReactNode } from 'react';

import { Button } from '../../../components/ui';

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  actionLabel: string;
  onAction: () => void;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
        {icon}
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text">{title}</h1>
        <p className="text-xs sm:text-sm text-text-muted">{subtitle}</p>
      </div>
    </div>
    <Button onClick={onAction} className="w-full sm:w-auto" leftIcon={<Plus className="h-4 w-4" />}>
      {actionLabel}
    </Button>
  </div>
);
