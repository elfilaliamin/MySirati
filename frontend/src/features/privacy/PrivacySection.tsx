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
  <section className="space-y-2 p-4 rounded-xl border border-border bg-surface-muted/30">
    <h3 className="font-semibold text-text text-sm flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary-soft text-primary text-xs font-bold">
        {index}
      </span>
      <span>{title}</span>
    </h3>
    <p className="text-xs text-text-muted leading-relaxed">{description}</p>
    {highlights && highlights.length > 0 && (
      <ul className="list-disc list-inside text-xs text-text-muted space-y-1 pl-1">
        {highlights.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    )}
  </section>
);
