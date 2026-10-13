import { Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { NavItems } from './NavItems';

export const HeaderBrand: FC = () => (
  <div className="flex items-center gap-6">
    <Link to="/dashboard" className="flex items-center gap-2.5 font-bold text-text">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
        <Sparkles className="h-5 w-5" />
      </div>
      <span className="text-base tracking-tight">MySirati</span>
    </Link>
    <nav className="hidden lg:flex items-center gap-1">
      <NavItems />
    </nav>
  </div>
);
