import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { rivers } from '../src/data/rivers';

type CandidateStatus =
  | 'likely_addable'
  | 'needs_manual_coordinates'
  | 'threshold_weak'
  | 'no_live_gauge'
  | 'gauge_proxy_weak'
  | 'research_later'
  | 'blocked_until_date'
  | 'duplicate_corridor'
  | 'rejected'
  | 'added'
  | 'implemented'
  | string;

interface LedgerCandidate {
  candidateId: string;
  river?: string;
  route?: string;
  state?: string;
  status: CandidateStatus;
  lastReviewed?: string | null;
  reviewCount?: number | null;
  blocker?: string | null;
  retryCondition?: string | null;
  retryDate?: string | null;
  sourcesChecked?: string[];
  aliases?: string[];
  v2Slug?: string | null;
  gauge?: {
    quality?: string;
    id?: string;
    provider?: string;
    notes?: string;
  };
  thresholdSupport?: {
    strength?: string;
    notes?: string;
  };
  endpoints?: {
    putIn?: string;
    takeOut?: string;
    coordinatesPresent?: boolean;
    putInCoordinates?: string;
    takeOutCoordinates?: string;
    coordinateSource?: string;
  };
  camping?: {
    category?: string;
    source?: string;
    notes?: string;
    overnightFriendly?: boolean;
    caveats?: string[];
  };
  notes?: string | null;
  updatedAt?: string | null;
}

interface Ledger {
  version: number;
  updatedAt?: string;
  candidates: LedgerCandidate[];
}

type LeadLane =
  | 'implementation_ready'
  | 'coordinate_cleanup'
  | 'access_legitimacy'
  | 'threshold_discovery'
  | 'live_provider_recheck'
  | 'fresh_source_discovery'
  | 'blocked_recheck';

interface Lead {
  candidateId: string;
  lane: LeadLane;
  priority: number;
  state: string;
  river: string;
  route: string;
  currentStatus: CandidateStatus;
  lastReviewed: string | null;
  reviewCount: number;
  duplicateRisk: boolean;
  blocker: string | null;
  retryCondition: string | null;
  gauge: LedgerCandidate['gauge'];
  thresholdSupport: LedgerCandidate['thresholdSupport'];
  endpoints: LedgerCandidate['endpoints'];
  camping: LedgerCandidate['camping'];
  recommendedNextStep: string;
  discoveryTier: string | null;
}

interface LeadInbox {
  version: 1;
  generatedAt: string;
  sourceLedger: string;
  summary: {
    totalLedgerCandidates: number;
    currentRouteCount: number;
    leadCount: number;
    discoveryFocusStates: string[];
    discoverySearchBriefs: DiscoverySearchBrief[];
    byLane: Record<LeadLane, number>;
    byStatus: Record<string, number>;
  };
  lanes: Record<LeadLane, Lead[]>;
  leads: Lead[];
}

interface DiscoverySearchBrief {
  state: string;
  tier: string;
  sourceFamilies: string[];
  searchQueries: string[];
  ledgerStrategy: string;
}

const ledgerPath = path.join('docs', 'route-candidate-ledger.json');
const inboxJsonPath = path.join('docs', 'route-lead-inbox.json');
const inboxMdPath = path.join('docs', 'route-lead-inbox.md');

const laneOrder: LeadLane[] = [
  'implementation_ready',
  'fresh_source_discovery',
  'threshold_discovery',
  'coordinate_cleanup',
  'access_legitimacy',
  'live_provider_recheck',
  'blocked_recheck',
];

const terminalStatuses = new Set<CandidateStatus>(['added', 'implemented', 'duplicate_corridor', 'rejected']);

const stateCodeToName: Record<string, string> = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

const supportedMidwestStates = new Set([
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Michigan',
  'Minnesota',
  'Missouri',
  'Nebraska',
  'North Dakota',
  'Ohio',
  'South Dakota',
  'Wisconsin',
]);

const adjacentExpansionStates = new Set(['Arkansas', 'Kentucky', 'Pennsylvania', 'Tennessee', 'West Virginia']);

const frontierExpansionStates = new Set([
  'Colorado',
  'North Carolina',
  'Oklahoma',
  'Texas',
  'Virginia',
]);

