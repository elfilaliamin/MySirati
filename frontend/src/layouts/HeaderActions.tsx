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
    <div className="flex items-center gap-2 sm:gap-3">
      {user && isHomePage && (
        <Link to="/dashboard">
          <Button size="sm">
            {t.nav.dashboard}
          </Button>
        </Link>
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
