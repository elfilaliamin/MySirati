import { ShieldAlert } from 'lucide-react';
import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Badge, Button, ThemeToggle } from '../components/ui';
import { useAuth } from '../features/auth/auth.context';
import { useI18n } from '../i18n/i18n.context';

export const HeaderActions: FC = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
      {user && isHomePage && (
        <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
          <Button size="sm" className="whitespace-nowrap">
            {user.role === 'admin' ? 'Admin Portal' : t.nav.dashboard}
          </Button>
        </Link>
      )}

      {user?.role === 'admin' && (
        <Link to="/admin">
          <Badge variant="warning" className="cursor-pointer hover:opacity-80 shrink-0">
            <ShieldAlert className="h-3 w-3" />
            <span className="hidden sm:inline">Admin</span>
          </Badge>
        </Link>
      )}

      <ThemeToggle variant="icon" />

      {!user && (
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              {t.nav.signIn}
            </Button>
          </Link>
          <Link to="/register" className="hidden sm:inline-flex">
            <Button size="sm" className="whitespace-nowrap">
              {t.nav.getStarted}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
