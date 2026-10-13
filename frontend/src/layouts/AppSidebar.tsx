import { LogOut, ShieldAlert, Sparkles, X } from 'lucide-react';
import type { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { NAV_GROUPS } from '../constants/nav.constants';
import type { NavLinkItem } from '../constants/nav.constants';
import { useAuth } from '../features/auth/auth.context';
import { useProfile } from '../features/profile/useProfile';
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

const SidebarBrand: FC<{ onItemClick?: () => void }> = ({ onItemClick }) => (
  <div className="flex items-center justify-between px-2 pb-5 pt-1">
    <Link to="/dashboard" onClick={onItemClick} className="flex items-center gap-2.5 font-bold text-text">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-extrabold tracking-tight text-text leading-none">
          MySirati
        </span>
        <span className="mt-1 inline-block w-fit rounded bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-amber-600 dark:text-amber-400 uppercase leading-none">
          AI Resume
        </span>
      </div>
    </Link>
    {onItemClick && (
      <button
        type="button"
        onClick={onItemClick}
        className="rounded-xl p-2 text-text-muted hover:bg-surface hover:text-text lg:hidden"
        aria-label="Close menu"
      >
        <X className="h-5 w-5" />
      </button>
    )}
  </div>
);

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
        `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
          isActive
            ? 'bg-primary text-white font-semibold shadow-sm shadow-primary/20'
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
  const { profile } = useProfile();
  const { t } = useI18n();
  if (!user) return null;

  const displayName = profile?.fullName || user.email.split('@')[0] || 'User';
  const displayRole = profile?.headline || (user.role === 'admin' ? 'Administrator' : 'Career Profile');
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="pt-3 mt-auto border-t border-border flex flex-col gap-2">
      <div className="flex items-center gap-3 p-2 rounded-2xl bg-surface border border-border">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs border border-primary/20">
          <span>{initials}</span>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-surface-raised" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-semibold text-text truncate">{displayName}</span>
          <span className="text-[10px] text-text-muted truncate">{displayRole}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          onItemClick?.();
          void logout();
        }}
        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-danger/80 hover:text-danger hover:bg-danger/10 rounded-xl transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span>{t.nav.signOut}</span>
      </button>
    </div>
  );
};

export const AppSidebar: FC<{ onItemClick?: () => void; className?: string }> = ({
  onItemClick,
  className = '',
}) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const allLinks = NAV_GROUPS.flatMap((group) => group.links);

  return (
    <aside
      className={`flex flex-col w-64 shrink-0 p-4 border-e border-border bg-surface-raised overflow-y-auto ${className}`}
    >
      <SidebarBrand onItemClick={onItemClick} />

      <div className="flex flex-col gap-1 flex-1 py-1">
        {allLinks.map((link) => (
          <SidebarItem key={link.to} item={link} onItemClick={onItemClick} />
        ))}

        {user?.role === 'admin' && (
          <NavLink
            to="/admin"
            onClick={onItemClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber-500 text-white font-semibold shadow-sm'
                  : 'text-text-muted hover:text-text hover:bg-surface'
              }`
            }
          >
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span className="truncate">{t.nav.admin}</span>
          </NavLink>
        )}
      </div>

      <SidebarUserFooter onItemClick={onItemClick} />
    </aside>
  );
};
