import { describe, expect, it } from 'vitest';
import { buildRouteSafetyViewModel } from './index';

describe('route safety view model', () => {
  it('builds labeled hazards and deduplicated caution notes', () => {
    const model = buildRouteSafetyViewModel({
      riskLevel: 'caution',
      hazards: ['low_head_dam', 'strainers'],
      safetyNotes: [
        'This route has hazards or access considerations that require extra verification.',
        ' Scout the takeout. ',
        'Scout the takeout.',
      ],
      reviewStatus: 'reviewed',
    });

    expect(model).toMatchObject({
      riskLevel: 'caution',
      tone: 'caution',
      title: 'Caution',
      reviewStatus: 'reviewed',
      hazards: [
        { key: 'low_head_dam', label: 'Low-head dam' },
        { key: 'strainers', label: 'Strainers' },
      ],
      notes: [' Scout the takeout. '],
    });
  });

  it('supports platform-specific standard copy without changing risk policy', () => {
    const model = buildRouteSafetyViewModel(undefined, {
      standardTitle: 'Before you launch',
      standardSummary: 'Confirm access and takeouts before launching.',
    });

    expect(model).toMatchObject({
      riskLevel: 'standard',
      title: 'Before you launch',
      summary: 'Confirm access and takeouts before launching.',
      hazards: [],
      notes: [],
      reviewStatus: 'needs_review',
    });
  });
});
