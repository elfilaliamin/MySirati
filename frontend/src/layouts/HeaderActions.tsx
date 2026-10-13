import { Menu, ShieldAlert, X } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { UserMenu } from './UserMenu';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import { Badge, ThemeToggle } from '../components/ui';
import { useAuth } from '../features/auth/auth.context';

interface HeaderActionsProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const HeaderActions: FC<HeaderActionsProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
}) => {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {user?.role === 'admin' && (
        <Link to="/admin">
          <Badge variant="warning" className="cursor-pointer hover:opacity-80">
            <ShieldAlert className="h-3 w-3" />
            <span>Admin</span>
          </Badge>
        </Link>
      )}

      <LanguageSwitcher />
      <ThemeToggle />
      <UserMenu />

      <button
        type="button"
        onClick={toggleMobileMenu}
        className="lg:hidden rounded-lg p-2 text-text-muted hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
};
