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
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
        {icon}
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text">{title}</h1>
        <p className="text-xs sm:text-sm text-text-muted">{subtitle}</p>
      </div>
    </div>
    <Button onClick={onAction} leftIcon={<Plus className="h-4 w-4" />}>
      {actionLabel}
    </Button>
  </div>
);
