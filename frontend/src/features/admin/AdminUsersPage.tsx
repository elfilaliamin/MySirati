import { Loader2, Users } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { AdminNav } from './components/AdminNav';
import { PaginationControls } from './components/PaginationControls';
import { UserFiltersBar } from './components/UserFiltersBar';
import { UsersTable } from './components/UsersTable';
import { useAdminUsers } from './useAdminUsers';
import { Card, EmptyState } from '../../components/ui';

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
        {isLoading && (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

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
