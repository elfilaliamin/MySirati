import { FileText } from 'lucide-react';
import type { FC } from 'react';

import { Badge, Card, CardHeader, CardTitle, EmptyState } from '../../../components/ui';
import type { AdminUserDetail } from '../admin.types';

interface AuditTrailCardProps {
  recentAuditLogs: AdminUserDetail['recentAuditLogs'];
}

export const UserAuditTrailCard: FC<AuditTrailCardProps> = ({ recentAuditLogs }) => (
  <Card className="p-4 space-y-3">
    <CardHeader>
      <CardTitle className="text-sm font-semibold flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary" />
        <span>Recent User Audit Events ({recentAuditLogs.length})</span>
      </CardTitle>
    </CardHeader>

    {recentAuditLogs.length === 0 ? (
      <EmptyState
        icon={<FileText className="h-5 w-5 text-primary" />}
        title="No audit events"
        description="No administrative actions recorded for this user yet."
      />
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-text-muted font-semibold">
              <th className="py-2 px-3">Action</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Admin IP</th>
              <th className="py-2 px-3">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentAuditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-surface-muted/30">
                <td className="py-2 px-3 font-medium">
                  <Badge variant="neutral">{log.action}</Badge>
                </td>
                <td className="py-2 px-3 text-text-muted">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-3 font-mono text-text-muted">{log.ip}</td>
                <td className="py-2 px-3 font-mono text-text-muted text-[11px] truncate max-w-xs">
                  {JSON.stringify(log.metadata)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </Card>
);
