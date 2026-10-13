import {
  BookOpen,
  Briefcase,
  Code2,
  FolderGit2,
  Languages,
  LayoutDashboard,
  Link2,
  Settings,
  User,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavLinkItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export interface NavGroup {
  groupKey: 'overview' | 'career' | 'account';
  defaultTitle: string;
  links: readonly NavLinkItem[];
}

export const NAV_GROUPS: readonly NavGroup[] = [
  {
    groupKey: 'overview',
    defaultTitle: 'Overview',
    links: [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/share', label: 'Share Links', icon: Link2 },
    ],
  },
  {
    groupKey: 'career',
    defaultTitle: 'Career Profile',
    links: [
      { to: '/profile', label: 'Profile', icon: User },
      { to: '/education', label: 'Education', icon: BookOpen },
      { to: '/experiences', label: 'Experiences', icon: Briefcase },
      { to: '/projects', label: 'Projects', icon: FolderGit2 },
      { to: '/skills', label: 'Skills', icon: Code2 },
      { to: '/languages', label: 'Languages', icon: Languages },
    ],
  },
  {
    groupKey: 'account',
    defaultTitle: 'Account',
    links: [{ to: '/settings', label: 'Settings', icon: Settings }],
  },
] as const;

export const NAV_LINKS = NAV_GROUPS.flatMap((group) => group.links);
