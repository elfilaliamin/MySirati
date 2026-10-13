import { AlertTriangle, CheckCircle2, FileText, Link2, Users } from 'lucide-react';
import type { FC } from 'react';

import { StatCard } from './StatCard';
import type { AdminStats } from '../admin.types';

interface StatsGridProps {
  stats: AdminStats;
}

export const AdminOverviewStatsGrid: FC<StatsGridProps> = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <StatCard
      title="Total Registered Users"
      value={stats.totalUsers}
      icon={<Users className="h-5 w-5" />}
      description="All accounts in system"
    />
    <StatCard
      title="Active Accounts"
      value={stats.activeUsers}
      icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
      description="Permitted to login & share"
    />
    <StatCard
      title="Suspended Accounts"
      value={stats.suspendedUsers}
      icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
      description="Disabled due to moderation"
    />
    <StatCard
      title="Total AI Share Links"
      value={stats.totalShareLinks}
      icon={<Link2 className="h-5 w-5" />}
      description="Created across all users"
    />
    <StatCard
      title="Active Share Links"
      value={stats.activeShareLinks}
      icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
      description="Valid unexpired keys"
    />
    <StatCard
      title="Audit Log Events"
      value={stats.totalAuditLogs}
      icon={<FileText className="h-5 w-5 text-primary" />}
      description="Append-only record entries"
    />
  </div>
);
