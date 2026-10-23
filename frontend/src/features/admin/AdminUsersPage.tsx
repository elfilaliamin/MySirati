import { Users } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { AdminNav } from './components/AdminNav';
import { PaginationControls } from './components/PaginationControls';
import { UserFiltersBar } from './components/UserFiltersBar';
import { UsersTable } from './components/UsersTable';
import { useAdminUsers } from './useAdminUsers';
import { Card, EmptyState } from '../../components/ui';

const UsersTableSkeleton: FC = () => (
  <div className="space-y-2.5 p-2 animate-pulse">
    <div className="h-10 bg-surface-muted/80 rounded-lg" />
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="h-12 bg-surface-muted/50 rounded-lg flex items-center justify-between px-4"
      >
        <div className="h-4 w-36 bg-surface-muted/90 rounded" />
        <div className="h-4 w-28 bg-surface-muted/90 rounded" />
        <div className="h-4 w-20 bg-surface-muted/90 rounded" />
        <div className="h-6 w-16 bg-surface-muted/90 rounded-full" />
      </div>
    ))}
  </div>
);

export const AdminUsersPage: FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');

  const { data, isLoading } = useAdminUsers({ page, limit: 10, search, status, role });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AdminNav />

      <UserFiltersBar
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        status={status}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
        role={role}
        onRoleChange={(v) => { setRole(v); setPage(1); }}
      />

      <Card className="p-4 space-y-4">
        {isLoading && <UsersTableSkeleton />}

        {!isLoading && (!data?.items || data.items.length === 0) && (
          <EmptyState
            icon={<Users className="h-6 w-6 text-primary" />}
            title="No users found"
            description="No user accounts match the current filter criteria."
          />
        )}

        {!isLoading && data?.items && data.items.length > 0 && (
          <>
            <UsersTable users={data.items} />
            <PaginationControls
              page={data.page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </Card>
    </div>
  );
};
