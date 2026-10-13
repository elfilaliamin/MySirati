import { Link2 } from 'lucide-react';
import type { FC } from 'react';

import { Badge, Card, CardHeader, CardTitle, EmptyState } from '../../../components/ui';
import type { AdminUserDetail } from '../admin.types';

interface ShareLinksCardProps {
  shareLinks: AdminUserDetail['shareLinks'];
}

export const UserShareLinksCard: FC<ShareLinksCardProps> = ({ shareLinks }) => (
  <Card className="p-4 space-y-3">
    <CardHeader>
      <CardTitle className="text-sm font-semibold flex items-center gap-2">
        <Link2 className="h-4 w-4 text-primary" />
        <span>User AI Share Links ({shareLinks.length})</span>
      </CardTitle>
    </CardHeader>

    {shareLinks.length === 0 ? (
      <EmptyState
        icon={<Link2 className="h-5 w-5 text-primary" />}
        title="No share links"
        description="This user has not generated any AI share links."
      />
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-text-muted font-semibold">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Prefix</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Created</th>
              <th className="py-2 px-3">Last Used</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {shareLinks.map((link) => (
              <tr key={link.id} className="hover:bg-surface-muted/30">
                <td className="py-2 px-3 font-medium text-text">{link.name}</td>
                <td className="py-2 px-3 font-mono text-text-muted">{link.keyPrefix}...</td>
                <td className="py-2 px-3">
                  <Badge variant={link.revokedAt ? 'danger' : 'success'}>
                    {link.revokedAt ? 'Revoked' : 'Active'}
                  </Badge>
                </td>
                <td className="py-2 px-3 text-text-muted">
                  {new Date(link.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-3 text-text-muted">
                  {link.lastUsedAt ? new Date(link.lastUsedAt).toLocaleDateString() : 'Never'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </Card>
);
