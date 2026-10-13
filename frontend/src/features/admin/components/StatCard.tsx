import type { FC, ReactNode } from 'react';

import { Card } from '../../../components/ui';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  description?: string;
}

export const StatCard: FC<StatCardProps> = ({ title, value, icon, description }) => (
  <Card className="p-4 flex items-center justify-between">
    <div className="space-y-1">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold tracking-tight text-text">{value}</p>
      {description && <p className="text-xs text-text-muted">{description}</p>}
    </div>
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-muted border border-border text-primary">
      {icon}
    </div>
  </Card>
);
