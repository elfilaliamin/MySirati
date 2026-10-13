import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { NAV_LINKS } from '../constants/nav.constants';
import { useI18n } from '../i18n/i18n.context';
import type { TranslationDictionary } from '../i18n/i18n.types';

const NAV_KEYS: Record<string, keyof TranslationDictionary['nav']> = {
  '/dashboard': 'dashboard',
  '/profile': 'profile',
  '/education': 'education',
  '/experiences': 'experiences',
  '/projects': 'projects',
  '/skills': 'skills',
  '/languages': 'languages',
  '/share': 'shareLinks',
  '/settings': 'settings',
};

export const NavItems: FC<{ onItemClick?: () => void; isMobile?: boolean }> = ({
  onItemClick,
  isMobile = false,
}) => {
  const { t } = useI18n();

  const baseClasses = isMobile
    ? 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors'
    : 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors';

  return (
    <>
      {NAV_LINKS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onItemClick}
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? 'bg-primary-soft text-primary font-semibold'
                : 'text-text-muted hover:text-text hover:bg-surface'
            }`
          }
        >
          <Icon className={isMobile ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
          <span>{NAV_KEYS[to] ? t.nav[NAV_KEYS[to]] : label}</span>
        </NavLink>
      ))}
    </>
  );
};
