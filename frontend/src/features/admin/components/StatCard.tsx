import type { FC, ReactNode } from 'react';

import { Card } from '../../../components/ui';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  description?: string;
}

export const StatCard: FC<StatCardProps> = ({ title, value, icon, description }) => (
  <Card className="p-4 sm:p-5 flex items-center justify-between hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200">
    <div className="space-y-1">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider text-[11px]">{title}</p>
      <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text font-mono tabular-nums">{value}</p>
      {description && <p className="text-xs text-text-muted leading-relaxed">{description}</p>}
    </div>
    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-surface-muted border border-border text-primary shadow-subtle">
      {icon}
    </div>
  </Card>
);
