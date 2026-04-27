import type {
  GaugeProvider,
  GaugeSourceDisplay,
  RiverGaugeSource,
  SourceLink,
  SourceProvider,
  SourceStrength,
} from './types';

export interface GaugeProviderAdapter {
  provider: GaugeProvider;
  label: string;
  shortLabel: string;
  staleMinutes: number;
  supportsRecentSamples: boolean;
  supportsHydrograph: boolean;
  interpretationLabel: string | null;
  readingSourceLabel: string;
}

export interface ThresholdSourceAdapter {
  provider: SourceProvider;
  label: string;
  shortLabel: string;
  sourceBadgeTone:
    | 'official'
    | 'american_whitewater'
    | 'wisconsin_river_trips'
    | 'wisconsin_trail_guide'
    | 'community'
    | 'mixed'
    | 'derived';
  defaultStrength: SourceStrength;
}

export const gaugeProviderAdapters: Record<GaugeProvider, GaugeProviderAdapter> = {
  usgs: {
    provider: 'usgs',
    label: 'USGS Water Data',
    shortLabel: 'USGS',
    staleMinutes: 180,
    supportsRecentSamples: true,
    supportsHydrograph: false,
    interpretationLabel: null,
    readingSourceLabel: 'USGS Water Data',
  },
  mn_dnr: {
    provider: 'mn_dnr',
    label: 'MN DNR River Levels',
    shortLabel: 'MN DNR',
    staleMinutes: 360,
    supportsRecentSamples: false,
    supportsHydrograph: true,
    interpretationLabel: 'DNR interpretation',
    readingSourceLabel: 'MN DNR River Levels',
  },
};

export const thresholdSourceAdapters: Record<SourceProvider, ThresholdSourceAdapter> = {
  usgs: {
    provider: 'usgs',
    label: 'USGS',
    shortLabel: 'USGS',
    sourceBadgeTone: 'official',
    defaultStrength: 'official',
  },
  mn_dnr: {
    provider: 'mn_dnr',
    label: 'MN DNR',
    shortLabel: 'MN DNR',
    sourceBadgeTone: 'official',
    defaultStrength: 'official',
  },
  american_whitewater: {
    provider: 'american_whitewater',
    label: 'American Whitewater',
    shortLabel: 'AW',
    sourceBadgeTone: 'american_whitewater',
    defaultStrength: 'community',
  },
  miles_paddled: {
    provider: 'miles_paddled',
    label: 'Miles Paddled',
    shortLabel: 'MilesPaddled',
    sourceBadgeTone: 'community',
    defaultStrength: 'community',
  },
  wisconsin_river_trips: {
    provider: 'wisconsin_river_trips',
    label: 'Wisconsin River Trips',
    shortLabel: 'WRT',
    sourceBadgeTone: 'wisconsin_river_trips',
    defaultStrength: 'community',
  },
  wisconsin_trail_guide: {
    provider: 'wisconsin_trail_guide',
    label: 'Wisconsin Trail Guide',
    shortLabel: 'WTG',
    sourceBadgeTone: 'wisconsin_trail_guide',
    defaultStrength: 'community',
  },
  nps: {
    provider: 'nps',
    label: 'National Park Service',
    shortLabel: 'NPS',
    sourceBadgeTone: 'official',
    defaultStrength: 'official',
  },
  local: {
    provider: 'local',
    label: 'Local water trail source',
    shortLabel: 'Local',
    sourceBadgeTone: 'mixed',
    defaultStrength: 'mixed',
  },
  manual: {
    provider: 'manual',
    label: 'Manual PaddleToday calibration',
    shortLabel: 'Manual',
    sourceBadgeTone: 'derived',
    defaultStrength: 'derived',
  },
};

export function gaugeAdapterForProvider(provider: GaugeProvider): GaugeProviderAdapter {
  return gaugeProviderAdapters[provider];
}

export function gaugeDisplayForSource(source: RiverGaugeSource): GaugeSourceDisplay {
  const adapter = gaugeAdapterForProvider(source.provider);

  return {
    provider: source.provider,
    label: adapter.label,
    shortLabel: adapter.shortLabel,
    primaryMetricLabel: source.metric === 'gage_height_ft' ? 'Gauge height' : 'Discharge',
    secondaryMetricLabel: source.metric === 'gage_height_ft' ? 'Discharge' : 'Gauge height',
    interpretationLabel: adapter.interpretationLabel,
    supportsRecentSamples: adapter.supportsRecentSamples,
    supportsHydrograph: adapter.supportsHydrograph,
  };
}

export function staleMinutesForGaugeProvider(provider: GaugeProvider): number {
  return gaugeAdapterForProvider(provider).staleMinutes;
}

export function readingSourceLabelForProvider(provider: GaugeProvider): string {
  return gaugeAdapterForProvider(provider).readingSourceLabel;
}

export function inferThresholdProvider(source: SourceLink): SourceProvider | null {
  if (source.provider) {
    return source.provider;
  }

  const haystack = `${source.label} ${source.url}`.toLowerCase();
  if (haystack.includes('americanwhitewater.org') || haystack.includes('american whitewater')) {
    return 'american_whitewater';
  }
  if (haystack.includes('dnr.state.mn.us') || haystack.includes('mn dnr') || haystack.includes('minnesota dnr')) {
    return 'mn_dnr';
  }
  if (haystack.includes('waterdata.usgs.gov') || haystack.includes('usgs')) {
    return 'usgs';
  }
  if (haystack.includes('milespaddled.com') || haystack.includes('milespaddled')) {
    return 'miles_paddled';
  }
  if (
    haystack.includes('wisconsinrivertrips.com') ||
    haystack.includes('wisconsin river trips')
  ) {
    return 'wisconsin_river_trips';
  }
  if (
    haystack.includes('wisconsintrailguide.com') ||
    haystack.includes('wisconsin trail guide')
  ) {
    return 'wisconsin_trail_guide';
  }
  if (haystack.includes('nps.gov') || haystack.includes('national park service')) {
    return 'nps';
  }

  return null;
}

export function thresholdAdapterForSource(source: SourceLink): ThresholdSourceAdapter | null {
  const provider = inferThresholdProvider(source);
  return provider ? thresholdSourceAdapters[provider] : null;
}
