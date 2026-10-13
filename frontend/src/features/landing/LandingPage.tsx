import { ArrowRight, Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { FeaturesGrid } from './FeaturesGrid';
import { Button } from '../../components/ui';
import { useI18n } from '../../i18n/i18n.context';
import { useAuth } from '../auth/auth.context';

export const LandingPage: FC = () => {
  const { user } = useAuth();
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center text-center py-12 sm:py-20">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary mb-6">
        <Sparkles className="h-3.5 w-3.5" />
        <span>{t.hero.badge}</span>
      </div>

      <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl text-text">
        {t.hero.titlePre}
        <span className="text-primary underline decoration-primary/30">
          {t.hero.titleHighlight}
        </span>.
      </h1>

      <p className="mt-6 max-w-2xl text-base sm:text-lg text-text-muted">
        {t.hero.subtitle}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {user ? (
          <Link to="/dashboard">
            <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
              {t.nav.dashboard}
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/register">
              <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                {t.hero.ctaPrimary}
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg">
                {t.nav.signIn}
              </Button>
            </Link>
          </>
        )}
      </div>

      <FeaturesGrid />
    </div>
  );
};
