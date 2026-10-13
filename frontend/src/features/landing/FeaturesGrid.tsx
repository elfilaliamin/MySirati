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
  <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
    {FEATURES.map((feat) => {
      const Icon = feat.icon;
      return (
        <Card key={feat.title} className="hover:border-primary/40 transition-colors">
          <CardHeader>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">{feat.title}</CardTitle>
            <CardDescription>{feat.desc}</CardDescription>
          </CardHeader>
        </Card>
      );
    })}
  </div>
);