const sourceFamiliesByState: Record<string, string[]> = {
  Arkansas: ['Arkansas Water Trails', 'Arkansas Game and Fish access pages', 'American Whitewater + USGS gauge clusters'],
  Colorado: ['Colorado Parks and Wildlife water access', 'American Whitewater + USGS gauge clusters', 'USFS/NPS river pages'],
  Illinois: ['IDNR public waters and closures', 'county forest preserve canoe launches', 'American Whitewater + USGS gauge clusters'],
  Indiana: ['Indiana DNR public access', 'regional water-trail groups', 'American Whitewater + USGS gauge clusters'],
  Kentucky: ['Kentucky Water Trails', 'KDFWR access sites', 'American Whitewater + USGS gauge clusters'],
  Nebraska: ['Nebraska Game and Parks access/water-trail pages', 'county/city river-access systems', 'USGS gauge clusters'],
  'North Carolina': ['NC Wildlife public boating access', 'State Parks/USFS river pages', 'American Whitewater + USGS gauge clusters'],
  'North Dakota': ['North Dakota Parks and Recreation', 'USFS/NPS river pages', 'tourism water-trail managers'],
  Ohio: ['Ohio DNR water trails and access sites', 'county park paddling pages', 'USGS gauge clusters'],
  Oklahoma: ['Oklahoma Scenic Rivers Commission', 'Oklahoma Wildlife access pages', 'USGS gauge clusters'],
  Pennsylvania: ['DCNR river trails', 'PFBC access sites', 'American Whitewater + USGS gauge clusters'],
  'South Dakota': ['South Dakota Game, Fish and Parks water trails', 'NPS/USFS river pages', 'USGS gauge clusters'],
  Tennessee: ['TDEC/BluewaysTN', 'TWRA access sites', 'American Whitewater + USGS gauge clusters'],
  Texas: ['Texas Paddling Trails', 'TPWD river access and flow pages', 'USGS gauge clusters'],
  Virginia: ['Virginia Scenic Rivers and DWR access', 'county/city blueways', 'American Whitewater + USGS gauge clusters'],
  'West Virginia': ['WV DNR river access', 'NPS/USFS river pages', 'American Whitewater + USGS gauge clusters'],
};

const defaultSourceFamilies = ['official water-trail pages', 'public access datasets', 'USGS gauge clusters'];

function searchBriefForState(state: string, liveRouteCountByState: Record<string, number>): DiscoverySearchBrief {
  const tier = discoveryTierForState(state, liveRouteCountByState) ?? 'frontier_expansion';
  const sourceFamilies = sourceFamiliesByState[state] ?? defaultSourceFamilies;
  const queryState = state.includes(' ') ? `"${state}"` : state;

  return {
    state,
    tier,
    sourceFamilies,
    searchQueries: [
      `${queryState} official water trail canoe kayak USGS gauge public access`,
      `${queryState} state parks canoe kayak river access USGS flow`,
      `${queryState} American Whitewater USGS public access route`,
    ],
    ledgerStrategy:
      'Seed 2-4 fresh candidates only when a source trail includes public endpoints, a plausible supported live gauge, and numeric threshold evidence or a credible path to it.',
  };
}

function discoverySearchBriefs(liveRouteCountByState: Record<string, number>) {
  return discoveryFocusStates(liveRouteCountByState)
    .map((state) => searchBriefForState(state, liveRouteCountByState));
}


