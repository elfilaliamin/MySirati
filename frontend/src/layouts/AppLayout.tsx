import { LogOut } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { AppHeader } from './AppHeader';
import { NavItems } from './NavItems';
import { SkipToContent } from '../components/common/SkipToContent';
import { Button } from '../components/ui';
import { useAuth } from '../features/auth/auth.context';

export const AppLayout: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <SkipToContent />
      <AppHeader
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-surface-raised px-4 py-4 shadow-md">
          <nav className="flex flex-col gap-1">
            <NavItems onItemClick={closeMobileMenu} isMobile />
            {user && (
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-text-muted">{user.email}</span>
                <Button variant="outline" size="sm" onClick={logout} leftIcon={<LogOut className="h-4 w-4" />}>
                  Sign out
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}

      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 focus:outline-none"
      >
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-border bg-surface-raised py-6 text-center text-xs text-text-muted">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between px-4 sm:px-6 gap-2">
          <p>© {new Date().getFullYear()} MySirati. AI-ready career profile platform.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-text hover:underline">
              Privacy Policy & Moderation Disclosure
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
