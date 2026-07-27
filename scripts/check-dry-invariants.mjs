import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const sourceRoots = ['src', 'apps', 'packages'];
const extensions = new Set(['.js', '.mjs', '.ts', '.tsx']);
const excludedDirectories = new Set(['node_modules', 'dist', 'tmp', '.astro', '.expo']);

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(path));
    else if (extensions.has(extname(entry.name)) && !entry.name.endsWith('.test.ts')) files.push(path);
  }
  return files;
}

const files = (await Promise.all(
  sourceRoots.map((directory) => sourceFiles(join(root, directory)))
)).flat();
const rules = [
  {
    name: 'MapLibre construction must go through map-runtime',
    pattern: /new\s+maplibregl\.Map\s*\(/g,
    allowed: new Set(['src/scripts/map-runtime.js']),
  },
  {
    name: 'Map viewport fitting must go through map-runtime',
    pattern: /\.fitBounds\s*\(/g,
    allowed: new Set(['src/scripts/map-runtime.js']),
  },
  {
    name: 'SAS parsing must go through blob-storage',
    pattern: /function\s+parseContainerSas\s*\(/g,
    allowed: new Set(['src/lib/blob-storage.ts']),
  },
  {
    name: 'Azure EmailClient setup must go through email-transport',
    pattern: /from\s+['"]@azure\/communication-email['"]/g,
    allowed: new Set(['src/lib/email-transport.ts']),
  },
  {
    name: 'Email validation must come from api-contract',
    pattern: /function\s+isValidEmail(?:Address)?\s*\(/g,
    allowed: new Set(['packages/api-contract/src/validation.ts']),
  },
  {
    name: 'Board ranking weights must come from api-contract',
    pattern: /\b(?:statusWeight|confidenceWeight)\s*=\s*(?:new\s+Map|\{)/g,
    allowed: new Set(),
  },
  {
    name: 'Shared presentation policy must come from api-contract',
    pattern: /function\s+(?:ratingToneKey|signedPoints|friendlyCapReason)\s*\(/g,
    allowed: new Set(['packages/api-contract/src/presentation.ts']),
  },
  {
    name: 'Shared board presentation behavior must come from board-presenters',
    pattern: /function\s+(?:shortRouteLengthLabel|parseRawSignalLine|parseTemperature|formatGeneratedFreshness|formatBoardRefreshCopy|summaryMentionsWeather|summaryMentionsFlowShift|favoriteRecordForItem|coldWeatherDrivenCall|coldWeatherDrivenResult|recommendationVerdict|exploreSortSummaryLabel)\s*\(/g,
    allowed: new Set(['src/scripts/board-presenters.js']),
  },
  {
    name: 'Home and Explore card policy must come from shared board modules',
    pattern: /function\s+(?:hasStrongerBoardCall|recommendationSlotLabel|recommendationTagLabels|recommendationSummaryText|routeTypeLabel|metaLineText|liveReadWarning|cardLinkLabel)\s*\(/g,
    files: new Set(['src/scripts/summary-board.js', 'src/scripts/summary-board-home.js']),
    allowed: new Set(),
  },
  {
    name: 'Shared board card markup must come from board-card-markup',
    pattern: /function\s+(?:signalIconMarkup|signalRowMarkup|weatherVisualMarkup|weatherBadgeMarkup|featuredConditionMarkup|updateFeaturedWeather|renderTagMarkup|renderSourceBadges|renderScoreBreakdownDisclosure|createRecommendationCard|renderRecommendationGrid|createCard|renderCardGrid)\s*\(/g,
    files: new Set(['src/scripts/summary-board.js', 'src/scripts/summary-board-home.js']),
    allowed: new Set(),
  },
  {
    name: 'Home and Explore preference persistence must come from board-preference-storage',
    pattern: /function\s+(?:saveLocation|saveRadiusMiles|saveHomeDifficultyFilter|saveHomePaddleTimeFilter|loadStoredLocation|loadStoredRadiusMiles|loadStoredHomeDifficultyFilter|loadStoredHomePaddleTimeFilter)\s*\(/g,
    files: new Set(['src/scripts/summary-board.js', 'src/scripts/summary-board-home.js']),
    allowed: new Set(),
  },
  {
    name: 'Home and Explore preference transitions must come from board-preference-controller',
    pattern: /function\s+(?:setRadiusMiles|setHomeDifficultyFilter|setHomePaddleTimeFilter|setNearbySortMode|updateFilterButtonStates)\s*\(/g,
    files: new Set(['src/scripts/summary-board.js', 'src/scripts/summary-board-home.js']),
    allowed: new Set(),
  },
  {
    name: 'Shared board classification and recommendation selection must come from board-domain',
    pattern: /function\s+(?:isGroupedItem|buildRecommendationItems)\s*\(/g,
    allowed: new Set(['src/scripts/board-domain.js']),
  },
  {
    name: 'Shared board map labels must come from board-map-model',
    pattern: /(?:function\s+|const\s+)(?:mapMarkerLabel|visibleMapMarkerLabel|mapMarkerContext|mapMarkerAriaLabel|routeCountLabel|representativeRouteLabel|routeLabelForItem|segmentLabelForItem|featuredRouteLabelForItem|featuredMapCaptionText)\s*(?:=|\()/g,
    allowed: new Set(['src/scripts/board-map-model.js']),
  },
  {
    name: 'Public browser API calls must go through api-client',
    pattern: /\bfetch\s*\(\s*(?:['"`]\/api\/(?:rivers|river-groups|weekend|route-request|route-contributions)(?:\/|['"`])|['"`]\/api\/alerts['"`])/g,
    allowed: new Set(),
  },
  {
    name: 'River Detail readiness policy must come from api-contract',
    pattern: /function\s+(?:effectiveLiveDataForResult|readinessVerdictFromResult|scoreWeatherState|scoreWeatherLabel)\s*\(/g,
    allowed: new Set(),
  },
  {
    name: 'Camping classification and labels must come from api-contract',
    pattern: /function\s+(?:classifyCamping|hasCampingSupport|hasOvernightCampingSupport|campingClassificationLabel|campingFitLabel)\s*\(/g,
    allowed: new Set(['packages/api-contract/src/camping.ts']),
  },
  {
    name: 'Route safety view models must come from api-contract',
    pattern: /function\s+(?:buildRouteSafetyViewModel|mobileSafetyTitle|mobileSafetyBody|dedupeSafetyNotes)\s*\(/g,
    allowed: new Set(['packages/api-contract/src/index.ts']),
  },
  {
    name: 'Hourly weather decisions must come from api-contract',
    pattern: /function\s+(?:weatherTimingModel|hourlyWeatherRisk|formatHourLabel|findFirstRainHour)\s*\(/g,
    allowed: new Set(),
  },
  {
    name: 'Threshold source-strength presentation must come from api-contract',
    pattern: /function\s+(?:sourceStrengthLabel|sourceStrengthImpact|sourceStrengthDetail|thresholdBadgeLabel)\s*\(/g,
    allowed: new Set(),
  },
  {
    name: 'River Detail logistics summaries must come from api-contract',
    pattern: /function\s+shortLogisticsValue\s*\(/g,
    allowed: new Set(),
  },
  {
    name: 'Home and Explore map interaction policy must come from board-map-controller',
    pattern: /function\s+(?:activeSummaryMapView|closeSummaryMapPopups|summaryMapResultsNoteText|summaryMapItemNoun|updateSummaryMapMobileContext|renderSummaryMapResults|scrollSummaryMapShellIntoView|setSummaryMapMobileView|updateSummaryMapToggle|markerClassFor|popupMarkup)\s*\(/g,
    allowed: new Set(['src/scripts/board-map-controller.js']),
  },
  {
    name: 'Home and Explore featured maps must come from board-featured-map-controller',
    pattern: /(?:async\s+)?function\s+(?:clearFeaturedMapMarkers|featuredRouteLineColor|featuredMapAccessPoints|featuredRouteFallbackFeature|featuredMapFocusPoints|syncFeaturedRouteLine|isFeaturedMapStyleReady|waitForFeaturedMapReady|renderFeaturedMap)\s*\(/g,
    files: new Set(['src/scripts/summary-board.js', 'src/scripts/summary-board-home.js']),
    allowed: new Set(),
  },
  {
    name: 'Home and Explore rating filters must come from board-domain',
    pattern: /result\.rating\s*!==\s*activeFilters\.rating/g,
    files: new Set(['src/scripts/summary-board.js', 'src/scripts/summary-board-home.js']),
    allowed: new Set(),
  },
  {
    name: 'Home and Explore geocoding must come from board-location-service',
    pattern: /function\s+(?:searchManualLocation|geocodeManualLocation|reverseGeocodeLocation)\s*\(/g,
    files: new Set(['src/scripts/summary-board.js', 'src/scripts/summary-board-home.js']),
    allowed: new Set(),
  },
  {
    name: 'Home and Explore geolocation lifecycle must come from board-geolocation-controller',
    pattern: /function\s+(?:requestUserLocation|maybeUseGrantedLocation)\s*\(/g,
    files: new Set(['src/scripts/summary-board.js', 'src/scripts/summary-board-home.js']),
    allowed: new Set(),
  },
  {
    name: 'Home and Explore location UI lifecycle must come from board-location-controller',
    pattern: /(?:async\s+)?function\s+(?:submitManualLocation|updateLocationIndicator|setUserLocation|distanceForResult|resultWithinSelectedRadius|itemWithinSelectedRadius|shortLocationLabel)\s*\(/g,
    files: new Set(['src/scripts/summary-board.js', 'src/scripts/summary-board-home.js']),
    allowed: new Set(),
  },
  {
    name: 'Home and Explore board loading must come from board-loader-controller',
    pattern: /(?:async\s+)?function\s+(?:loadBoard|hydrateBoardFromCache)\s*\(/g,
    files: new Set(['src/scripts/summary-board.js', 'src/scripts/summary-board-home.js']),
    allowed: new Set(),
  },
  {
    name: 'Home and Explore board status lifecycle must come from board-status-controller',
    pattern: /function\s+(?:updateSummaryStatus|setBoardRefreshState|setBoardFetchBannerState)\s*\(/g,
    files: new Set(['src/scripts/summary-board.js', 'src/scripts/summary-board-home.js']),
    allowed: new Set(),
  },
  {
    name: 'Semantic pill radii must come from design-tokens',
    pattern: /\bpill:\s*999\b/g,
    allowed: new Set(['packages/design-tokens/src/index.js']),
  },
  {
    name: 'Native semantic spacing must come from design-tokens',
    pattern: /\b(?:xs|sm|md|lg|xl):\s*\d+\b/g,
    files: new Set(['apps/mobile/src/theme/tokens.ts']),
    allowed: new Set(),
  },
];

const violations = [];
for (const file of files) {
  const path = relative(root, file).replaceAll('\\', '/');
  const source = await readFile(file, 'utf8');
  for (const rule of rules) {
    if (rule.files && !rule.files.has(path)) {
      continue;
    }
    if (!rule.allowed.has(path) && rule.pattern.test(source)) {
      violations.push(`${path}: ${rule.name}`);
    }
    rule.pattern.lastIndex = 0;
  }
}

if (violations.length > 0) {
  console.error('[dry-check] Shared behavior bypasses detected:');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log(`[dry-check] ${rules.length} shared-behavior invariants pass across ${files.length} source files.`);
}
