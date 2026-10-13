import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { SkipToContent } from '../components/common/SkipToContent';
import { useAuth } from '../features/auth/auth.context';

const MobileSidebarDrawer: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 start-0 z-50 w-72 max-w-[85vw] bg-surface-raised shadow-2xl">
        <AppSidebar onItemClick={onClose} className="w-full h-full" />
      </div>
    </div>
  );
};

const AppFooter: FC = () => (
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
);

export const AppLayout: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const showSidebar = Boolean(user && !isHomePage);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen bg-bg text-text">
      <SkipToContent />

      {showSidebar && (
        <div className="hidden lg:block sticky top-0 h-screen w-64 shrink-0">
          <AppSidebar className="h-full" />
        </div>
      )}

      {showSidebar && (
        <MobileSidebarDrawer isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      )}

      <div className="flex flex-1 flex-col min-w-0 min-h-screen">
        <AppHeader
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          showSidebar={showSidebar}
        />

        <main
          id="main-content"
          role="main"
          tabIndex={-1}
          className={`flex-1 min-w-0 px-3.5 py-5 sm:px-6 sm:py-8 lg:px-8 focus:outline-none ${
            showSidebar ? 'w-full' : 'mx-auto w-full max-w-7xl'
          }`}
        >
          <Outlet />
        </main>

        <AppFooter />
      </div>
    </div>
  );
};
