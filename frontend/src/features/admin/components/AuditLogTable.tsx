import { Code2 } from 'lucide-react';
import type { FC } from 'react';

import { Badge, Button } from '../../../components/ui';
import type { AdminAuditLogEntry } from '../admin.types';

interface TableProps {
  logs: readonly AdminAuditLogEntry[];
  onInspect: (log: AdminAuditLogEntry) => void;
}

export const AuditLogTable: FC<TableProps> = ({ logs, onInspect }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-xs min-w-[650px]">
      <thead>
        <tr className="border-b border-border bg-surface-muted text-text-muted font-semibold uppercase tracking-wider">
          <th className="py-2.5 px-3">Timestamp</th>
          <th className="py-2.5 px-3">Admin</th>
          <th className="py-2.5 px-3">Action</th>
          <th className="py-2.5 px-3">Target</th>
          <th className="py-2.5 px-3">IP Address</th>
          <th className="py-2.5 px-3 text-right">Details</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {logs.map((log) => (
          <tr key={log.id} className="hover:bg-surface-muted/50 transition-colors">
            <td className="py-3 px-3 text-text-muted whitespace-nowrap">
              {new Date(log.createdAt).toLocaleString()}
            </td>
            <td className="py-3 px-3 font-medium text-text">
              {log.adminEmail || log.adminId}
            </td>
            <td className="py-3 px-3">
              <Badge variant={log.action.includes('DELETE') || log.action.includes('SUSPEND') ? 'danger' : 'neutral'}>
                {log.action}
              </Badge>
            </td>
            <td className="py-3 px-3 text-text-muted">
              {log.targetType} {log.targetUserId ? `(${log.targetUserId.slice(0, 8)}...)` : ''}
            </td>
            <td className="py-3 px-3 font-mono text-text-muted">{log.ip}</td>
            <td className="py-3 px-3 text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onInspect(log)}
                leftIcon={<Code2 className="h-3.5 w-3.5" />}
              >
                Payload
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
