import { Menu, X } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { MySiratiIcon } from '../components/ui';
import { useAuth } from '../features/auth/auth.context';

interface HeaderBrandProps {
  isMobileMenuOpen?: boolean;
  toggleMobileMenu?: () => void;
  showSidebar?: boolean;
}

export const HeaderBrand: FC<HeaderBrandProps> = ({
  isMobileMenuOpen = false,
  toggleMobileMenu,
  showSidebar = true,
}) => {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-3">
      {showSidebar && user && toggleMobileMenu && (
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="lg:hidden rounded-xl p-2 text-text-muted hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      )}

      {(!showSidebar || !user) && (
        <Link
          to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/'}
          className="flex items-center gap-2.5 font-bold text-text group"
        >
          <MySiratiIcon size={34} className="group-hover:scale-105 transition-transform" />
          <span className="text-base tracking-tight font-extrabold">MySirati</span>
        </Link>
      )}
    </div>
  );
};
