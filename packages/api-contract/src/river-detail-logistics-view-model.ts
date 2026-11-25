import type { RiverRouteLogistics } from './index';

const DEFAULT_ACCESS_CAVEAT = 'Check parking, launch, and access rules on the ground.';

export interface RiverDetailLogisticsViewModel {
  shuttleHeadline: string;
  permitsHeadline: string;
  campingHeadline: string;
  compactShuttle: string;
  compactPermits: string;
  compactCamping: string;
  primaryAccessCaveat: string;
  secondaryAccessCaveat: string;
}

function shuttleStatus(value: string | undefined) {
  const shuttle = normalizeLogisticsText(value);
  if (!shuttle) return 'unknown';
  if (!/^no\s+(?:(?:vehicle|car|road)\s+)?shuttle\s+(?:is\s+)?(?:required|needed|necessary)\b/i.test(shuttle)) return 'arrange';
  return /\b(?:if|unless|when|provided|assuming)\b/i.test(shuttle.split(/[.!?]/, 1)[0]) ? 'unknown' : 'unnecessary';
}

export function hasDocumentedShuttleFreeReturn(value: string | undefined) {
  return shuttleStatus(value) === 'unnecessary';
}

export function buildRiverDetailLogisticsViewModel(
  logistics: RiverRouteLogistics | null | undefined,
): RiverDetailLogisticsViewModel {
  const shuttle = normalizeLogisticsText(logistics?.shuttle);
  const permits = normalizeLogisticsText(logistics?.permits);
  const camping = normalizeLogisticsText(logistics?.camping);
  const accessCaveats = (logistics?.accessCaveats ?? [])
    .map(normalizeLogisticsText)
    .filter(Boolean);
  const primaryAccessCaveat = accessCaveats[0] || DEFAULT_ACCESS_CAVEAT;
  const status = shuttleStatus(shuttle);
  const shuttleHeadline = status === 'unknown'
    ? 'Check shuttle'
    : status === 'unnecessary' ? 'No shuttle'
      : shuttle.toLowerCase().includes('bike') ? 'Car or bike' : 'Car shuttle';

  return {
    shuttleHeadline,
    permitsHeadline: /^(no|n\/a)\b/i.test(permits) ? 'None noted' : 'Check posted rules',
    campingHeadline: /^(no|n\/a)\b/i.test(camping) || /day trip/i.test(camping)
      ? 'Day trip'
      : 'Options nearby',
    compactShuttle: compactLogisticsValue(shuttle),
    compactPermits: compactLogisticsValue(permits),
    compactCamping: compactLogisticsValue(camping),
    primaryAccessCaveat,
    secondaryAccessCaveat: accessCaveats[1] || primaryAccessCaveat,
  };
}

export function compactLogisticsValue(value: string | null | undefined): string {
  const normalized = normalizeLogisticsText(value);
  if (!normalized) {
    return 'Not tracked';
  }
  if (/^(none|no )/i.test(normalized)) {
    return 'None noted';
  }
  if (/day trip|day route|day float|not (?:an? )?campground/i.test(normalized)) {
    return 'Day trip';
  }
  if (normalized.length <= 34) {
    return normalized;
  }
  return 'Details below';
}

function normalizeLogisticsText(value: string | null | undefined): string {
  return (value ?? '')
    .replace(/â€¢/g, ' - ')
    .replace(/�+/g, ' - ')
    .replace(/Â·/g, ' - ')
    .replace(/·/g, ' - ')
    .replace(/â€¦/g, '...')
    .replace(/…/g, '...')
    .replace(/Â°F/g, '°F')
    .replace(/Â/g, '')
    .replace(/\s+-\s+-\s+/g, ' - ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
