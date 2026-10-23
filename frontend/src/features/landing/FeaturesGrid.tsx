import { Bot, Cpu, Lock, ShieldCheck } from 'lucide-react';
import type { FC } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui';

const FEATURES = [
  {
    icon: Bot,
    title: 'AI-Ready Read-Only Links',
    desc: 'Share JSON Resume feeds formatted directly for ChatGPT, Claude, and Gemini with zero execution prompt injections.',
  },
  {
    icon: ShieldCheck,
    title: 'Granular Privacy Control',
    desc: 'Cherry-pick which specific experiences and projects to share per link, hiding contact details with ease.',
  },
  {
    icon: Lock,
    title: '256-Bit Cryptographic Security',
    desc: 'Secret keys are hashed via SHA-256 and never stored plaintext. Instant revocation whenever you need it.',
  },
  {
    icon: Cpu,
    title: 'Structured Resume API',
    desc: 'Standardized JSON Resume schema with embedded security preambles and verified resource links.',
  },
];

export const FeaturesGrid: FC = () => (
  <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full text-start">
    {FEATURES.map((feat) => {
      const Icon = feat.icon;
      return (
        <Card
          key={feat.title}
          className="group hover:border-primary/40 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200"
        >
          <CardHeader>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary group-hover:scale-105 group-hover:shadow-glow-primary transition-all duration-200">
              <Icon className="h-6 w-6" />
            </div>
            <CardTitle className="text-base font-bold">{feat.title}</CardTitle>
            <CardDescription>{feat.desc}</CardDescription>
          </CardHeader>
        </Card>
      );
    })}
  </div>
);
