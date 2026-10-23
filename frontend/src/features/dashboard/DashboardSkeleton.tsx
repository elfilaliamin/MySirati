import type { FC } from 'react';

import { Card, Skeleton, SkeletonStatsGrid } from '../../components/ui';

export const DashboardSkeleton: FC = () => (
  <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 rounded-lg" />
        <Skeleton className="h-4 w-96 max-w-full rounded" />
      </div>
      <Skeleton className="h-10 w-44 rounded-xl" />
    </div>

    <SkeletonStatsGrid count={5} />

    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 rounded" />
          <Skeleton className="h-3.5 w-72 max-w-full rounded" />
        </div>
        <Skeleton className="h-8 w-16 rounded-lg" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-xl" />
        ))}
      </div>
    </Card>

    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-56 rounded" />
          <Skeleton className="h-3.5 w-80 rounded" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>
    </Card>
  </div>
);
