import { Sparkles } from 'lucide-react';
import type { FC, FormEvent } from 'react';

import { BuilderOptions } from './BuilderOptions';
import { BuilderSectionPickers } from './BuilderSectionPickers';
import { Button, Card, CardHeader, CardTitle, Input } from '../../../components/ui';
import type { useBuilderState } from '../useBuilderState';

interface BuilderFormProps {
  state: ReturnType<typeof useBuilderState>;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  isEditing: boolean;
}

export const BuilderForm: FC<BuilderFormProps> = ({ state, onSubmit, isLoading, isEditing }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Link Configuration</span>
        </CardTitle>
      </CardHeader>
      <Input
        label="Link Name"
        required
        placeholder="e.g. Claude Cloud Architect Opportunity"
        value={state.name}
        onChange={(e) => state.setName(e.target.value)}
      />
      <label className="flex items-center gap-2.5 text-xs font-semibold text-text cursor-pointer">
        <input
          type="checkbox"
          checked={Boolean(state.include.basics)}
          onChange={(e) => state.updateInclude({ basics: e.target.checked })}
          className="rounded border-border text-primary focus:ring-primary"
        />
        <span>Basics (Name, Headline, Summary, Location, Profiles)</span>
      </label>
      <BuilderSectionPickers
        include={state.include}
        onChange={(patch) => state.updateInclude(patch)}
      />
      <BuilderOptions
        includeEmail={Boolean(state.include.email)}
        onToggleEmail={(v) => state.updateInclude({ email: v })}
        includePhone={Boolean(state.include.phone)}
        onTogglePhone={(v) => state.updateInclude({ phone: v })}
        includeItemLinks={Boolean(state.include.itemLinks)}
        onToggleItemLinks={(v) => state.updateInclude({ itemLinks: v })}
        expiry={state.expiry}
        onChangeExpiry={state.setExpiry}
      />
      <div className="flex justify-end gap-3 pt-3 border-t border-border">
        <Button type="submit" isLoading={isLoading}>
          {isEditing ? 'Save Changes' : 'Generate Secret Share Link'}
        </Button>
      </div>
    </Card>
  </form>
);
