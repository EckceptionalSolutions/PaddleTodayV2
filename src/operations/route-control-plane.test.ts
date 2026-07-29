import { describe, expect, it } from 'vitest';
import {
  buildWorkOrder,
  selectState,
  validateCompletion,
  type Claim,
  type CompletionReport,
  type ControlState,
  type Defaults,
  type LeadInbox,
  type ProfilesFile,
} from '../../scripts/route-control-plane';

const defaults: Defaults = {
  maxConsecutiveClaims: 1,
  minimumSourceFamilies: 3,
  minimumDiscoveryTouches: 6,
  maximumStaleCandidateRechecks: 2,
  claimLeaseMinutes: 180,
  difficultStateReservationEvery: 3,
  historyWindow: 12,
};

const profiles: ProfilesFile = {
  version: 1,
  defaults,
  states: [
    {
      state: 'Easy A',
      code: 'EA',
      enabled: true,
      weight: 1,
      difficulty: 'standard',
      playbookPath: 'a.md',
      primarySourceFamilies: ['A1', 'A2', 'A3'],
      fallbackSourceFamilies: ['AF'],
      mandatoryChecks: ['A check'],
    },
    {
      state: 'Easy B',
      code: 'EB',
      enabled: true,
      weight: 1,
      difficulty: 'standard',
      playbookPath: 'b.md',
      primarySourceFamilies: ['B1', 'B2', 'B3'],
      fallbackSourceFamilies: ['BF'],
      mandatoryChecks: ['B check'],
    },
    {
      state: 'Hard C',
      code: 'HC',
      enabled: true,
      weight: 1,
      difficulty: 'difficult',
      playbookPath: 'c.md',
      primarySourceFamilies: ['C1', 'C2', 'C3'],
      fallbackSourceFamilies: ['CF'],
      mandatoryChecks: ['C check'],
      sourceRecoveryTactics: ['Use the GIS export.'],
    },
  ],
};

const inbox: LeadInbox = {
  generatedAt: '2026-07-29T12:00:00.000Z',
  summary: { discoverySearchBriefs: [] },
  leads: [
    {
      candidateId: 'easy-a-ready',
      lane: 'implementation_ready',
      priority: 100,
      state: 'Easy A',
      river: 'Easy River',
      route: 'One to Two',
      currentStatus: 'likely_addable',
      blocker: null,
      retryCondition: null,
      recommendedNextStep: 'Implement.',
    },
  ],
};

function claim(id: string, state: string, stateCode: string, claimedAt: string, outcome: Claim['outcome']): Claim {
  return {
    id,
    state,
    stateCode,
    mode: 'research',
    claimedAt,
    leaseExpiresAt: '2026-07-29T11:00:00.000Z',
    status: 'completed',
    candidateIds: [],
    outcome,
  };
}

