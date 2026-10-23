import type { FC } from 'react';

export interface PrivacySectionProps {
  index: number;
  title: string;
  description: string;
  highlights?: readonly string[];
}

export const PrivacySection: FC<PrivacySectionProps> = ({
  index,
  title,
  description,
  highlights,
}) => (
  <section className="space-y-2.5 p-4 sm:p-5 rounded-xl border border-border/80 bg-surface/40 shadow-subtle hover:border-primary/30 transition-colors">
    <h3 className="font-bold text-text text-sm sm:text-base flex items-center gap-2.5 tracking-tight">
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary-soft text-primary text-xs font-bold shrink-0">
        {index}
      </span>
      <span>{title}</span>
    </h3>
    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{description}</p>
    {highlights && highlights.length > 0 && (
      <ul className="list-disc list-inside text-xs sm:text-sm text-text-muted space-y-1.5 ps-1">
        {highlights.map((point) => (
          <li key={point} className="leading-relaxed">{point}</li>
        ))}
      </ul>
    )}
  </section>
);
