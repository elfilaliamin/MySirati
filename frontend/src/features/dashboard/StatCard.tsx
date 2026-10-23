import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Card } from '../../components/ui';

interface StatCardProps {
  label: string;
  count: number;
  icon: ReactNode;
  to: string;
}

export const StatCard: FC<StatCardProps> = ({ label, count, icon, to }) => (
  <Link to={to} className="block group">
    <Card className="p-4 sm:p-5 flex items-center justify-between group-hover:border-primary/40 group-hover:-translate-y-0.5 group-hover:shadow-card-hover transition-all duration-200">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-text-muted tracking-wide">{label}</p>
        <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text font-mono tabular-nums">{count}</p>
      </div>
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-surface border border-border text-primary group-hover:bg-primary-soft group-hover:scale-105 transition-all duration-200">
        {icon}
      </div>
    </Card>
  </Link>
);
