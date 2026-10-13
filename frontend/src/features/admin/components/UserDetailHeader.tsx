import { ArrowLeft, Ban, CheckCircle2, KeyRound, Trash2 } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Button } from '../../../components/ui';
import type { AdminUserSummary } from '../admin.types';

interface HeaderProps {
  user: AdminUserSummary;
  onOpenStatusModal: () => void;
  onOpenRevokeModal: () => void;
  onOpenDeleteModal: () => void;
}

export const UserDetailHeader: FC<HeaderProps> = ({
  user,
  onOpenStatusModal,
  onOpenRevokeModal,
  onOpenDeleteModal,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="space-y-1">
      <Link to="/admin/users">
        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}>
          Back to Users Directory
        </Button>
      </Link>
      <div className="flex items-center gap-2 pt-1">
        <h1 className="text-xl font-bold tracking-tight text-text">{user.email}</h1>
        <Badge variant={user.role === 'admin' ? 'primary' : 'neutral'}>{user.role}</Badge>
        <Badge variant={user.status === 'active' ? 'success' : 'danger'}>{user.status}</Badge>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        leftIcon={user.status === 'active' ? <Ban className="h-3.5 w-3.5 text-amber-500" /> : <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
        onClick={onOpenStatusModal}
      >
        {user.status === 'active' ? 'Suspend' : 'Reactivate'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        leftIcon={<KeyRound className="h-3.5 w-3.5 text-primary" />}
        onClick={onOpenRevokeModal}
      >
        Revoke Links
      </Button>
      <Button
        variant="danger"
        size="sm"
        leftIcon={<Trash2 className="h-3.5 w-3.5" />}
        onClick={onOpenDeleteModal}
      >
        Delete User
      </Button>
    </div>
  </div>
);
