import { Link2 } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { computeCompleteness } from './completeness.util';
import { DashboardCta } from './DashboardCta';
import { DashboardSkeleton } from './DashboardSkeleton';
import { ProfileCompletenessCard } from './ProfileCompletenessCard';
import { StatsGrid } from './StatsGrid';
import { Button } from '../../components/ui';
import { useProfile } from '../profile/useProfile';
import { useSection } from '../sections/useSections';

const DashboardHeader: FC<{ fullName?: string }> = ({ fullName }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
        Welcome, {fullName || 'User'}
      </h1>
      <p className="text-xs sm:text-sm text-text-muted mt-1">
        Curate your career sections and generate AI-ready JSON Resume share links.
      </p>
    </div>
    <Link to="/share">
      <Button leftIcon={<Link2 className="h-4 w-4" />}>Manage Share Links</Button>
    </Link>
  </div>
);

export const DashboardPage: FC = () => {
  const { profile, isLoading: isProfileLoading } = useProfile();
  const exp = useSection('experiences');
  const edu = useSection('education');
  const proj = useSection('projects');
  const skill = useSection('skills');
  const lang = useSection('languages');

  const isLoading =
    isProfileLoading ||
    exp.isLoading ||
    edu.isLoading ||
    proj.isLoading ||
    skill.isLoading ||
    lang.isLoading;

  const { score, checklist } = computeCompleteness(profile, {
    exp: exp.items.length,
    edu: edu.items.length,
    proj: proj.items.length,
    skill: skill.items.length,
    lang: lang.items.length,
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <DashboardHeader fullName={profile?.fullName} />

      <StatsGrid
        expCount={exp.items.length}
        eduCount={edu.items.length}
        projCount={proj.items.length}
        skillCount={skill.items.length}
        langCount={lang.items.length}
      />

      <ProfileCompletenessCard score={score} items={checklist} />
      <DashboardCta />
    </div>
  );
};
