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

export const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/education', label: 'Education', icon: BookOpen },
  { to: '/experiences', label: 'Experiences', icon: Briefcase },
  { to: '/projects', label: 'Projects', icon: FolderGit2 },
  { to: '/skills', label: 'Skills', icon: Code2 },
  { to: '/languages', label: 'Languages', icon: Languages },
  { to: '/share', label: 'Share Links', icon: Link2 },
  { to: '/settings', label: 'Settings', icon: Settings },
];
