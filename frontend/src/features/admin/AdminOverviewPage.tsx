import { Info, Loader2 } from 'lucide-react';
import type { FC } from 'react';

import { AdminNav } from './components/AdminNav';
import { AdminOverviewStatsGrid } from './components/AdminOverviewStatsGrid';
import { AdminQuickActions } from './components/AdminQuickActions';
import { useAdminStats } from './useAdminStats';

export const AdminOverviewPage: FC = () => {
  const { data, isLoading, error } = useAdminStats();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AdminNav />

      {isLoading && (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl border border-danger/20 bg-danger/10 text-danger text-xs font-medium">
          {(error as Error).message || 'Unable to connect to administration endpoint.'}
        </div>
      )}

      {data?.stats && (
        <>
          <AdminOverviewStatsGrid stats={data.stats} />
          <AdminQuickActions />
          <div className="rounded-2xl border border-border/80 bg-surface/70 p-4 sm:p-5 flex items-start gap-3.5 shadow-subtle card-specular">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs text-text-muted">
              <p className="font-bold text-text tracking-tight">Security & Privacy Protocol (DEC-001)</p>
              <p className="leading-relaxed">
                Administrative routes return 404 to non-privileged users to conceal backend endpoints.
                Every user detail inspection, account status change, and link revocation is logged with
                client IP and admin credentials to the append-only audit trail.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
