import { BookOpen, Briefcase, Code2, FolderGit2, Languages } from 'lucide-react';
import type { FC } from 'react';

import { StatCard } from './StatCard';

interface StatsGridProps {
  expCount: number;
  eduCount: number;
  projCount: number;
  skillCount: number;
  langCount: number;
}

export const StatsGrid: FC<StatsGridProps> = ({
  expCount,
  eduCount,
  projCount,
  skillCount,
  langCount,
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
    <StatCard label="Experiences" count={expCount} icon={<Briefcase className="h-5 w-5" />} to="/experiences" />
    <StatCard label="Education" count={eduCount} icon={<BookOpen className="h-5 w-5" />} to="/education" />
    <StatCard label="Projects" count={projCount} icon={<FolderGit2 className="h-5 w-5" />} to="/projects" />
    <StatCard label="Skills" count={skillCount} icon={<Code2 className="h-5 w-5" />} to="/skills" />
    <StatCard label="Languages" count={langCount} icon={<Languages className="h-5 w-5" />} to="/languages" />
  </div>
);
