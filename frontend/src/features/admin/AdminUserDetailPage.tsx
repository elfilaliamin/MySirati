import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UserAuditTrailCard } from './components/UserAuditTrailCard';
import { UserDetailHeader } from './components/UserDetailHeader';
import { UserDetailModals } from './components/UserDetailModals';
import { UserProfileCard } from './components/UserProfileCard';
import { UserShareLinksCard } from './components/UserShareLinksCard';
import { useAdminUserDetail, useAdminUserMutations } from './useAdminUserDetail';
import { Card, Skeleton } from '../../components/ui';

const AdminUserDetailSkeleton: FC = () => (
  <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 rounded" />
        <Skeleton className="h-4 w-64 rounded" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 space-y-4">
        <Skeleton className="h-6 w-36 rounded" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
      </Card>
      <Card className="p-6 space-y-4">
        <Skeleton className="h-6 w-36 rounded" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
      </Card>
    </div>
  </div>
);

export const AdminUserDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: detail, isLoading, error } = useAdminUserDetail(id);
  const mutations = useAdminUserMutations(id || '');

  const [statusOpen, setStatusOpen] = useState(false);
  const [revokeOpen, setRevokeOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (isLoading) {
    return <AdminUserDetailSkeleton />;
  }

  if (error || !detail) {
    return (
      <div className="p-4 rounded-xl border border-danger/20 bg-danger/10 text-danger text-xs font-medium">
        {(error as Error)?.message || 'The requested user could not be found.'}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <UserDetailHeader
        user={detail.user}
        onOpenStatusModal={() => setStatusOpen(true)}
        onOpenRevokeModal={() => setRevokeOpen(true)}
        onOpenDeleteModal={() => setDeleteOpen(true)}
      />
      <UserProfileCard detail={detail} />
      <UserShareLinksCard shareLinks={detail.shareLinks} />
      <UserAuditTrailCard recentAuditLogs={detail.recentAuditLogs} />
      <UserDetailModals
        userEmail={detail.user.email}
        userStatus={detail.user.status}
        statusOpen={statusOpen}
        onCloseStatus={() => setStatusOpen(false)}
        revokeOpen={revokeOpen}
        onCloseRevoke={() => setRevokeOpen(false)}
        deleteOpen={deleteOpen}
        onCloseDelete={() => setDeleteOpen(false)}
        mutations={mutations}
        onDeleted={() => navigate('/admin/users')}
      />
    </div>
  );
};
