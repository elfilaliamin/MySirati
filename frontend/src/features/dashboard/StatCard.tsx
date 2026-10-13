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
    <Card className="p-5 flex items-center justify-between group-hover:border-primary/40 transition-colors">
      <div className="space-y-1">
        <p className="text-xs font-medium text-text-muted">{label}</p>
        <p className="text-2xl font-bold text-text">{count}</p>
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface border border-border text-primary group-hover:bg-primary-soft transition-colors">
        {icon}
      </div>
    </Card>
  </Link>
);
