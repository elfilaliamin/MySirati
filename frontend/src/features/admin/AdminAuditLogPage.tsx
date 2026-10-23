import { FileText } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import type { AdminAuditLogEntry } from './admin.types';
import { AdminNav } from './components/AdminNav';
import { AuditFiltersBar } from './components/AuditFiltersBar';
import { AuditLogTable } from './components/AuditLogTable';
import { MetadataModal } from './components/MetadataModal';
import { PaginationControls } from './components/PaginationControls';
import { useAdminAuditLogs } from './useAdminAuditLogs';
import { Card, EmptyState } from '../../components/ui';

const AuditLogTableSkeleton: FC = () => (
  <div className="space-y-2.5 p-2 animate-pulse">
    <div className="h-10 bg-surface-muted/80 rounded-lg" />
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="h-12 bg-surface-muted/50 rounded-lg flex items-center justify-between px-4"
      >
        <div className="h-4 w-44 bg-surface-muted/90 rounded" />
        <div className="h-4 w-24 bg-surface-muted/90 rounded" />
        <div className="h-4 w-32 bg-surface-muted/90 rounded" />
        <div className="h-6 w-14 bg-surface-muted/90 rounded-full" />
      </div>
    ))}
  </div>
);

export const AdminAuditLogPage: FC = () => {
  const [page, setPage] = useState(1);
  const [action, setAction] = useState('');
  const [inspectLog, setInspectLog] = useState<AdminAuditLogEntry | null>(null);

  const { data, isLoading } = useAdminAuditLogs({ page, limit: 15, action });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AdminNav />

      <AuditFiltersBar
        action={action}
        onActionChange={(v) => { setAction(v); setPage(1); }}
      />

      <Card className="p-4 space-y-4">
        {isLoading && <AuditLogTableSkeleton />}

        {!isLoading && (!data?.items || data.items.length === 0) && (
          <EmptyState
            icon={<FileText className="h-6 w-6 text-primary" />}
            title="No audit events found"
            description="No administrative logs match the selected filter criteria."
          />
        )}

        {!isLoading && data?.items && data.items.length > 0 && (
          <>
            <AuditLogTable logs={data.items} onInspect={setInspectLog} />
            <PaginationControls
              page={data.page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </Card>

      <MetadataModal
        isOpen={Boolean(inspectLog)}
        onClose={() => setInspectLog(null)}
        metadata={inspectLog?.metadata || null}
        action={inspectLog?.action || ''}
      />
    </div>
  );
};
