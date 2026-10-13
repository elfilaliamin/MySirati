import { Settings, Trash2 } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteAccountModal } from './DeleteAccountModal';
import { ExportDataCard } from './ExportDataCard';
import { Button, Card, CardDescription, CardHeader, CardTitle, ThemeToggle, useToast } from '../../components/ui';
import { apiClient } from '../../lib/api-client';
import { useAuth } from '../auth/auth.context';

export const SettingsPage: FC = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = async (password: string) => {
    await apiClient('/api/account', { method: 'DELETE', data: { password } });
    showToast('Account permanently deleted', 'info');
    await logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text">Account Settings</h1>
          <p className="text-xs sm:text-sm text-text-muted">Appearance, data portability, and account management.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance & Theme</CardTitle>
          <CardDescription>Select your preferred color mode across light, dark, or system match.</CardDescription>
        </CardHeader>
        <ThemeToggle />
      </Card>

      <ExportDataCard />

      <Card className="border-danger/30">
        <CardHeader>
          <CardTitle className="text-danger">Danger Zone</CardTitle>
          <CardDescription>Permanently remove your account and all associated share links.</CardDescription>
        </CardHeader>
        <Button variant="danger" onClick={() => setDeleteModalOpen(true)} leftIcon={<Trash2 className="h-4 w-4" />}>
          Delete My Account
        </Button>
      </Card>

      <DeleteAccountModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirmDelete={handleDelete}
      />
    </div>
  );
};
