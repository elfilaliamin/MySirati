import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { FeaturesGrid } from './FeaturesGrid';
import { Button } from '../../components/ui';
import { useI18n } from '../../i18n/i18n.context';
import { useAuth } from '../auth/auth.context';

interface HeroActionsProps {
  user: { role?: string } | null;
  t: ReturnType<typeof useI18n>['t'];
}

const LandingHeroActions: FC<HeroActionsProps> = ({ user, t }) => (
  <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
    {user ? (
      <>
        <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto group" rightIcon={<ArrowRight className="h-5 w-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />}>
            {user.role === 'admin' ? 'Administration Portal' : t.nav.dashboard}
          </Button>
        </Link>
        <a href="/docs/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            <BookOpen className="h-5 w-5 me-2 text-primary" />
            {t.nav.docs}
          </Button>
        </a>
      </>
    ) : (
      <>
        <Link to="/register" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto group shadow-glow-primary" rightIcon={<ArrowRight className="h-5 w-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />}>
            {t.hero.ctaPrimary}
          </Button>
        </Link>
        <Link to="/login" className="w-full sm:w-auto">
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            {t.nav.signIn}
          </Button>
        </Link>
        <a href="/docs/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto">
            <BookOpen className="h-5 w-5 me-2 text-primary" />
            {t.nav.docs}
          </Button>
        </a>
      </>
    )}
  </div>
);

export const LandingPage: FC = () => {
  const { user } = useAuth();
  const { t } = useI18n();

  return (
    <div className="relative flex flex-col items-center text-center py-12 sm:py-20 md:py-24">
      {/* Subtle Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-96 w-full max-w-4xl bg-primary/10 blur-3xl rounded-full -z-10"
        aria-hidden="true"
      />

      <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft/80 px-4 py-1.5 text-xs font-semibold text-primary mb-6 shadow-subtle select-none">
        <Sparkles className="h-3.5 w-3.5" />
        <span>{t.hero.badge}</span>
      </div>

      <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text leading-[1.15] sm:leading-[1.12]">
        {t.hero.titlePre}{' '}
        <span className="text-primary underline decoration-primary/30 decoration-wavy underline-offset-4">
          {t.hero.titleHighlight}
        </span>
        .
      </h1>

      <p className="mt-5 sm:mt-6 max-w-2xl text-sm sm:text-lg text-text-muted leading-relaxed">
        {t.hero.subtitle}
      </p>

      <LandingHeroActions user={user} t={t} />

      <FeaturesGrid />
    </div>
  );
};
