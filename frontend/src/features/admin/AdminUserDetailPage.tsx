import { Loader2 } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UserAuditTrailCard } from './components/UserAuditTrailCard';
import { UserDetailHeader } from './components/UserDetailHeader';
import { UserDetailModals } from './components/UserDetailModals';
import { UserProfileCard } from './components/UserProfileCard';
import { UserShareLinksCard } from './components/UserShareLinksCard';
import { useAdminUserDetail, useAdminUserMutations } from './useAdminUserDetail';

export const AdminUserDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: detail, isLoading, error } = useAdminUserDetail(id);
  const mutations = useAdminUserMutations(id || '');

  const [statusOpen, setStatusOpen] = useState(false);
  const [revokeOpen, setRevokeOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
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
