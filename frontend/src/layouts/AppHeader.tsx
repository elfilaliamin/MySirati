import type { FC } from 'react';

import { HeaderActions } from './HeaderActions';
import { HeaderBrand } from './HeaderBrand';

interface AppHeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  showSidebar?: boolean;
}

export const AppHeader: FC<AppHeaderProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  showSidebar = true,
}) => (
  <header className="sticky top-0 z-40 w-full border-b border-border bg-surface-raised">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
      <HeaderBrand
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        showSidebar={showSidebar}
      />
      <HeaderActions />
    </div>
  </header>
);
