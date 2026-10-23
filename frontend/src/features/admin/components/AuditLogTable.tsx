import { Code2 } from 'lucide-react';
import type { FC } from 'react';

import { Badge, Button } from '../../../components/ui';
import type { AdminAuditLogEntry } from '../admin.types';

interface TableProps {
  logs: readonly AdminAuditLogEntry[];
  onInspect: (log: AdminAuditLogEntry) => void;
}

export const AuditLogTable: FC<TableProps> = ({ logs, onInspect }) => (
  <div className="rounded-2xl border border-border/80 bg-surface-raised overflow-hidden shadow-subtle card-specular">
    <div className="overflow-x-auto no-scrollbar">
      <table className="w-full text-start text-xs min-w-[650px]">
        <thead>
          <tr className="border-b border-border bg-surface-muted text-text-muted font-semibold uppercase tracking-wider text-[11px]">
            <th className="py-3 px-4">Timestamp</th>
            <th className="py-3 px-4">Admin</th>
            <th className="py-3 px-4">Action</th>
            <th className="py-3 px-4">Target</th>
            <th className="py-3 px-4">IP Address</th>
            <th className="py-3 px-4 text-end">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-surface/60 transition-colors">
              <td className="py-3.5 px-4 text-text-muted whitespace-nowrap font-mono tabular-nums">
                {new Date(log.createdAt).toLocaleString()}
              </td>
              <td className="py-3.5 px-4 font-semibold text-text">
                {log.adminEmail || log.adminId}
              </td>
              <td className="py-3.5 px-4">
                <Badge variant={log.action.includes('DELETE') || log.action.includes('SUSPEND') ? 'danger' : 'neutral'}>
                  {log.action}
                </Badge>
              </td>
              <td className="py-3.5 px-4 text-text-muted font-mono">
                {log.targetType} {log.targetUserId ? `(${log.targetUserId.slice(0, 8)}...)` : ''}
              </td>
              <td className="py-3.5 px-4 font-mono text-text-muted tabular-nums">{log.ip}</td>
              <td className="py-3.5 px-4 text-end">
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
  </div>
);
