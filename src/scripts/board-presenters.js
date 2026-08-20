export { friendlyCapReason, ratingToneKey, signedPoints } from '@paddletoday/api-contract';

import { callLabelForDecision, callStateForDecision, isColdWeatherDrivenCall } from '@paddletoday/api-contract';
import { freshnessLabel } from './client-cache.js';
import {
  hasStrongerBoardCall,
  isGroupedItem,
  joinWithBullet,
  splitBulletParts,
} from './board-domain.js';
import { mixedCardLinkLabel } from './board-copy.js';
import {
  confidenceDisplayLabel,
  conditionTierDisplayLabel,
  liveDataWarning,
} from './ui-taxonomy.js';

export function formatTravelLabel(minutes) {
  if (!Number.isFinite(minutes)) {
    return '';
  }

  if (minutes < 60) {
    return `${minutes} min drive`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h drive`;
  }

  return `${hours}h ${remainingMinutes}m drive`;
}

export function distanceBucketLabel(minutes) {
  if (!Number.isFinite(minutes)) {
    return 'Distance unavailable';
  }

  if (minutes <= 30) return 'Within 30 minutes';
  if (minutes <= 90) return 'Within 90 minutes';
  return 'Day trip';
}

export function favoriteRecordForItem(item) {
  if (!item?.cardRoute || isGroupedItem(item)) {
    return null;
  }

  const river = item.cardRoute.river;
  return {
    slug: river.slug,
    name: river.name,
    reach: river.reach,
    state: river.state,
    region: river.region,
    url: `/rivers/${encodeURIComponent(river.slug)}/`,
  };
}

export function coldWeatherDrivenCall(item) {
  return isColdWeatherDrivenCall(item?.cardRoute?.weather, item?.cardRoute?.gaugeBand);
}

export function recommendationVerdict(item) {
  const route = item?.cardRoute;
  if (!route) return 'Checking';
  return callLabelForDecision(route.rating, route.readiness?.status);
}

export function recommendationTier(item) {
  return conditionTierDisplayLabel(item?.cardRoute?.rating);
}

export function recommendationSlotLabel(index, nearbyReady) {
  if (nearbyReady) {
    if (index === 0) return 'Top pick';
    if (index === 1) return 'Runner up';
    return 'Worth a look';
  }

  if (index === 0) return 'Top pick';
  if (index === 1) return 'Steady pick';
  return 'Also consider';
}

export function recommendationTagLabels(item, nearbyReady) {
  const tags = [];
  const summary = cardSummary(item).toLowerCase();

  if (item.selectedSegment) {
    tags.push(`Selected segment: ${item.selectedSegment.distanceMiles.toFixed(1)} mi`);
  } else if (item.segmentSummary) {
    tags.push('Shorter segments available');
  }

  if (item.cardRoute.confidence.label === 'High') {
    tags.push('High data confidence');
  }

  if (nearbyReady && Number.isFinite(item.travelMinutes)) {
    if (item.travelMinutes <= 30) tags.push('Short drive');
    else if (item.travelMinutes <= 90) tags.push('Nearby');
    else tags.push('Worth a look');
  }

  if (summary.includes('stable')) {
    tags.push('Stable flow');
  } else if (summary.includes('rising')) {
    tags.push('Rising flow');
  }

  return Array.from(new Set(tags)).slice(0, 2);
}

export function recommendationSummaryText(item, nearbyReady, candidates = []) {
  const summary = summaryParts(cardSummary(item));
  const mainParts = typeof summary.main === 'string'
    ? summary.main
        .split(/\s*(?:\u2022|\/)\s*/g)
        .map((part) => part.trim().toLowerCase())
        .filter(Boolean)
    : [];
  const weather = typeof summary.weather === 'string' ? summary.weather.toLowerCase() : '';
  const hasWeatherRisk = weather.includes('rain') || weather.includes('storm') || weather.includes('wind');
  const hasColdWeather = weather.includes('cold');
  const hasStableFlow = mainParts.some((part) => part.includes('stable') || part.includes('perfect level'));
  const hasChangingFlow = mainParts.some((part) => part.includes('rising') || part.includes('falling'));
  const flowBand = String(item.cardRoute.gaugeBand || '').toLowerCase();
  const flowLooksTooLow = flowBand === 'too-low' || mainParts.some((part) => part.includes('too low') || part.includes('low water'));
  const flowLooksTooHigh = flowBand === 'too-high' || mainParts.some((part) => part.includes('too high') || part.includes('high water'));
  const flowOutsideSweetSpot =
    flowLooksTooLow
    || flowLooksTooHigh
    || flowBand === 'low-shoulder'
    || flowBand === 'high-shoulder';
  const shortDrive = nearbyReady && Number.isFinite(item.travelMinutes) && item.travelMinutes <= 30;
  const call = callStateForDecision(item.cardRoute.rating, item.cardRoute.readiness?.status);

  if (call === 'unavailable') {
    return item.cardRoute.readiness?.reason || 'A current call is unavailable until the required evidence refreshes.';
  }

  if (call === 'skip') {
    if (flowLooksTooLow && hasWeatherRisk) {
      return 'Water is too low today, and weather only makes the call worse.';
    }
    if (flowLooksTooHigh && hasWeatherRisk) {
      return 'Water is too high today, and weather adds even more risk.';
    }
    if (flowLooksTooLow) {
      return 'Water is too low for a clean run today.';
    }
    if (flowLooksTooHigh) {
      return 'Water is too high for a comfortable run today.';
    }
    if (flowOutsideSweetSpot && hasWeatherRisk) {
      return 'Flow is already outside the sweet spot, and weather adds more risk.';
    }
    if (coldWeatherDrivenCall(item) || (hasStableFlow && hasColdWeather)) {
      return 'River level looks usable, but weather makes it a skip for most paddlers today.';
    }
    if (hasStableFlow && hasWeatherRisk) {
      return "River level looks usable, but today's weather makes it a skip.";
    }
    if (shortDrive) {
      return 'Close by, but conditions are too uncertain right now.';
    }
    return 'Conditions stack up against this one today.';
  }

  if (call === 'watch') {
    if (coldWeatherDrivenCall(item) || hasColdWeather) {
      return 'Paddleable today, but cold weather raises the bar.';
    }
    if (hasWeatherRisk) {
      return 'Paddleable today, but weather risk is the main caution.';
    }
    if (hasChangingFlow) {
      return 'Paddleable now; re-check the gauge before you launch.';
    }
    if (!hasStrongerBoardCall(item, candidates)) {
      return 'This is the highest-ranked route on the board, but it still has tradeoffs.';
    }
    return 'Paddleable today, but stronger routes are available.';
  }

  if (shortDrive && hasStableFlow) {
    return 'Stable flow and a short drive make this one of the clearest nearby picks.';
  }

  if (!shortDrive && nearbyReady && call === 'paddle') {
    return 'Worth the drive if you want the strongest nearby conditions.';
  }

  if (item.cardRoute.rating === 'Strong') {
    return 'Best-looking route on the board today.';
  }

  if (item.cardRoute.rating === 'Good') {
    if (hasColdWeather) {
      return 'Good river level; cold weather still deserves a re-check.';
    }
    return 'Solid conditions put this near the top today.';
  }

  return 'This is worth checking, but stronger routes are ahead of it.';
}

export function exploreSortSummaryLabel(sortMode) {
  switch (sortMode) {
    case 'near-you':
      return 'best by drive time';
    case 'nearest':
      return 'closest first';
    case 'highest-confidence':
      return 'highest data confidence';
    case 'lowest-risk':
      return 'lowest-risk routes';
    case 'a-z':
      return 'A-Z';
    default:
      return 'top picks today';
  }
}

export function breakdownValueToneClass(value) {
  if (value > 0) return 'river-score-breakdown__row-value--positive';
  if (value < 0) return 'river-score-breakdown__row-value--negative';
  return 'river-score-breakdown__row-value--neutral';
}

export function routeLengthLabel(item) {
  const distanceLabel = item?.cardRoute?.river?.distanceLabel;
  return distanceLabel ? `${distanceLabel} on-water` : '';
}

export function shortRouteLengthLabel(item) {
  const distanceValue = item?.cardRoute?.river?.distanceMiles;
  if (Number.isFinite(distanceValue)) {
    return `${distanceValue.toFixed(1)} mi route`;
  }

  const distanceLabel = item?.cardRoute?.river?.distanceLabel;
  return distanceLabel ? `${distanceLabel} route` : '';
}

export function routeDifficultyLabel(item) {
  const difficulty = item?.cardRoute?.river?.difficulty;
  if (!difficulty) {
    return '';
  }

  return `${String(difficulty).slice(0, 1).toUpperCase()}${String(difficulty).slice(1)} difficulty`;
}

export function routeEstimatedTimeLabel(item) {
  return item?.cardRoute?.river?.estimatedPaddleTime ?? '';
}

export function routeTypeLabel(item) {
  return item?.cardRoute?.river?.routeType === 'whitewater' ? 'Whitewater' : '';
}

export function metaLineText(item, showDistance, { includeRouteType = false } = {}) {
  const parts = [];
  if (showDistance && Number.isFinite(item.travelMinutes)) {
    parts.push(formatTravelLabel(item.travelMinutes));
  }
  if (routeLengthLabel(item)) {
    parts.push(routeLengthLabel(item));
  }
  if (includeRouteType && !isGroupedItem(item) && routeTypeLabel(item)) {
    parts.push(routeTypeLabel(item));
  }
  if (!isGroupedItem(item) && routeDifficultyLabel(item)) {
    parts.push(routeDifficultyLabel(item));
  }
  if (!isGroupedItem(item) && routeEstimatedTimeLabel(item)) {
    parts.push(routeEstimatedTimeLabel(item));
  }
  parts.push(confidenceLabel(item));
  return parts.join(' \u2022 ');
}

export function liveReadWarning(result) {
  return liveDataWarning(result?.liveData, {
    offlineShort: 'Feed issue',
    degradedShort: 'Limited reads',
  });
}

export function cardLinkLabel(item) {
  return mixedCardLinkLabel(isGroupedItem(item));
}

export function rawSignalLine(item) {
  return item?.cardRoute?.summary?.rawSignalLine ?? item?.cardRoute?.summary?.gaugeNow ?? '';
}

export function parseRawSignalLine(rawSignal) {
  if (typeof rawSignal !== 'string' || !rawSignal.trim()) {
    return [];
  }

  return splitBulletParts(rawSignal)
    .map((part) => {
      if (/^Gauge:/i.test(part)) {
        return { kind: 'gauge', value: part.replace(/^Gauge:\s*/i, '') };
      }
      if (/^Wind:/i.test(part)) {
        return { kind: 'wind', value: part.replace(/^Wind:\s*/i, '') };
      }
      if (/^Temp:/i.test(part)) {
        return { kind: 'temp', value: part.replace(/^Temp:\s*/i, '') };
      }
      return null;
    })
    .filter(Boolean);
}

export function parseTemperature(rawSignal) {
  const match = typeof rawSignal === 'string' ? rawSignal.match(/Temp:\s*(-?\d+)\u00B0F/i) : null;
  if (!match) {
    return null;
  }

  const value = Number.parseInt(match[1], 10);
  return Number.isFinite(value) ? value : null;
}

export function summaryParts(text) {
  const parts = splitBulletParts(text);

  if (parts.length >= 3) {
    return {
      main: joinWithBullet(parts.slice(0, 2)),
      weather: joinWithBullet(parts.slice(2)),
    };
  }

  return {
    main: joinWithBullet(parts),
    weather: '',
  };
}

export function cardSummary(item) {
  return item?.cardRoute?.summary?.shortExplanation ?? item?.cardRoute?.explanation ?? '';
}

export function weatherVisualState(item) {
  const summary = cardSummary(item).toLowerCase();
  const temperature = parseTemperature(rawSignalLine(item));
  const coldSevere = typeof temperature === 'number' && temperature <= 35;
  const coldNoticeable = typeof temperature === 'number' && temperature <= 40;

  if (summary.includes('storm')) return 'storm';
  if (coldSevere) return 'cold';
  if (summary.includes('rain')) return 'rain';
  if (coldNoticeable) return 'cold';
  if (summary.includes('windy')) return 'wind';
  return 'calm';
}

export function weatherVisualLabel(state) {
  switch (state) {
    case 'storm':
      return 'Storm risk';
    case 'rain':
      return 'Rain later';
    case 'cold':
      return 'Cold weather';
    case 'wind':
      return 'Windy';
    default:
      return 'Mostly dry';
  }
}

export function formatGeneratedFreshness(isoString) {
  if (typeof isoString !== 'string' || !isoString) {
    return 'Checking latest refresh...';
  }

  const timestamp = new Date(isoString).getTime();
  if (!Number.isFinite(timestamp)) {
    return 'Checking latest refresh...';
  }

  return `${freshnessLabel(timestamp)}.`;
}

export function formatBoardRefreshCopy(timestamp) {
  if (typeof timestamp === 'number' && Number.isFinite(timestamp)) {
    return `Snapshot refreshes every 30 minutes. ${freshnessLabel(timestamp)}.`;
  }

  return 'Snapshot refreshes every 30 minutes.';
}

export function regionStateText(item) {
  return joinWithBullet([item?.cardRoute?.river?.state, item?.cardRoute?.river?.region]).toUpperCase();
}

export function confidenceLabel(item) {
  return confidenceDisplayLabel(item?.cardRoute?.confidence?.label);
}

export function summaryMentionsWeather(text) {
  const lowered = typeof text === 'string' ? text.toLowerCase() : '';
  return lowered.includes('rain') || lowered.includes('storm') || lowered.includes('wind') || lowered.includes('cold');
}

export function summaryMentionsFlowShift(text) {
  const lowered = typeof text === 'string' ? text.toLowerCase() : '';
  return lowered.includes('rising') || lowered.includes('falling') || lowered.includes('changing flow');
}
