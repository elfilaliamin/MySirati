import { ArrowLeft, ShieldCheck } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { PrivacySection } from './PrivacySection';
import { Button, Card, CardDescription, CardHeader, CardTitle } from '../../components/ui';

const POLICY_SECTIONS = [
  {
    title: 'Data Ownership & Granular Control (DEC-006)',
    description:
      'You retain full intellectual and personal ownership of all career data entered into MySirati. When creating share links, you can cherry-pick specific roles, projects, or credentials so only intended items are exposed.',
    highlights: [
      'Export your full profile and section data as JSON at any time.',
      'Control whether contact details (email, phone) or external repository links are included.',
    ],
  },
  {
    title: 'Cryptographic Security & Secret Keys (DEC-002)',
    description:
      'Share links utilize 256-bit cryptographically random tokens. We store only SHA-256 hashes of secret keys in our database.',
    highlights: [
      'Plaintext secret keys are shown exactly once upon creation.',
      'Even in the event of an unauthorized database compromise, raw secret keys cannot be recovered.',
    ],
  },
  {
    title: 'Administrative Oversight & Immutable Audit Trails (DEC-001, TASK-801)',
    description:
      'Platform administrators have read-only inspection access strictly for moderation, compliance, and user assistance. Administrators cannot view passwords or plaintext share keys.',
    highlights: [
      'Every administrative user inspection writes an immutable event to our append-only audit trail.',
      'Audit log events record administrator ID, client IP address, timestamp, and target details.',
    ],
  },
  {
    title: 'Data Retention & Right to Be Forgotten (TASK-306)',
    description:
      'Your career records are retained only for as long as your account is active. We enforce permanent, cascading deletion upon request.',
    highlights: [
      'Permanently delete your account from Account Settings with password verification.',
      'Deletion cascades instantly across all profiles, education, experiences, projects, skills, languages, and share links.',
    ],
  },
  {
    title: 'AI Ingestion Privacy & Cache Governance (TASK-604)',
    description:
      'Public AI endpoints serve read-only canonical JSON Resumes with Cache-Control: no-store and security headers to prevent unintended caching.',
    highlights: [
      'Endpoints include instruction preambles directing AI models to treat resumes strictly as reference context.',
      'Revoked, expired, or regenerated keys immediately return uniform 404 responses.',
    ],
  },
] as const;

export const PrivacyPage: FC = () => (
  <div className="max-w-4xl mx-auto py-6 space-y-4">
    <Link to="/">
      <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
        Back to Home
      </Button>
    </Link>
    <Card className="space-y-6 p-6">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl">Privacy Policy & Moderation Disclosure</CardTitle>
            <CardDescription className="text-xs">
              How MySirati protects, governs, and safeguards your career credentials
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <div className="space-y-3">
        {POLICY_SECTIONS.map((section, idx) => (
          <PrivacySection key={section.title} index={idx + 1} {...section} />
        ))}
      </div>
    </Card>
  </div>
);
