import { ExternalLink } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Button } from '../../../components/ui';
import type { AdminUserSummary } from '../admin.types';

interface UsersTableProps {
  users: readonly AdminUserSummary[];
}

export const UsersTable: FC<UsersTableProps> = ({ users }) => (
  <div className="rounded-2xl border border-border/80 bg-surface-raised overflow-hidden shadow-subtle card-specular">
    <div className="overflow-x-auto no-scrollbar">
      <table className="w-full text-start text-xs min-w-[600px]">
        <thead>
          <tr className="border-b border-border bg-surface-muted text-text-muted font-semibold uppercase tracking-wider text-[11px]">
            <th className="py-3 px-4">User Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Registered</th>
            <th className="py-3 px-4 text-end">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-surface/60 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-text">
                <div className="flex items-center gap-2">
                  <span>{u.email}</span>
                  {u.emailVerified && <span className="text-success text-[10px]" title="Verified">●</span>}
                </div>
              </td>
              <td className="py-3.5 px-4">
                <Badge variant={u.role === 'admin' ? 'primary' : 'neutral'}>{u.role}</Badge>
              </td>
              <td className="py-3.5 px-4">
                <Badge variant={u.status === 'active' ? 'success' : 'danger'}>{u.status}</Badge>
              </td>
              <td className="py-3.5 px-4 text-text-muted font-mono tabular-nums">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3.5 px-4 text-end">
                <Link to={`/admin/users/${u.id}`}>
                  <Button size="sm" variant="ghost" rightIcon={<ExternalLink className="h-3.5 w-3.5" />}>
                    Inspect
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
