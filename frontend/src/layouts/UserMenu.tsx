import { LogOut } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '../components/ui';
import { useAuth } from '../features/auth/auth.context';

export const UserMenu: FC = () => {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-border">
      <span className="text-xs text-text-muted truncate max-w-[140px]">{user.email}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={logout}
        aria-label="Sign out"
        title="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};
