import { ExternalLink } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Button } from '../../../components/ui';
import type { AdminUserSummary } from '../admin.types';

interface UsersTableProps {
  users: readonly AdminUserSummary[];
}

export const UsersTable: FC<UsersTableProps> = ({ users }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-xs min-w-[600px]">
      <thead>
        <tr className="border-b border-border bg-surface-muted text-text-muted font-semibold uppercase tracking-wider">
          <th className="py-2.5 px-3">User Email</th>
          <th className="py-2.5 px-3">Role</th>
          <th className="py-2.5 px-3">Status</th>
          <th className="py-2.5 px-3">Registered</th>
          <th className="py-2.5 px-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {users.map((u) => (
          <tr key={u.id} className="hover:bg-surface-muted/50 transition-colors">
            <td className="py-3 px-3 font-medium text-text">
              <div className="flex items-center gap-1.5">
                <span>{u.email}</span>
                {u.emailVerified && <span className="text-emerald-500 text-[10px]">●</span>}
              </div>
            </td>
            <td className="py-3 px-3">
              <Badge variant={u.role === 'admin' ? 'primary' : 'neutral'}>{u.role}</Badge>
            </td>
            <td className="py-3 px-3">
              <Badge variant={u.status === 'active' ? 'success' : 'danger'}>{u.status}</Badge>
            </td>
            <td className="py-3 px-3 text-text-muted">
              {new Date(u.createdAt).toLocaleDateString()}
            </td>
            <td className="py-3 px-3 text-right">
              <Link to={`/admin/users/${u.id}`}>
                <Button size="sm" variant="ghost" rightIcon={<ExternalLink className="h-3 w-3" />}>
                  Inspect
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
