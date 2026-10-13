import { FileText, Loader2 } from 'lucide-react';
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
        {isLoading && (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

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