describe('route control-plane scheduling', () => {
  it('reserves every third claim for a difficult state even when an easy state has a ready route', () => {
    const state: ControlState = {
      version: 1,
      updatedAt: null,
      claims: [
        claim('one', 'Easy A', 'EA', '2026-07-29T08:00:00.000Z', 'progress'),
        claim('two', 'Easy B', 'EB', '2026-07-29T09:00:00.000Z', 'progress'),
      ],
    };

    const selected = selectState(profiles, inbox, state, new Date('2026-07-29T12:00:00.000Z'));

    expect(selected.profile.state).toBe('Hard C');
    expect(selected.reasons).toContain('A difficult-state reservation is due every 3 claims.');
  });

  it('does not select the same state for consecutive claims', () => {
    const state: ControlState = {
      version: 1,
      updatedAt: null,
      claims: [claim('one', 'Easy A', 'EA', '2026-07-29T10:00:00.000Z', 'implemented')],
    };

    const selected = selectState(profiles, inbox, state, new Date('2026-07-29T12:00:00.000Z'));

    expect(selected.profile.state).not.toBe('Easy A');
  });

  it('matches ledger leads that use postal state codes', () => {
    const codeInbox: LeadInbox = {
      generatedAt: inbox.generatedAt,
      summary: { discoverySearchBriefs: [] },
      leads: [{ ...inbox.leads[0], state: 'EA' }],
    };
    const singleStateProfiles: ProfilesFile = { ...profiles, states: [profiles.states[0]] };
    const state: ControlState = { version: 1, updatedAt: null, claims: [] };

    const selected = selectState(singleStateProfiles, codeInbox, state, new Date('2026-07-29T12:00:00.000Z'));

    expect(selected.leads).toHaveLength(1);
    expect(selected.leads[0].candidateId).toBe('easy-a-ready');
  });

  it('turns a prior source-access failure into an explicit recovery work order', () => {
    const state: ControlState = {
      version: 1,
      updatedAt: null,
      claims: [claim('one', 'Hard C', 'HC', '2026-07-20T10:00:00.000Z', 'blocked_source_access')],
    };
    const selected = {
      profile: profiles.states[2],
      score: 10,
      recentClaims: 1,
      daysSinceClaim: 9,
      leads: [],
      reasons: ['Recovery is due.'],
    };

    const order = buildWorkOrder(selected, profiles, state, new Date('2026-07-29T12:00:00.000Z'));

    expect(order.specialization.sourceRecoveryTactics[0]).toMatch(/Do not repeat the same URL/);
    expect(order.specialization.sourceRecoveryTactics).toContain('Use the GIS export.');
  });

  it('can explicitly create a research order even when a route is implementation-ready', () => {
    const state: ControlState = { version: 1, updatedAt: null, claims: [] };
    const selected = selectState(profiles, inbox, state, new Date('2026-07-29T12:00:00.000Z'), 'research');
    const order = buildWorkOrder(
      selected,
      profiles,
      state,
      new Date('2026-07-29T12:00:00.000Z'),
      'research',
    );

    expect(order.mode).toBe('research');
  });

  it('rejects implementation when no route is ready', () => {
    const state: ControlState = { version: 1, updatedAt: null, claims: [] };
    const emptyInbox: LeadInbox = { ...inbox, leads: [] };

    expect(() =>
      selectState(profiles, emptyInbox, state, new Date('2026-07-29T12:00:00.000Z'), 'implementation'),
    ).toThrow(/No route is implementation-ready/);
  });
});

describe('route control-plane completion contract', () => {
  const activeClaim: Claim = {
    id: 'hc-20260729120000',
    state: 'Hard C',
    stateCode: 'HC',
    mode: 'research',
    claimedAt: '2026-07-29T12:00:00.000Z',
    leaseExpiresAt: '2026-07-29T15:00:00.000Z',
    status: 'claimed',
    candidateIds: [],
  };

  it('rejects giving up after only one source family', () => {
    const report: CompletionReport = {
      version: 1,
      workOrderId: activeClaim.id,
      outcome: 'no_change',
      candidateIds: [],
      sourceAttempts: [{ family: 'Agency website', method: 'page', result: 'Timed out.' }],
      factsChanged: [],
      blocker: 'The page timed out.',
      retryCondition: 'Retry when the page is available.',
      notes: 'No change.',
    };

    expect(() => validateCompletion(report, activeClaim, defaults)).toThrow(/3 distinct source families/);
  });

  it('requires multiple retrieval methods for a source-access blocker', () => {
    const report: CompletionReport = {
      version: 1,
      workOrderId: activeClaim.id,
      outcome: 'blocked_source_access',
      candidateIds: [],
      sourceAttempts: [
        { family: 'Agency website', method: 'page', result: 'Timed out.' },
        { family: 'County website', method: 'page', result: 'Timed out.' },
        { family: 'USGS', method: 'page', result: 'Available, but insufficient.' },
        { family: 'Agency website', method: 'page', result: 'A second official page also timed out.' },
        { family: 'County website', method: 'page', result: 'The access map did not establish the endpoint.' },
        { family: 'USGS', method: 'page', result: 'The monitoring page did not establish access.' },
      ],
      factsChanged: [],
      blocker: 'The required agency access source is unavailable.',
      retryCondition: 'Retry through its GIS export or PDF archive.',
      notes: 'Alternate families did not establish endpoint legitimacy.',
    };

    expect(() => validateCompletion(report, activeClaim, defaults)).toThrow(/two distinct retrieval methods/);
  });

  it('enforces the minimum number of bounded discovery touches', () => {
    const report: CompletionReport = {
      version: 1,
      workOrderId: activeClaim.id,
      outcome: 'progress',
      candidateIds: [],
      sourceAttempts: [
        { family: 'Agency', method: 'page', result: 'Found endpoints.' },
        { family: 'County', method: 'PDF', result: 'Confirmed access.' },
        { family: 'USGS', method: 'API', result: 'Confirmed gauge.' },
      ],
      factsChanged: ['Endpoints and gauge confirmed.'],
      blocker: null,
      retryCondition: null,
      notes: 'Material progress.',
    };

    expect(() => validateCompletion(report, activeClaim, defaults)).toThrow(/6 bounded source attempts/);
  });
});
