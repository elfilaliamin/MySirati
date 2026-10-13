import { LogOut, ShieldAlert } from 'lucide-react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { NAV_GROUPS } from '../constants/nav.constants';
import type { NavLinkItem } from '../constants/nav.constants';
import { useAuth } from '../features/auth/auth.context';
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

const GROUP_TITLES: Record<string, Record<string, string>> = {
  en: { overview: 'Overview', career: 'Career Profile', account: 'Account' },
  fr: { overview: 'Général', career: 'Profil Professionnel', account: 'Compte' },
  ar: { overview: 'نظرة عامة', career: 'الملف المهني', account: 'الحساب' },
};

const SidebarItem: FC<{ item: NavLinkItem; onItemClick?: () => void }> = ({
  item,
  onItemClick,
}) => {
  const { t } = useI18n();
  const Icon = item.icon;
  const navKey = NAV_KEYS[item.to];
  const label = navKey ? t.nav[navKey] : item.label;

  return (
    <NavLink
      to={item.to}
      onClick={onItemClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
          isActive
            ? 'bg-primary-soft text-primary font-semibold shadow-xs'
            : 'text-text-muted hover:text-text hover:bg-surface'
        }`
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </NavLink>
  );
};

const SidebarUserFooter: FC<{ onItemClick?: () => void }> = ({ onItemClick }) => {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  if (!user) return null;

  return (
    <div className="pt-3 mt-auto border-t border-border flex items-center justify-between gap-2">
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-medium text-text truncate">{user.email}</span>
        <span className="text-[10px] text-text-muted capitalize">{user.role}</span>
      </div>
      <button
        type="button"
        onClick={() => {
          onItemClick?.();
          void logout();
        }}
        className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-surface transition-colors"
        aria-label={t.nav.signOut}
        title={t.nav.signOut}
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
};

export const AppSidebar: FC<{ onItemClick?: () => void; className?: string }> = ({
  onItemClick,
  className = '',
}) => {
  const { user } = useAuth();
  const { locale, t } = useI18n();
  const groupTitles = GROUP_TITLES[locale] ?? GROUP_TITLES.en;

  return (
    <aside
      className={`flex flex-col w-64 shrink-0 p-4 border-e border-border bg-surface-raised overflow-y-auto ${className}`}
    >
      <div className="flex flex-col gap-5 flex-1">
        {NAV_GROUPS.map((group) => (
          <div key={group.groupKey} className="flex flex-col gap-1">
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted/70">
              {groupTitles?.[group.groupKey] ?? group.defaultTitle}
            </span>
            <div className="flex flex-col gap-0.5 mt-1">
              {group.links.map((link) => (
                <SidebarItem key={link.to} item={link} onItemClick={onItemClick} />
              ))}
            </div>
          </div>
        ))}

        {user?.role === 'admin' && (
          <div className="flex flex-col gap-1">
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-amber-500">
              Admin
            </span>
            <NavLink
              to="/admin"
              onClick={onItemClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                    : 'text-text-muted hover:text-text hover:bg-surface'
                }`
              }
            >
              <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500" />
              <span className="truncate">{t.nav.admin}</span>
            </NavLink>
          </div>
        )}
      </div>

      <SidebarUserFooter onItemClick={onItemClick} />
    </aside>
  );
};
