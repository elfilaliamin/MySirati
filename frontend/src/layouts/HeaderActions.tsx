import { Plus, ShieldAlert, Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Button, ThemeToggle } from '../components/ui';
import { useAuth } from '../features/auth/auth.context';
import { useI18n } from '../i18n/i18n.context';

export const HeaderActions: FC = () => {
  const { user } = useAuth();
  const { t } = useI18n();

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {user && (
        <div className="hidden sm:flex items-center gap-2 mr-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>AI Ready</span>
          </div>

          <Link to="/share/new">
            <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              + New AI Link
            </Button>
          </Link>
        </div>
      )}

      {user?.role === 'admin' && (
        <Link to="/admin">
          <Badge variant="warning" className="cursor-pointer hover:opacity-80">
            <ShieldAlert className="h-3 w-3" />
            <span>Admin</span>
          </Badge>
        </Link>
      )}

      <ThemeToggle />

      {!user && (
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              {t.nav.signIn}
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">
              {t.nav.getStarted}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