function textFor(candidate: LedgerCandidate) {
  return [
    candidate.blocker,
    candidate.retryCondition,
    candidate.notes,
    candidate.gauge?.quality,
    candidate.gauge?.provider,
    candidate.gauge?.notes,
    candidate.thresholdSupport?.strength,
    candidate.thresholdSupport?.notes,
    candidate.endpoints?.coordinateSource,
    candidate.camping?.category,
    candidate.camping?.source,
    candidate.camping?.notes,
    ...(candidate.camping?.caveats ?? []),
    ...(candidate.sourcesChecked ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function compact(value: string | null | undefined, maxLength = 420) {
  if (!value) {
    return null;
  }
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }
  return `${normalized.slice(0, maxLength - 1).trim()}...`;
}

function slugish(value: string | undefined) {
  return (value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function routeIdentity(candidate: LedgerCandidate) {
  return `${slugish(candidate.river)}-${slugish(candidate.route)}`;
}

function canonicalStateName(state: string | null | undefined) {
  if (!state) {
    return null;
  }
  const trimmed = state.trim();
  if (!trimmed) {
    return null;
  }
  const upper = trimmed.toUpperCase();
  return stateCodeToName[upper] ?? trimmed;
}

function buildLiveRouteCountByState() {
  const counts: Record<string, number> = {};
  for (const river of rivers) {
    const state = canonicalStateName(river.state);
    if (!state) {
      continue;
    }
    counts[state] = (counts[state] ?? 0) + 1;
  }
  return counts;
}

function discoveryTierForState(state: string | null | undefined, liveRouteCountByState: Record<string, number>) {
  const canonical = canonicalStateName(state);
  if (!canonical) {
    return null;
  }
  if (supportedMidwestStates.has(canonical)) {
    return (liveRouteCountByState[canonical] ?? 0) <= 5 ? 'undercovered_supported_midwest' : 'supported_midwest';
  }
  if (adjacentExpansionStates.has(canonical)) {
    return 'adjacent_expansion';
  }
  if (frontierExpansionStates.has(canonical)) {
    return 'frontier_expansion';
  }
  return 'other';
}

function discoveryFocusStates(liveRouteCountByState: Record<string, number>) {
  const undercovered = [...supportedMidwestStates]
    .filter((state) => (liveRouteCountByState[state] ?? 0) <= 5)
    .sort((left, right) => (liveRouteCountByState[left] ?? 0) - (liveRouteCountByState[right] ?? 0) || left.localeCompare(right));

  return [...undercovered, ...[...adjacentExpansionStates].sort(), ...[...frontierExpansionStates].sort()];
}

function isPastRetryDate(retryDate: string | null | undefined, now: Date) {
  if (!retryDate) {
    return true;
  }
  const parsed = new Date(retryDate);
  return Number.isNaN(parsed.valueOf()) || parsed <= now;
}

function classifyLane(candidate: LedgerCandidate): LeadLane | null {
  if (candidate.status === 'likely_addable') {
    return 'implementation_ready';
  }

  const haystack = textFor(candidate);

  if (candidate.status === 'needs_manual_coordinates') {
    if (
      haystack.includes('access legitimacy') ||
      haystack.includes('public access') ||
      haystack.includes('manager') ||
      haystack.includes('parking') ||
      haystack.includes('private')
    ) {
      return 'access_legitimacy';
    }
    return 'coordinate_cleanup';
  }

  if (candidate.status === 'threshold_weak') {
    return 'threshold_discovery';
  }

  if (candidate.status === 'no_live_gauge' || candidate.status === 'gauge_proxy_weak') {
    return 'live_provider_recheck';
  }

  if (candidate.status === 'blocked_until_date') {
    return 'blocked_recheck';
  }

  if (candidate.status === 'research_later') {
    return 'fresh_source_discovery';
  }

  return null;
}

function scoreLead(
  candidate: LedgerCandidate,
  lane: LeadLane,
  duplicateRisk: boolean,
  liveRouteCountByState: Record<string, number>,
) {
  const baseByLane: Record<LeadLane, number> = {
    implementation_ready: 100,
    fresh_source_discovery: 90,
    threshold_discovery: 82,
    coordinate_cleanup: 72,
    access_legitimacy: 68,
    live_provider_recheck: 54,
    blocked_recheck: 30,
  };

  const haystack = textFor(candidate);
  let score = baseByLane[lane];
  const lastReviewedAt = candidate.lastReviewed ? new Date(`${candidate.lastReviewed}T00:00:00Z`) : null;
  const daysSinceReviewed =
    lastReviewedAt && !Number.isNaN(lastReviewedAt.valueOf())
      ? Math.floor((Date.now() - lastReviewedAt.valueOf()) / (1000 * 60 * 60 * 24))
      : null;
  const discoveryTier = discoveryTierForState(candidate.state, liveRouteCountByState);

  if (candidate.endpoints?.coordinatesPresent) {
    score += lane === 'coordinate_cleanup' ? 4 : 8;
  }
  if (candidate.gauge?.quality?.includes('direct') || haystack.includes('direct usgs')) {
    score += 8;
  }
  if (haystack.includes('same-day') || haystack.includes('product-style') || haystack.includes('water services iv returned')) {
    score += 6;
  }
  if (haystack.includes('official') || candidate.thresholdSupport?.strength === 'official') {
    score += 6;
  }
  if (haystack.includes('american whitewater') || candidate.thresholdSupport?.strength === 'american_whitewater') {
    score += 4;
  }
  if (haystack.includes('unsupported') || haystack.includes('does not currently support')) {
    score -= 8;
  }
  if (lane === 'fresh_source_discovery' && (daysSinceReviewed === null || daysSinceReviewed >= 14)) {
    score += 10;
  }
  if (lane === 'threshold_discovery' && daysSinceReviewed !== null && daysSinceReviewed >= 10) {
    score += 6;
  }
  if (lane === 'fresh_source_discovery' || lane === 'threshold_discovery') {
    if (discoveryTier === 'undercovered_supported_midwest') {
      score += 12;
    } else if (discoveryTier === 'supported_midwest') {
      score += 7;
    } else if (discoveryTier === 'adjacent_expansion') {
      score += 5;
    } else if (discoveryTier === 'frontier_expansion') {
      score += 4;
    }
  }
  if ((lane === 'coordinate_cleanup' || lane === 'access_legitimacy' || lane === 'live_provider_recheck') && (candidate.reviewCount ?? 0) >= 5) {
    score -= 8;
  }
  if ((lane === 'coordinate_cleanup' || lane === 'access_legitimacy') && (candidate.reviewCount ?? 0) >= 10) {
    score -= 10;
  }
  if (lane === 'fresh_source_discovery' && (candidate.reviewCount ?? 0) >= 8) {
    score -= 12;
  }
  if (duplicateRisk) {
    score -= 20;
  }

  const reviewCount = candidate.reviewCount ?? 0;
  score -= Math.min(reviewCount, 20);

  return Math.max(1, Math.min(100, Math.round(score)));
}

function nextStepFor(candidate: LedgerCandidate, lane: LeadLane, liveRouteCountByState: Record<string, number>) {
  const discoveryTier = discoveryTierForState(candidate.state, liveRouteCountByState);
  switch (lane) {
    case 'implementation_ready':
      return 'Verify the live gauge still fetches, confirm no duplicate route exists, then hand this to the one-route implementation automation.';
    case 'coordinate_cleanup':
      return 'Find source-backed endpoint coordinates from an official access map, public-water-access dataset, park page, or manager map. Do not infer from bridge names or river geometry.';
    case 'access_legitimacy':
      return 'Find a current public-access manager source that confirms launch/take-out legality, parking, and normal private-paddler use.';
    case 'threshold_discovery':
      if (discoveryTier === 'undercovered_supported_midwest' || discoveryTier === 'supported_midwest') {
        return 'Use bounded internet research to find numeric low/ideal/high or minimum runnable guidance tied to the selected gauge, with priority on converting undercovered Midwest support into shippable routes.';
      }
      return 'Use bounded internet research to find numeric low/ideal/high or minimum runnable guidance tied to the selected gauge. Keep the candidate parked unless the gauge relationship is explicit.';
    case 'live_provider_recheck':
      return 'Recheck whether the candidate has a current USGS or MN DNR live path, or record the exact unsupported provider adapter needed.';
    case 'fresh_source_discovery':
      if (discoveryTier === 'undercovered_supported_midwest') {
        return 'Search the internet for a genuinely new official route, access, threshold, or gauge source family in this undercovered supported Midwest state before spending more time on stale blockers elsewhere.';
      }
      if (discoveryTier === 'adjacent_expansion') {
        return 'Use bounded internet research to surface a genuinely new official route, access, threshold, or gauge source family in this adjacent expansion state, then seed or strengthen the ledger candidate.';
      }
      if (discoveryTier === 'frontier_expansion') {
        return 'Use internet discovery in this new frontier state only from strong official, AW, NPS/USFS, or state access/gauge source families; seed several leads if the source trail is richer than the stale Midwest queue.';
      }
      return 'Use bounded internet research to surface a genuinely new official route, access, threshold, or gauge source family before spending more time on this candidate.';
    case 'blocked_recheck':
      return 'Revisit only if the retry condition is satisfied or the retry date has passed with new evidence.';
  }
}

function makeLead(
  candidate: LedgerCandidate,
  lane: LeadLane,
  duplicateRisk: boolean,
  liveRouteCountByState: Record<string, number>,
): Lead {
  return {
    candidateId: candidate.candidateId,
    lane,
    priority: scoreLead(candidate, lane, duplicateRisk, liveRouteCountByState),
    state: candidate.state ?? 'Unknown',
    river: candidate.river ?? 'Unknown river',
    route: candidate.route ?? 'Unknown route',
    currentStatus: candidate.status,
    lastReviewed: candidate.lastReviewed ?? null,
    reviewCount: candidate.reviewCount ?? 0,
    duplicateRisk,
    blocker: compact(candidate.blocker),
    retryCondition: compact(candidate.retryCondition),
    gauge: candidate.gauge,
    thresholdSupport: candidate.thresholdSupport,
    endpoints: candidate.endpoints,
    camping: candidate.camping,
    recommendedNextStep: nextStepFor(candidate, lane, liveRouteCountByState),
    discoveryTier: discoveryTierForState(candidate.state, liveRouteCountByState),
  };
}

function makeMarkdown(inbox: LeadInbox) {
  const lines: string[] = [
    '# Route Lead Inbox',
    '',
    `Generated: ${inbox.generatedAt}`,
    '',
    'This file is generated by `npm run routes:leads:gather`. Do not hand-edit the lead list; update `docs/route-candidate-ledger.json` or the gathering script instead.',
    '',
    '## Summary',
    '',
    `- Ledger candidates reviewed: ${inbox.summary.totalLedgerCandidates}`,
    `- Current live routes: ${inbox.summary.currentRouteCount}`,
    `- Open leads: ${inbox.summary.leadCount}`,
    `- Discovery focus states: ${inbox.summary.discoveryFocusStates.join(', ')}`,
    '',
    '## Internet Discovery Search Briefs',
    '',
    'Use these when `implementation_ready` is empty or the top cleanup/access blockers have already failed recent rechecks. Prefer adding several well-sourced ledger leads over re-reading stale blockers.',
    '',
  ];

  for (const brief of inbox.summary.discoverySearchBriefs) {
    lines.push(`### ${brief.state} (${brief.tier})`);
    lines.push('');
    lines.push(`- Source families: ${brief.sourceFamilies.join('; ')}`);
    lines.push(`- Search queries: ${brief.searchQueries.map((query) => `\`${query}\``).join('; ')}`);
    lines.push(`- Ledger strategy: ${brief.ledgerStrategy}`);
    lines.push('');
  }

  lines.push(
    '| Lane | Count |',
    '| --- | ---: |',
    ...laneOrder.map((lane) => `| ${lane} | ${inbox.summary.byLane[lane]} |`),
    '',
  );

  for (const lane of laneOrder) {
    const leads = inbox.lanes[lane];
    lines.push(`## ${lane.replace(/_/g, ' ')}`, '');

    if (leads.length === 0) {
      lines.push('No current leads.', '');
      continue;
    }

    for (const lead of leads.slice(0, 12)) {
      lines.push(`### ${lead.priority} - ${lead.state} - ${lead.river}: ${lead.route}`);
      lines.push('');
      lines.push(`- Candidate: \`${lead.candidateId}\``);
      lines.push(`- Status: \`${lead.currentStatus}\`, last reviewed ${lead.lastReviewed ?? 'unknown'}, review count ${lead.reviewCount}`);
      if (lead.gauge?.id || lead.gauge?.quality || lead.gauge?.provider) {
        lines.push(`- Gauge: ${[lead.gauge.id, lead.gauge.provider, lead.gauge.quality].filter(Boolean).join(' / ')}`);
      }
      if (lead.thresholdSupport?.strength) {
        lines.push(`- Threshold support: ${lead.thresholdSupport.strength}`);
      }
      if (lead.discoveryTier && lane !== 'implementation_ready') {
        lines.push(`- Discovery tier: ${lead.discoveryTier}`);
      }
      if (lead.endpoints?.putIn || lead.endpoints?.takeOut) {
        lines.push(`- Endpoints: ${lead.endpoints.putIn ?? 'unknown'} -> ${lead.endpoints.takeOut ?? 'unknown'}`);
      }
      if (lead.camping?.category || lead.camping?.notes || lead.camping?.source) {
        const campingParts = [
          lead.camping.category ? `category ${lead.camping.category}` : null,
          typeof lead.camping.overnightFriendly === 'boolean'
            ? (lead.camping.overnightFriendly ? 'overnight-friendly' : 'not overnight-friendly')
            : null,
          lead.camping.source,
        ].filter(Boolean);
        lines.push(`- Camping: ${campingParts.join(' / ') || 'evidence noted'}`);
        if (lead.camping.notes) {
          lines.push(`  - Notes: ${lead.camping.notes}`);
        }
        if (lead.camping.caveats?.length) {
          lines.push(`  - Caveats: ${lead.camping.caveats.join('; ')}`);
        }
      }
      if (lead.blocker) {
        lines.push(`- Blocker: ${lead.blocker}`);
      }
      if (lead.retryCondition) {
        lines.push(`- Retry condition: ${lead.retryCondition}`);
      }
      lines.push(`- Next step: ${lead.recommendedNextStep}`);
      lines.push('');
    }
  }

  return `${lines.join('\n')}\n`;
}

async function main() {
  const now = new Date();
  const ledger = JSON.parse(await readFile(ledgerPath, 'utf8')) as Ledger;
  const currentRouteKeys = new Set<string>();
  const liveRouteCountByState = buildLiveRouteCountByState();

  for (const river of rivers) {
    currentRouteKeys.add(river.slug);
    currentRouteKeys.add(river.id);
    currentRouteKeys.add(routeIdentity({ river: river.name, route: river.reach, candidateId: river.id, status: 'added' }));
  }

  const byStatus: Record<string, number> = {};
  const byLane = Object.fromEntries(laneOrder.map((lane) => [lane, 0])) as Record<LeadLane, number>;
  const leads: Lead[] = [];

  for (const candidate of ledger.candidates) {
    byStatus[candidate.status] = (byStatus[candidate.status] ?? 0) + 1;

    if (terminalStatuses.has(candidate.status)) {
      continue;
    }
    if (candidate.status === 'blocked_until_date' && !isPastRetryDate(candidate.retryDate, now)) {
      continue;
    }

    const duplicateRisk =
      Boolean(candidate.v2Slug && currentRouteKeys.has(candidate.v2Slug)) ||
      currentRouteKeys.has(candidate.candidateId) ||
      currentRouteKeys.has(routeIdentity(candidate));

    const lane = classifyLane(candidate);
    if (!lane) {
      continue;
    }

    const lead = makeLead(candidate, lane, duplicateRisk, liveRouteCountByState);
    leads.push(lead);
    byLane[lane] += 1;
  }

  leads.sort((left, right) => right.priority - left.priority || left.state.localeCompare(right.state));

  const lanes = Object.fromEntries(
    laneOrder.map((lane) => [lane, leads.filter((lead) => lead.lane === lane)]),
  ) as Record<LeadLane, Lead[]>;

  const inbox: LeadInbox = {
    version: 1,
    generatedAt: now.toISOString(),
    sourceLedger: ledgerPath,
    summary: {
      totalLedgerCandidates: ledger.candidates.length,
      currentRouteCount: rivers.length,
      leadCount: leads.length,
      discoveryFocusStates: discoveryFocusStates(liveRouteCountByState),
      discoverySearchBriefs: discoverySearchBriefs(liveRouteCountByState),
      byLane,
      byStatus,
    },
    lanes,
    leads,
  };

  await mkdir(path.dirname(inboxJsonPath), { recursive: true });
  await writeFile(inboxJsonPath, `${JSON.stringify(inbox, null, 2)}\n`);
  await writeFile(inboxMdPath, makeMarkdown(inbox));

  console.log(`Route lead inbox generated with ${leads.length} open lead(s).`);
  for (const lane of laneOrder) {
    console.log(`${lane}: ${byLane[lane]}`);
  }
}

await main();
