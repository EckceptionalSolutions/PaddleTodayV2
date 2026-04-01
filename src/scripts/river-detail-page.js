import {
  MAP_STYLE_URL,
  bindMarkerPopup,
  ensureMapLibre,
  escapeHtml,
} from '/scripts/map-runtime.js';

const root = document.querySelector('[data-river-detail]');
if (!(root instanceof HTMLElement)) {
  throw new Error('Missing river detail root.');
}

const slug = root.dataset.riverSlug;
if (!slug) {
  throw new Error('Missing river slug.');
}

const detailMap = root.querySelector('[data-detail-map]');
const detailMapStatus = root.querySelector('[data-detail-map-status]');
const chartButtons = Array.from(root.querySelectorAll('[data-chart-window]'));
const detailStatusBanner = root.querySelector('[data-detail-status-banner]');
const detailFetchBanner = root.querySelector('[data-detail-fetch-banner]');
const detailFetchTitle = root.querySelector('[data-detail-fetch-title]');
const detailFetchDetail = root.querySelector('[data-detail-fetch-detail]');
const detailRefreshButton = root.querySelector('[data-detail-refresh]');
const detailRefreshNote = root.querySelector('[data-detail-refresh-note]');
const readinessGrid = root.querySelector('[data-readiness-grid]');
const copyCoordButtons = Array.from(root.querySelectorAll('[data-copy-coords]'));
const accessPlanner = root.querySelector('[data-access-planner]');
const accessPointData = root.querySelector('[data-access-points]');
const accessPutInSelect = root.querySelector('[data-access-putin]');
const accessTakeOutSelect = root.querySelector('[data-access-takeout]');
const accessDistance = root.querySelector('[data-access-distance]');
const accessShape = root.querySelector('[data-access-shape]');
const accessTime = root.querySelector('[data-access-time]');
const accessStage = root.querySelector('[data-access-stage]');
const accessShuttle = root.querySelector('[data-access-shuttle]');
const accessNote = root.querySelector('[data-access-note]');
const accessSummary = root.querySelector('[data-access-summary]');
const accessPutInLink = root.querySelector('[data-access-putin-link]');
const accessTakeOutLink = root.querySelector('[data-access-takeout-link]');
const accessDirectionsGoogle = root.querySelector('[data-access-directions-google]');
const accessDirectionsApple = root.querySelector('[data-access-directions-apple]');
const accessOpenStreetMap = root.querySelector('[data-access-openstreetmap]');
const activePutInName = root.querySelector('[data-field="active-putin-name"]');
const activeTakeOutName = root.querySelector('[data-field="active-takeout-name"]');
const activePutInNote = root.querySelector('[data-field="active-putin-note"]');
const activeTakeOutNote = root.querySelector('[data-field="active-takeout-note"]');
const activeFactPutIn = root.querySelector('[data-field="active-fact-putin"]');
const activeFactTakeOut = root.querySelector('[data-field="active-fact-takeout"]');
const activeFactDistance = root.querySelector('[data-field="active-fact-distance"]');
const activeFactMapMode = root.querySelector('[data-field="active-fact-map-mode"]');
const activePutInCopy = root.querySelector('[data-field="active-putin-copy"]');
const activeTakeOutCopy = root.querySelector('[data-field="active-takeout-copy"]');
const riverContext = {
  name: root.dataset.riverName ?? 'River',
  reach: root.dataset.riverReach ?? 'Reach',
  state: root.dataset.riverState ?? '',
  region: root.dataset.riverRegion ?? '',
  putIn: {
    name: root.dataset.putInName ?? 'Put-in',
    latitude: Number(root.dataset.putInLatitude),
    longitude: Number(root.dataset.putInLongitude),
  },
  takeOut: {
    name: root.dataset.takeOutName ?? 'Take-out',
    latitude: Number(root.dataset.takeOutLatitude),
    longitude: Number(root.dataset.takeOutLongitude),
  },
  defaultPutInNote: activePutInNote instanceof HTMLElement ? activePutInNote.textContent ?? '' : '',
  defaultTakeOutNote: activeTakeOutNote instanceof HTMLElement ? activeTakeOutNote.textContent ?? '' : '',
  defaultDistanceLabel: activeFactDistance instanceof HTMLElement ? activeFactDistance.textContent ?? '' : '',
};

let detailMapRuntime = null;
let detailMapMarkers = [];
let currentChartWindowHours = 72;
let latestResult = null;
let plannerAccessPoints = [];
let activeAccessContext = {
  putIn: riverContext.putIn,
  takeOut: riverContext.takeOut,
  distanceLabel: riverContext.defaultDistanceLabel || 'Check source links',
  putInNote: riverContext.defaultPutInNote || 'Check parking, launch, and access rules on the ground.',
  takeOutNote: riverContext.defaultTakeOutNote || 'Check parking, launch, and access rules on the ground.',
  mapMode: 'Stored route endpoints',
};
const bannerClasses = ['status-banner--live', 'status-banner--degraded', 'status-banner--offline', 'status-banner--loading'];
const AUTO_REFRESH_MS = 5 * 60 * 1000;
let lastDetailSuccessAt = null;
let hasLoadedDetailOnce = false;

function setText(field, value) {
  const elements = Array.from(root.querySelectorAll(`[data-field="${field}"]`));
  for (const element of elements) {
    element.textContent = value;
  }
  return elements[0] ?? null;
}

function decisionLabel(rating) {
  if (rating === 'Strong' || rating === 'Good') return 'Paddle today';
  if (rating === 'Borderline') return 'Maybe today';
  return 'Skip today';
}

function ratingLabel(rating) {
  return rating;
}

function decisionStatement(rating) {
  if (rating === 'Strong') return 'Conditions line up especially well right now.';
  if (rating === 'Good') return 'Launch window looks workable right now.';
  if (rating === 'Borderline') return 'This one needs a closer look before you drive.';
  return 'Today looks like a pass unless you have fresher local intel.';
}

function ratingToneKey(rating) {
  if (rating === 'Strong') return 'great';
  if (rating === 'Borderline') return 'marginal';
  return String(rating).toLowerCase().replace(/[^a-z]+/g, '-');
}

function formatGaugeValue(value, unit) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return '--';
  }

  if (unit === 'ft') {
    return `${value.toFixed(2).replace(/\.00$/, '')} ${unit}`;
  }

  return `${Math.round(value).toLocaleString('en-US')} ${unit}`;
}

function decorateDecision(element, rating) {
  if (!(element instanceof HTMLElement)) return;

  element.classList.remove('decision-pill--paddle', 'decision-pill--maybe', 'decision-pill--skip');
  element.classList.add(
    rating === 'Strong' || rating === 'Good'
      ? 'decision-pill--paddle'
      : rating === 'Borderline'
        ? 'decision-pill--maybe'
        : 'decision-pill--skip'
  );
}

function decorateBanner(element, overall) {
  if (!(element instanceof HTMLElement)) return;
  element.classList.remove(...bannerClasses);
  element.classList.add(`status-banner--${overall}`);
}

function setHidden(element, hidden) {
  if (!(element instanceof HTMLElement)) return;
  element.classList.toggle('status-banner--hidden', hidden);
}

function setDetailRefreshState(state, detail = '') {
  if (detailRefreshButton instanceof HTMLButtonElement) {
    detailRefreshButton.disabled = state === 'loading';
    detailRefreshButton.textContent = state === 'loading' ? 'Refreshing...' : 'Refresh river call';
  }

  if (detailRefreshNote instanceof HTMLElement) {
    if (state === 'loading') {
      detailRefreshNote.textContent = 'Refreshing gauge and weather inputs.';
      return;
    }

    if (state === 'error') {
      detailRefreshNote.textContent = detail || 'Last refresh failed.';
      return;
    }

    if (lastDetailSuccessAt) {
      detailRefreshNote.textContent = `Last refresh ${new Date(lastDetailSuccessAt).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })}. Auto-refreshes every 5 minutes.`;
      return;
    }

    detailRefreshNote.textContent = 'Auto-refreshes every 5 minutes.';
  }
}

function setDetailFetchBannerState(kind, detail) {
  if (!(detailFetchBanner instanceof HTMLElement)) {
    return;
  }

  if (kind === 'hidden') {
    setHidden(detailFetchBanner, true);
    return;
  }

  setHidden(detailFetchBanner, false);
  decorateBanner(detailFetchBanner, 'offline');
  if (detailFetchTitle instanceof HTMLElement) {
    detailFetchTitle.textContent =
      kind === 'initial'
        ? 'Live river inputs could not be loaded.'
        : 'Live river inputs could not be refreshed.';
  }
  if (detailFetchDetail instanceof HTMLElement) {
    detailFetchDetail.textContent = detail;
  }
}

function inputStateLabel(state, kind) {
  if (state === 'live') return `${kind} live`;
  if (state === 'stale') return `${kind} stale`;
  return `${kind} offline`;
}

function readinessVerdictFromResult(result) {
  if (result.liveData.overall === 'offline') return 'skip';
  if (result.checklist.some((item) => item.status === 'skip')) return 'skip';
  if (result.liveData.overall === 'degraded') return 'watch';
  if (result.checklist.some((item) => item.status === 'watch')) return 'watch';
  return 'go';
}

function readinessVerdictLabel(verdict) {
  if (verdict === 'go') return 'Go';
  if (verdict === 'watch') return 'Watch';
  return 'Skip';
}

function trendValue(result) {
  if (!result.gauge || result.gauge.delta24h === null) {
    return 'Trend unavailable';
  }

  const delta = `${result.gauge.delta24h >= 0 ? '+' : ''}${formatGaugeValue(result.gauge.delta24h, result.gauge.unit)}`;
  return `${result.gauge.trend} ${delta}`;
}

function weatherValue(result) {
  if (!result.weather) {
    return 'Weather unavailable';
  }

  return `${Math.round(result.weather.next12hPrecipProbabilityMax ?? 0)}% rain - ${Math.round(result.weather.next12hWindMphMax ?? result.weather.windMph ?? 0)} mph`;
}

function accessValue(result) {
  const hasPutIn = hasCoordinates(riverContext.putIn);
  const hasTakeOut = hasCoordinates(riverContext.takeOut);

  if (hasPutIn && hasTakeOut) {
    return result.river.profile.difficulty === 'hard' ? 'Mapped, technical reach' : 'Mapped put-in and take-out';
  }

  if (hasPutIn || hasTakeOut) {
    return 'Partial access map';
  }

  return 'Check access details';
}

function renderDetailBanner(result) {
  if (!(detailStatusBanner instanceof HTMLElement)) {
    return;
  }

  const titleEl = root.querySelector('[data-detail-banner-title]');
  const detailEl = root.querySelector('[data-detail-banner-detail]');
  const railReliability = setText('rail-reliability', 'Checking reads');
  const railNextStep = setText('rail-next-step', 'Checking freshness and source quality.');
  decorateBanner(detailStatusBanner, result.liveData.overall);
  detailStatusBanner.classList.toggle('status-banner--compact', result.liveData.overall === 'live');

  if (!(titleEl instanceof HTMLElement) || !(detailEl instanceof HTMLElement)) {
    return;
  }

  setText('reliability-gauge-title', inputStateLabel(result.liveData.gauge.state, 'Gauge'));
  setText('reliability-gauge-detail', result.liveData.gauge.detail);
  setText('reliability-weather-title', inputStateLabel(result.liveData.weather.state, 'Weather'));
  setText('reliability-weather-detail', result.liveData.weather.detail);

  if (result.liveData.overall === 'offline') {
    titleEl.textContent = 'This river call is offline.';
    detailEl.textContent =
      'The direct gauge could not be read. Check the source directly before deciding.';
    if (railReliability instanceof HTMLElement) {
      railReliability.textContent = 'Check source';
      railReliability.classList.add('data-status-pill--offline');
      railReliability.classList.remove('data-status-pill--live', 'data-status-pill--degraded');
    }
    if (railNextStep instanceof HTMLElement) {
      railNextStep.textContent = 'Gauge data is missing. Open the source link before you drive.';
    }
    setText('reliability-action-title', 'Recheck gauge source');
    setText(
      'reliability-action-detail',
      'Open the direct USGS gauge page before driving.'
    );
    return;
  }

  if (result.liveData.overall === 'degraded') {
    titleEl.textContent = 'This river call is limited.';
    detailEl.textContent =
      `${result.liveData.summary} Recheck the source before a longer drive.`;
    if (railReliability instanceof HTMLElement) {
      railReliability.textContent = 'Use with caution';
      railReliability.classList.add('data-status-pill--degraded');
      railReliability.classList.remove('data-status-pill--live', 'data-status-pill--offline');
    }
    const actionTitle =
      result.liveData.gauge.state === 'stale'
        ? 'Refresh the gauge'
        : result.liveData.weather.state !== 'live'
          ? 'Refresh weather'
          : 'Double-check these reads';
    const actionDetail =
      result.liveData.gauge.state === 'stale'
        ? 'The gauge is older than the freshness target. Open the gauge source before you leave.'
        : result.liveData.weather.state === 'stale'
          ? 'The weather read is stale. Recheck wind, storms, and radar before launching.'
          : 'One or more reads are partial. Recheck the source pages directly.';
    if (railNextStep instanceof HTMLElement) {
      railNextStep.textContent = actionDetail;
    }
    setText('reliability-action-title', actionTitle);
    setText('reliability-action-detail', actionDetail);
    return;
  }

  titleEl.textContent = 'Reads are current.';
  detailEl.textContent = 'Gauge and weather are fresh enough to make the call.';
  if (railReliability instanceof HTMLElement) {
    railReliability.textContent = 'Reads live';
    railReliability.classList.add('data-status-pill--live');
    railReliability.classList.remove('data-status-pill--degraded', 'data-status-pill--offline');
  }
  if (railNextStep instanceof HTMLElement) {
    railNextStep.textContent = 'Fresh enough to decide today.';
  }
  setText('reliability-action-title', 'Move to trip checks');
  setText(
    'reliability-action-detail',
    'No extra freshness check is needed right now.'
  );
}

function renderLaunchReadiness(result) {
  if (!(readinessGrid instanceof HTMLElement)) {
    return;
  }

  const verdict = readinessVerdictFromResult(result);
  const verdictLabel = readinessVerdictLabel(verdict);
  const verdictEl = setText('readiness-verdict', verdictLabel);
  if (verdictEl instanceof HTMLElement) {
    verdictEl.classList.remove(
      'launch-readiness__verdict--go',
      'launch-readiness__verdict--watch',
      'launch-readiness__verdict--skip'
    );
    verdictEl.classList.add(`launch-readiness__verdict--${verdict}`);
  }

  const summaryText =
    verdict === 'go'
      ? 'Launch window looks open right now.'
      : verdict === 'watch'
        ? 'Conditions are workable, but something still needs a second look.'
        : 'Today is not a clean launch call.';
  const firstWarning =
    result.checklist.find((item) => item.status !== 'go')?.detail ??
    result.liveData.summary;

  setText('readiness-summary', summaryText);
  setText('readiness-note', firstWarning);

  const checklistByLabel = new Map(result.checklist.map((item) => [item.label, item]));
  const items = [
    {
      label: 'Launch call',
      value: `${decisionLabel(result.rating)} - ${result.score}`,
      detail: decisionStatement(result.rating),
      status: verdict,
    },
    {
      label: 'Flow window',
      value: result.gauge ? `${result.gaugeBandLabel} - ${formatGaugeValue(result.gauge.current, result.gauge.unit)}` : 'Unavailable',
      detail: checklistByLabel.get('Gauge window')?.detail ?? 'Current gauge window is unavailable.',
      status: checklistByLabel.get('Gauge window')?.status ?? 'watch',
    },
    {
      label: 'Trend',
      value: trendValue(result),
      detail: checklistByLabel.get('Trend check')?.detail ?? 'Trend guidance is unavailable.',
      status: checklistByLabel.get('Trend check')?.status ?? 'watch',
    },
    {
      label: 'Weather',
      value: weatherValue(result),
      detail: checklistByLabel.get('Weather window')?.detail ?? 'Weather guidance is unavailable.',
      status: checklistByLabel.get('Weather window')?.status ?? 'watch',
    },
    {
      label: 'Access',
      value: accessValue(result),
      detail: checklistByLabel.get('Skill and access')?.detail ?? 'Confirm put-in, take-out, and access rules.',
      status: checklistByLabel.get('Skill and access')?.status ?? 'watch',
    },
  ];

  readinessGrid.innerHTML = items
    .map(
      (item) => `
        <article class="readiness-item readiness-item--${item.status}">
          <span class="readiness-item__label">${item.label}</span>
          <strong>${item.value}</strong>
          <p class="muted">${item.detail}</p>
        </article>
      `
    )
    .join('');
}

function renderFactors(factors) {
  const list = root.querySelector('[data-factor-list]');
  if (!(list instanceof HTMLElement)) return;

  list.innerHTML = factors
    .map(
      (factor) => `
        <li class="factor-item impact-${factor.impact}">
          <div class="factor-item__head">
            <span class="factor-item__label">${factor.label}</span>
            <span class="factor-item__value">${factor.value}</span>
          </div>
          <p class="muted" style="margin: 0.55rem 0 0;">${factor.detail}</p>
        </li>
      `
    )
    .join('');
}

function renderConfidenceDetail(confidence) {
  const labelEl = setText('confidence-detail-label', confidence?.label ?? 'checking');
  if (labelEl instanceof HTMLElement) {
    labelEl.textContent = confidence?.label?.toLowerCase() ?? 'checking';
  }

  const reasonsList = root.querySelector('[data-confidence-reasons]');
  const warningsList = root.querySelector('[data-confidence-warnings]');
  const warningsGroup = root.querySelector('[data-confidence-warnings-group]');

  if (reasonsList instanceof HTMLElement) {
    const reasons = Array.isArray(confidence?.reasons) ? confidence.reasons : [];
    reasonsList.innerHTML = reasons.length
      ? reasons.map((note) => `<li>${note}</li>`).join('')
      : '<li>Confidence reasons are unavailable.</li>';
  }

  if (warningsList instanceof HTMLElement && warningsGroup instanceof HTMLElement) {
    const warnings = Array.isArray(confidence?.warnings) ? confidence.warnings : [];
    warningsGroup.hidden = warnings.length === 0;
    warningsList.innerHTML = warnings.length
      ? warnings.map((note) => `<li>${note}</li>`).join('')
      : '';
  }
}

function signedPoints(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 'Unavailable';
  }

  return value > 0 ? `+${value}` : `${value}`;
}

function renderScoreBreakdown(result) {
  const breakdown = result.scoreBreakdown;
  if (!breakdown) {
    return;
  }

  setText('breakdown-river-quality', `${breakdown.riverQuality}`);
  setText('breakdown-weather-adjustment', signedPoints(breakdown.weatherAdjustment));
  setText('breakdown-temperature-adjustment', signedPoints(breakdown.temperatureAdjustment));
  setText('breakdown-comfort-adjustment', signedPoints(breakdown.comfortAdjustment));
  setText(
    'breakdown-summary',
    `River quality ${breakdown.riverQuality} + weather ${signedPoints(breakdown.weatherAdjustment)} + temperature ${signedPoints(breakdown.temperatureAdjustment)} + comfort ${signedPoints(breakdown.comfortAdjustment)} = ${breakdown.finalScore}.`
  );

  const capList = root.querySelector('[data-score-cap-reasons]');
  if (capList instanceof HTMLElement) {
    const reasons = Array.isArray(breakdown.capReasons) ? breakdown.capReasons : [];
    capList.innerHTML = reasons.length
      ? reasons.map((reason) => `<li>${reason}</li>`).join('')
      : '<li>No soft cap applied today.</li>';
  }
}

function renderChecklist(checklist) {
  const list = root.querySelector('[data-checklist]');
  if (!(list instanceof HTMLElement)) return;

  list.innerHTML = checklist
    .map(
      (item) => `
        <li class="decision-checklist__item decision-checklist__item--${item.status}">
          <span class="decision-checklist__status">${item.status === 'go' ? 'Go' : item.status === 'watch' ? 'Watch' : 'Skip'}</span>
          <div>
            <strong>${item.label}</strong>
            <p class="muted">${item.detail}</p>
          </div>
        </li>
      `
    )
    .join('');
}

function renderOutlooks(outlooks) {
  const list = root.querySelector('[data-outlooks]');
  if (!(list instanceof HTMLElement)) return;

  list.innerHTML = outlooks
    .map((outlook) => {
      const title =
        outlook.availability === 'available' && typeof outlook.score === 'number' && outlook.rating
          ? `${outlook.score} - ${outlook.rating}`
          : 'Withheld';
      return `
        <article class="outlook-card outlook-card--${outlook.availability === 'available' ? 'available' : 'withheld'}">
          <span class="outlook-card__label">${outlook.label}</span>
          <strong>${title}</strong>
          <p class="muted">${outlook.explanation}</p>
        </article>
      `;
    })
    .join('');
}

function weatherConditionLabel(code) {
  if (code === null || code === undefined) return 'Condition unavailable';
  if (code === 0) return 'Clear';
  if ([1, 2].includes(code)) return 'Mostly clear';
  if (code === 3) return 'Overcast';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Mixed weather';
}

function hasCoordinates(point) {
  return Number.isFinite(point.latitude) && Number.isFinite(point.longitude);
}

function mapQueryUrl(point) {
  if (!hasCoordinates(point)) {
    return null;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(`${point.latitude},${point.longitude}`)}`;
}

function appleDirectionsUrl(putIn, takeOut) {
  if (!hasCoordinates(putIn) || !hasCoordinates(takeOut)) {
    return null;
  }

  return `https://maps.apple.com/?saddr=${encodeURIComponent(`${putIn.latitude},${putIn.longitude}`)}&daddr=${encodeURIComponent(`${takeOut.latitude},${takeOut.longitude}`)}&dirflg=d`;
}

function googleDirectionsUrl(putIn, takeOut) {
  if (!hasCoordinates(putIn) || !hasCoordinates(takeOut)) {
    return null;
  }

  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${putIn.latitude},${putIn.longitude}`)}&destination=${encodeURIComponent(`${takeOut.latitude},${takeOut.longitude}`)}`;
}

function openStreetMapSegmentUrl(putIn, takeOut) {
  const mappedPoints = [putIn, takeOut].filter(hasCoordinates);
  if (!mappedPoints.length) {
    return null;
  }

  const latitude =
    mappedPoints.reduce((sum, point) => sum + point.latitude, 0) / mappedPoints.length;
  const longitude =
    mappedPoints.reduce((sum, point) => sum + point.longitude, 0) / mappedPoints.length;

  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=12/${latitude}/${longitude}`;
}

function setLinkState(element, href, fallbackLabel) {
  if (!(element instanceof HTMLAnchorElement)) {
    return;
  }

  if (href) {
    element.href = href;
    element.hidden = false;
    return;
  }

  element.hidden = true;
  element.removeAttribute('href');
  if (fallbackLabel) {
    element.textContent = fallbackLabel;
  }
}

function setCopyButtonState(button, point, label) {
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const defaultLabel = button.dataset.defaultLabel || 'Copy coordinates';
  button.textContent = defaultLabel;

  if (hasCoordinates(point)) {
    button.hidden = false;
    button.disabled = false;
    button.dataset.copyValue = `${point.latitude}, ${point.longitude}`;
    button.dataset.copyLabel = label;
    return;
  }

  button.hidden = true;
  button.disabled = true;
  button.dataset.copyValue = '';
}

function renderActiveAccessContext() {
  const context = activeAccessContext;
  setElementText(activePutInName, context.putIn?.name || 'Check source links');
  setElementText(activeTakeOutName, context.takeOut?.name || 'Check source links');
  setElementText(
    activePutInNote,
    context.putInNote || 'Check parking, launch, and access rules on the ground.'
  );
  setElementText(
    activeTakeOutNote,
    context.takeOutNote || 'Check parking, launch, and access rules on the ground.'
  );
  setElementText(activeFactPutIn, context.putIn?.name || 'Check source links');
  setElementText(activeFactTakeOut, context.takeOut?.name || 'Check source links');
  setElementText(activeFactDistance, context.distanceLabel || 'Check source links');
  setElementText(activeFactMapMode, context.mapMode || 'Access points');

  setCopyButtonState(activePutInCopy, context.putIn, 'Put-in');
  setCopyButtonState(activeTakeOutCopy, context.takeOut, 'Take-out');

  setLinkState(accessPutInLink, mapQueryUrl(context.putIn));
  setLinkState(accessTakeOutLink, mapQueryUrl(context.takeOut));
  setLinkState(accessDirectionsGoogle, googleDirectionsUrl(context.putIn, context.takeOut));
  setLinkState(accessDirectionsApple, appleDirectionsUrl(context.putIn, context.takeOut));
  setLinkState(accessOpenStreetMap, openStreetMapSegmentUrl(context.putIn, context.takeOut));
}

async function copyCoordinates(button) {
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const value = String(button.dataset.copyValue || '').trim();
  const label = String(button.dataset.copyLabel || 'Coordinates').trim();
  if (!value) {
    return;
  }

  const original = button.dataset.defaultLabel || button.textContent || 'Copy coordinates';

  try {
    await navigator.clipboard.writeText(value);
    button.textContent = `${label} copied`;
  } catch (error) {
    console.error('Failed to copy coordinates.', error);
    button.textContent = 'Copy failed';
  }

  window.setTimeout(() => {
    button.textContent = original;
  }, 1600);
}

function bindCopyCoordinateButtons() {
  for (const button of copyCoordButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.copyBound === 'true') continue;
    button.dataset.copyBound = 'true';
    button.addEventListener('click', () => {
      copyCoordinates(button);
    });
  }
}

function initializeAccessPlanner() {
  if (!(accessPlanner instanceof HTMLElement)) {
    return;
  }

  if (accessPointData instanceof HTMLScriptElement) {
    try {
      plannerAccessPoints = JSON.parse(accessPointData.textContent || '[]');
    } catch (error) {
      console.error('Failed to parse access planner points.', error);
      plannerAccessPoints = [];
    }
  }

  if (
    !(accessPutInSelect instanceof HTMLSelectElement) ||
    !(accessTakeOutSelect instanceof HTMLSelectElement) ||
    plannerAccessPoints.length < 2
  ) {
    return;
  }

  const syncTakeOutOptions = () => {
    const putInIndex = plannerAccessPoints.findIndex((point) => point.id === accessPutInSelect.value);
    for (const option of Array.from(accessTakeOutSelect.options)) {
      const optionIndex = plannerAccessPoints.findIndex((point) => point.id === option.value);
      option.disabled = optionIndex <= putInIndex;
    }

    const selectedTakeOutIndex = plannerAccessPoints.findIndex((point) => point.id === accessTakeOutSelect.value);
    if (selectedTakeOutIndex <= putInIndex) {
      const next = plannerAccessPoints[putInIndex + 1];
      if (next) {
        accessTakeOutSelect.value = next.id;
      }
    }
  };

  const updatePlanner = () => {
    const start = plannerAccessPoints.find((point) => point.id === accessPutInSelect.value);
    const end = plannerAccessPoints.find((point) => point.id === accessTakeOutSelect.value);
    if (!start || !end) {
      return;
    }

    const distance = Math.max(0.1, Number((end.mileFromStart - start.mileFromStart).toFixed(1)));
    const paceFast = Math.max(0.5, distance / 3);
    const paceEasy = Math.max(paceFast + 0.25, distance / 2.2);
    const segmentKind =
      start.segmentKind === 'lake' && end.segmentKind === 'lake'
        ? 'Lake chain'
        : start.segmentKind === 'creek' && end.segmentKind === 'creek'
          ? 'Creek-focused'
          : 'Lake to creek';
    const stageLabel =
      distance < 4
        ? 'Short option'
        : distance < 9
          ? 'Half-day option'
          : 'Full route option';
    const shuttleText =
      distance < 5
        ? 'Short self-shuttle'
        : distance < 10
          ? 'Flexible self-shuttle'
          : 'Long self-shuttle';
    const summaryText = `${start.name} to ${end.name} is about ${distance.toFixed(1)} mi. ${segmentKind === 'Lake chain' ? 'This keeps you mostly on the lake chain.' : segmentKind === 'Creek-focused' ? 'This keeps the day mostly on the narrower downstream creek.' : 'This starts on the lakes and finishes on the narrower creek.'}`;
    const noteText = [start.note, end.note].filter(Boolean).join(' ');

    setElementText(accessDistance, `${distance.toFixed(1)} mi`);
    setElementText(accessShape, segmentKind);
    setElementText(accessTime, `About ${formatDuration(paceFast)} to ${formatDuration(paceEasy)}`);
    setElementText(accessStage, stageLabel);
    setElementText(accessShuttle, shuttleText);
    setElementText(accessNote, noteText || 'Use this to shorten the day without changing the river call.');
    setElementText(accessSummary, summaryText);

    activeAccessContext = {
      putIn: start,
      takeOut: end,
      distanceLabel: `${distance.toFixed(1)} mi`,
      putInNote: start.note || riverContext.defaultPutInNote,
      takeOutNote: end.note || riverContext.defaultTakeOutNote,
      mapMode: hasCoordinates(start) && hasCoordinates(end) ? 'Selected segment' : 'Selected segment (partial map)',
    };
    renderActiveAccessContext();
    renderDetailMap(latestResult);
  };

  accessPutInSelect.addEventListener('change', () => {
    syncTakeOutOptions();
    updatePlanner();
  });
  accessTakeOutSelect.addEventListener('change', updatePlanner);

  syncTakeOutOptions();
  updatePlanner();
}

function setElementText(element, value) {
  if (element instanceof HTMLElement) {
    element.textContent = value;
  }
}

function formatDuration(hours) {
  if (!Number.isFinite(hours) || hours <= 0) {
    return '0 hr';
  }

  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  if (whole <= 0) {
    return `${minutes} min`;
  }
  if (minutes === 0) {
    return `${whole} hr`;
  }
  return `${whole} hr ${minutes} min`;
}

function routeLineColor(result) {
  if (result?.rating === 'Strong' || result?.rating === 'Good') return '#2c8a54';
  if (result?.rating === 'Borderline') return '#ad752c';
  if (result?.rating === 'No-go') return '#bb5840';
  return '#1e7397';
}

function detailMapPopupMarkup(kind, point, result) {
  const kindLabel = kind === 'putIn' ? 'Put-in' : 'Take-out';
  const summary =
    typeof result?.score === 'number' && result?.rating
      ? `Today's call is ${result.score} - ${result.rating}. Confirm parking and access rules before you launch.`
      : 'Access reference only. Confirm parking and access rules before you launch.';
  const query = encodeURIComponent(`${point.latitude},${point.longitude}`);

  return `
    <article class="score-map-popup">
      <p class="score-map-popup__state">${escapeHtml(kindLabel)} | ${escapeHtml(riverContext.state)}</p>
      <h3>${escapeHtml(point.name)}</h3>
      <p class="score-map-popup__reach">${escapeHtml(riverContext.name)} | ${escapeHtml(riverContext.reach)}</p>
      <p class="score-map-popup__summary">${escapeHtml(summary)}</p>
      <a
        class="score-map-popup__link"
        href="https://www.google.com/maps?q=${query}"
        target="_blank"
        rel="noreferrer"
      >
        Open in Google Maps
      </a>
    </article>
  `;
}

async function renderDetailMap(result = null) {
  if (!(detailMap instanceof HTMLElement)) {
    return;
  }

  const accessContext = activeAccessContext;
  const points = [
    hasCoordinates(accessContext.putIn) ? { ...accessContext.putIn, kind: 'putIn' } : null,
    hasCoordinates(accessContext.takeOut) ? { ...accessContext.takeOut, kind: 'takeOut' } : null,
  ].filter(Boolean);

  if (!points.length) {
    if (detailMapStatus instanceof HTMLElement) {
      detailMapStatus.textContent =
        accessContext.mapMode === 'Selected segment (partial map)'
          ? 'Selected segment map is limited because one or more intermediate landing coordinates still need confirmation.'
          : 'Access map unavailable because endpoint coordinates are incomplete.';
    }
    return;
  }

  if (detailMapStatus instanceof HTMLElement && !detailMapRuntime) {
    detailMapStatus.textContent =
      accessContext.mapMode === 'Selected segment'
        ? 'Loading map tiles for the selected segment.'
        : 'Loading map tiles for the stored access points.';
  }

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) {
      return;
    }

    if (!detailMapRuntime) {
      const startingPoint = points[0];
      detailMapRuntime = new maplibregl.Map({
        container: detailMap,
        style: MAP_STYLE_URL,
        center: [startingPoint.longitude, startingPoint.latitude],
        zoom: 10.2,
        minZoom: 5,
        maxZoom: 14,
        attributionControl: true,
      });

      detailMapRuntime.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      await new Promise((resolve) => {
        if (detailMapRuntime.loaded()) {
          resolve();
          return;
        }
        detailMapRuntime.once('load', resolve);
      });
    }

    for (const marker of detailMapMarkers) {
      marker.remove();
    }
    detailMapMarkers = [];

    const routeLine = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: points.map((point) => [point.longitude, point.latitude]),
      },
    };

    if (points.length > 1) {
      if (detailMapRuntime.getSource('detail-route-line')) {
        detailMapRuntime.getSource('detail-route-line').setData(routeLine);
      } else {
        detailMapRuntime.addSource('detail-route-line', {
          type: 'geojson',
          data: routeLine,
        });
        detailMapRuntime.addLayer({
          id: 'detail-route-line',
          type: 'line',
          source: 'detail-route-line',
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': routeLineColor(result),
            'line-width': 4,
            'line-opacity': 0.88,
          },
        });
      }
      detailMapRuntime.setPaintProperty('detail-route-line', 'line-color', routeLineColor(result));
    } else if (detailMapRuntime.getLayer('detail-route-line')) {
      detailMapRuntime.removeLayer('detail-route-line');
      detailMapRuntime.removeSource('detail-route-line');
    }

    const bounds = new maplibregl.LngLatBounds();
    for (const point of points) {
      const markerNode = document.createElement('button');
      markerNode.type = 'button';
      markerNode.className = `detail-access-marker detail-access-marker--${point.kind === 'putIn' ? 'putin' : 'takeout'}`;
      markerNode.innerHTML = `<span>${point.kind === 'putIn' ? 'IN' : 'OUT'}</span>`;
      markerNode.setAttribute('aria-label', `${point.kind === 'putIn' ? 'Put-in' : 'Take-out'}: ${point.name}`);

      const marker = new maplibregl.Marker({
        element: markerNode,
        anchor: 'center',
      })
        .setLngLat([point.longitude, point.latitude])
        .setPopup(
          new maplibregl.Popup({
            offset: 18,
            closeButton: false,
            maxWidth: '280px',
          }).setHTML(detailMapPopupMarkup(point.kind, point, result))
        )
        .addTo(detailMapRuntime);

      bindMarkerPopup(marker, markerNode);
      detailMapMarkers.push(marker);
      bounds.extend([point.longitude, point.latitude]);
    }

    if (points.length > 1) {
      detailMapRuntime.fitBounds(bounds, {
        padding: { top: 44, right: 44, bottom: 44, left: 44 },
        maxZoom: 11.6,
        duration: 450,
      });
    } else {
      detailMapRuntime.easeTo({
        center: [points[0].longitude, points[0].latitude],
        zoom: 10.8,
        duration: 350,
      });
    }
    detailMapRuntime.resize();

    if (detailMapStatus instanceof HTMLElement) {
      if (accessContext.mapMode === 'Selected segment') {
        detailMapStatus.textContent =
          'Selected segment map is using the chosen put-in and take-out. Confirm parking and launch rules on the ground.';
      } else if (accessContext.mapMode === 'Selected segment (partial map)') {
        detailMapStatus.textContent =
          points.length > 1
            ? 'Selected segment map is partial because some intermediate landings still need confirmed coordinates.'
            : 'Selected segment map is limited because only one chosen landing has confirmed coordinates right now.';
      } else {
        detailMapStatus.textContent =
          points.length > 1
            ? 'Put-in and take-out markers come from carried-over route data. Confirm launch and parking rules on the ground.'
            : 'Only one carried-over access point is available for this reach right now.';
      }
    }
  } catch (error) {
    console.error('Failed to load detail map.', error);
    if (detailMapStatus instanceof HTMLElement) {
      detailMapStatus.textContent = 'Map unavailable right now. Use the access links above for location context.';
    }
  }
}

function parseChartSamples(result) {
  return (result.gauge?.recentSamples ?? [])
    .map((sample) => ({
      t: new Date(sample.observedAt).getTime(),
      v: sample.value,
    }))
    .filter((sample) => Number.isFinite(sample.t) && Number.isFinite(sample.v))
    .sort((left, right) => left.t - right.t);
}

function windowedSamples(parsedSamples, hours) {
  if (parsedSamples.length < 2) {
    return parsedSamples;
  }

  const latestTime = parsedSamples[parsedSamples.length - 1].t;
  const cutoff = latestTime - hours * 60 * 60 * 1000;
  const filtered = parsedSamples.filter((sample) => sample.t >= cutoff);
  return filtered.length >= 2 ? filtered : parsedSamples;
}

function chartWindowLabel(hours) {
  if (hours === 24) return '24 hours';
  if (hours === 72) return '72 hours';
  return '7 days';
}

function chartTimeLabel(timestamp, hours) {
  const options =
    hours <= 24
      ? { hour: 'numeric', minute: '2-digit' }
      : hours <= 72
        ? { weekday: 'short', hour: 'numeric' }
        : { month: 'short', day: 'numeric' };
  return new Date(timestamp).toLocaleString([], options).toLowerCase();
}

function updateChartButtonStates() {
  for (const button of chartButtons) {
    if (!(button instanceof HTMLButtonElement)) continue;
    const active = Number(button.dataset.chartWindow) === currentChartWindowHours;
    button.classList.toggle('segmented-control__button--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }
}

function trendNarrative(result, firstValue, lastValue, hours) {
  const delta = lastValue - firstValue;
  const windowLabel = chartWindowLabel(hours);
  const unit = result.gauge?.unit ?? result.river.gaugeSource.unit;
  const magnitude = formatGaugeValue(Math.abs(delta), unit);
  const band = result.gaugeBand;

  if (Math.abs(delta) < (unit === 'ft' ? 0.05 : Math.max(15, lastValue * 0.03))) {
    return `Fairly steady over the last ${windowLabel}.`;
  }

  if (delta > 0) {
    if (band === 'too-low' || band === 'low-shoulder' || band === 'minimum-met') {
      return `Rising ${magnitude} over the last ${windowLabel} and moving toward a better launch window.`;
    }
    if (band === 'too-high' || band === 'high-shoulder') {
      return `Still rising ${magnitude} over the last ${windowLabel}, which pushes this reach farther from the target band.`;
    }
    return `Rising ${magnitude} over the last ${windowLabel} while still sitting in the current target zone.`;
  }

  if (band === 'too-high' || band === 'high-shoulder') {
    return `Dropping ${magnitude} over the last ${windowLabel} and trending back toward the preferred window.`;
  }
  if (band === 'too-low' || band === 'low-shoulder' || band === 'minimum-met') {
    return `Dropping ${magnitude} over the last ${windowLabel}, which increases low-water risk.`;
  }
  return `Dropping ${magnitude} over the last ${windowLabel} while still inside today's workable band.`;
}

function renderGaugeChart(result) {
  const parsedSamples = parseChartSamples(result);
  const activeSamples = windowedSamples(parsedSamples, currentChartWindowHours);
  const lineEl = root.querySelector('[data-chart-line]');
  const dotEl = root.querySelector('[data-chart-dot]');
  const rangeEl = root.querySelector('[data-chart-range]');
  const thresholdEl = root.querySelector('[data-chart-threshold]');
  const yMaxEl = root.querySelector('[data-chart-y-max]');
  const yMidEl = root.querySelector('[data-chart-y-mid]');
  const yMinEl = root.querySelector('[data-chart-y-min]');
  const xStartEl = root.querySelector('[data-chart-x-start]');
  const xMidEl = root.querySelector('[data-chart-x-mid]');
  const xEndEl = root.querySelector('[data-chart-x-end]');

  updateChartButtonStates();

  if (
    !(lineEl instanceof SVGPathElement) ||
    !(dotEl instanceof SVGCircleElement) ||
    !(rangeEl instanceof SVGRectElement) ||
    !(thresholdEl instanceof SVGLineElement)
  ) {
    return;
  }

  if (activeSamples.length < 2) {
    setText('chart-caption', 'Not enough recent USGS history is available to draw a trend chart yet.');
    setText('chart-trend-note', 'Trend direction is unavailable because the recent sample window is too thin.');
    rangeEl.setAttribute('visibility', 'hidden');
    thresholdEl.setAttribute('visibility', 'hidden');
    return;
  }

  const xLeft = 62;
  const xRight = 392;
  const yTop = 24;
  const yBottom = 178;

  const thresholdValues = [
    result.river.profile.idealMin,
    result.river.profile.idealMax,
    result.river.profile.tooLow,
    result.river.profile.tooHigh,
  ].filter((value) => typeof value === 'number' && Number.isFinite(value));

  let minValue = Math.min(
    ...activeSamples.map((sample) => sample.v),
    ...(thresholdValues.length ? thresholdValues : [Infinity])
  );
  let maxValue = Math.max(
    ...activeSamples.map((sample) => sample.v),
    ...(thresholdValues.length ? thresholdValues : [-Infinity])
  );

  if (!Number.isFinite(minValue) || !Number.isFinite(maxValue)) {
    setText('chart-caption', 'Recent gauge history is unavailable right now.');
    setText('chart-trend-note', 'Trend direction is unavailable because the current gauge history could not be read.');
    return;
  }

  if (Math.abs(maxValue - minValue) < 0.0001) {
    const pad = Math.max(0.5, Math.abs(maxValue) * 0.04);
    minValue -= pad;
    maxValue += pad;
  } else {
    const pad = (maxValue - minValue) * 0.12;
    minValue -= pad;
    maxValue += pad;
  }

  const t0 = activeSamples[0].t;
  const t1 = activeSamples[activeSamples.length - 1].t;

  const x = (timestamp) => xLeft + ((timestamp - t0) / Math.max(t1 - t0, 1)) * (xRight - xLeft);
  const y = (value) => yBottom - ((value - minValue) / Math.max(maxValue - minValue, 0.0001)) * (yBottom - yTop);

  const d = activeSamples
    .map((sample, index) => `${index === 0 ? 'M' : 'L'}${x(sample.t).toFixed(2)} ${y(sample.v).toFixed(2)}`)
    .join(' ');

  lineEl.setAttribute('d', d);
  dotEl.setAttribute('cx', x(activeSamples[activeSamples.length - 1].t).toFixed(2));
  dotEl.setAttribute('cy', y(activeSamples[activeSamples.length - 1].v).toFixed(2));

  const axisFormat = (value) =>
    result.gauge?.unit === 'ft'
      ? value.toFixed(2).replace(/\.00$/, '')
      : Math.round(value).toLocaleString('en-US');

  if (yMaxEl instanceof SVGTextElement) yMaxEl.textContent = axisFormat(maxValue);
  if (yMidEl instanceof SVGTextElement) yMidEl.textContent = axisFormat((maxValue + minValue) / 2);
  if (yMinEl instanceof SVGTextElement) yMinEl.textContent = axisFormat(minValue);

  if (xStartEl instanceof SVGTextElement) xStartEl.textContent = chartTimeLabel(t0, currentChartWindowHours);
  if (xMidEl instanceof SVGTextElement) {
    xMidEl.textContent = chartTimeLabel(t0 + (t1 - t0) / 2, currentChartWindowHours);
  }
  if (xEndEl instanceof SVGTextElement) xEndEl.textContent = chartTimeLabel(t1, currentChartWindowHours);

  setText(
    'chart-trend-note',
    trendNarrative(result, activeSamples[0].v, activeSamples[activeSamples.length - 1].v, currentChartWindowHours)
  );

  if (
    result.river.profile.thresholdModel === 'two-sided' &&
    typeof result.river.profile.idealMin === 'number' &&
    typeof result.river.profile.idealMax === 'number'
  ) {
    const topValue = Math.max(result.river.profile.idealMin, result.river.profile.idealMax);
    const bottomValue = Math.min(result.river.profile.idealMin, result.river.profile.idealMax);
    const topY = Math.max(yTop, Math.min(yBottom, y(topValue)));
    const bottomY = Math.max(yTop, Math.min(yBottom, y(bottomValue)));

    rangeEl.setAttribute('x', String(xLeft));
    rangeEl.setAttribute('y', String(topY));
    rangeEl.setAttribute('width', String(xRight - xLeft));
    rangeEl.setAttribute('height', String(Math.max(1, bottomY - topY)));
    rangeEl.setAttribute('visibility', 'visible');
    thresholdEl.setAttribute('visibility', 'hidden');
    setText(
      'chart-caption',
      `The shaded band marks the preferred ${formatGaugeValue(result.river.profile.idealMin, result.gauge.unit)} to ${formatGaugeValue(result.river.profile.idealMax, result.gauge.unit)} window across the last ${chartWindowLabel(currentChartWindowHours)}.`
    );
    return;
  }

  if (typeof result.river.profile.tooLow === 'number') {
    const thresholdY = Math.max(yTop, Math.min(yBottom, y(result.river.profile.tooLow)));
    thresholdEl.setAttribute('x1', String(xLeft));
    thresholdEl.setAttribute('x2', String(xRight));
    thresholdEl.setAttribute('y1', String(thresholdY));
    thresholdEl.setAttribute('y2', String(thresholdY));
    thresholdEl.setAttribute('visibility', 'visible');
    rangeEl.setAttribute('visibility', 'hidden');
    setText(
      'chart-caption',
      `The dashed line marks the published low-water floor at ${formatGaugeValue(result.river.profile.tooLow, result.gauge.unit)}. Upper-range guidance is still incomplete.`
    );
    return;
  }

  rangeEl.setAttribute('visibility', 'hidden');
  thresholdEl.setAttribute('visibility', 'hidden');
  setText('chart-caption', 'Recent gauge movement is available, but threshold overlays are not calibrated yet.');
}

function bindChartControls() {
  for (const button of chartButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.chartBound === 'true') continue;
    button.dataset.chartBound = 'true';
    button.addEventListener('click', () => {
      currentChartWindowHours = Number(button.dataset.chartWindow) || 72;
      updateChartButtonStates();
      if (latestResult) {
        renderGaugeChart(latestResult);
      }
    });
  }
}

function renderWeatherVisual(weather) {
  if (!weather) {
    setText('weather-condition', 'Weather unavailable');
    setText('weather-temp', 'Unavailable');
    setText('weather-wind', 'Unavailable');
    setText('weather-rain-risk', 'Unavailable');
    setText('weather-storm-risk', 'Unavailable');
    return;
  }

  setText('weather-condition', weatherConditionLabel(weather.weatherCode));
  setText('weather-temp', weather.temperatureF !== null ? `${Math.round(weather.temperatureF)} F` : 'Unavailable');
  setText(
    'weather-wind',
    weather.windMph !== null
      ? `${Math.round(weather.windMph)} mph${weather.gustMph !== null ? ` gust ${Math.round(weather.gustMph)}` : ''}`
      : 'Unavailable'
  );
  setText(
    'weather-rain-risk',
    weather.next12hPrecipProbabilityMax !== null
      ? `${Math.round(weather.next12hPrecipProbabilityMax)}% next 12h`
      : 'Unavailable'
  );
  setText('weather-storm-risk', weather.next12hStormRisk ? 'Storm signal present' : 'No storm signal');
}

async function loadDetail({ silent = false } = {}) {
  if (!silent) {
    setDetailRefreshState('loading');
  }

  try {
    const response = await fetch(`/api/rivers/${encodeURIComponent(slug)}.json`, {
      headers: {
        accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed for /api/rivers/${slug}.json: HTTP ${response.status}`);
    }

    const payload = await response.json();
    const result = payload?.result;
    if (!result) return;
    latestResult = result;

    const ratingKey = ratingToneKey(result.rating);
    const decision = decisionLabel(result.rating);

    setText('score', String(result.score));
    setText('rating', ratingLabel(result.rating));
    setText('explanation', result.explanation);
    setText('decision-line', decisionStatement(result.rating));

    root.classList.add(`river-detail--${ratingKey}`);

    const orb = root.querySelector('.score-orb');
    if (orb instanceof HTMLElement) {
      orb.classList.add(`score-orb--${ratingKey}`);
    }

    const decisionPill = setText('decision', decision);
    decorateDecision(decisionPill, result.rating);

    const confidence = setText(
      'confidence',
      `Confidence ${result.confidence.label} (${result.confidence.score}/100)`
    );
    if (confidence instanceof HTMLElement) {
      confidence.classList.remove('confidence-pill--high', 'confidence-pill--medium', 'confidence-pill--low');
      confidence.classList.add(`confidence-pill--${result.confidence.label.toLowerCase()}`);
    }

    const dataStatus = setText('data-status', `Reads ${result.liveData.overall}`);
    if (dataStatus instanceof HTMLElement) {
      dataStatus.classList.remove('data-status-pill--live', 'data-status-pill--degraded', 'data-status-pill--offline');
      dataStatus.classList.add(`data-status-pill--${result.liveData.overall}`);
    }

    setText('flow-band', result.gaugeBandLabel);
    setText(
      'gauge-now',
      result.gauge
        ? `${result.gauge.current.toFixed(result.gauge.unit === 'ft' ? 2 : 0)} ${result.gauge.unit}`
        : 'Unavailable'
    );
    setText(
      'observed-at',
      result.gauge?.observedAt ? new Date(result.gauge.observedAt).toLocaleString() : 'Unavailable'
    );
    setText(
      'generated-at',
      result.generatedAt ? new Date(result.generatedAt).toLocaleString() : 'Unavailable'
    );
    setText('gauge-freshness', result.liveData.gauge.detail);
    setText(
      'trend',
      result.gauge?.delta24h !== null && result.gauge
        ? `${result.gauge.trend} (${result.gauge.delta24h >= 0 ? '+' : ''}${result.gauge.delta24h.toFixed(result.gauge.unit === 'ft' ? 2 : 0)} ${result.gauge.unit})`
        : 'Unavailable'
    );
    setText(
      'weather-now',
      result.weather
        ? `${Math.round(result.weather.windMph ?? 0)} mph wind, ${Math.round(result.weather.next12hPrecipProbabilityMax ?? 0)}% rain risk`
        : 'Unavailable'
    );
    setText('weather-freshness', result.liveData.weather.detail);

    renderDetailBanner(result);
    renderLaunchReadiness(result);
    renderGaugeChart(result);
    renderWeatherVisual(result.weather);
    renderDetailMap(result);

    renderFactors(result.factors);
    renderChecklist(result.checklist);
    renderOutlooks(result.outlooks);
    renderConfidenceDetail(result.confidence);
    renderScoreBreakdown(result);
    lastDetailSuccessAt = Date.now();
    hasLoadedDetailOnce = true;
    setDetailFetchBannerState('hidden');
    setDetailRefreshState('ready');
  } catch (error) {
    console.error('Failed to load river score on detail page.', error);
    setDetailFetchBannerState(
      hasLoadedDetailOnce ? 'refresh' : 'initial',
      'This river call could not refresh. Retry the page, then verify the source if the problem continues.'
    );
    setDetailRefreshState('error', 'Last refresh failed. Retry now.');

    if (hasLoadedDetailOnce) {
      return;
    }

    setText(
      'explanation',
      'Live reads are unavailable right now. Use the source links below to verify this river.'
    );
    setText('decision-line', 'Check the source directly because live data is unavailable.');

    const decisionPill = setText('decision', 'Check sources');
    if (decisionPill instanceof HTMLElement) {
      decisionPill.classList.add('decision-pill--skip');
    }

    const dataStatus = setText('data-status', 'Reads offline');
    if (dataStatus instanceof HTMLElement) {
      dataStatus.classList.add('data-status-pill--offline');
    }

    setText('flow-band', 'Unavailable');
    setText('gauge-now', 'Unavailable');
    setText('observed-at', 'Unavailable');
    setText('generated-at', 'Unavailable');
    setText('gauge-freshness', 'No live gauge reading is available.');
    setText('trend', 'Unavailable');
    setText('weather-now', 'Unavailable');
    setText('weather-freshness', 'No live weather reading is available.');
    setText('chart-caption', 'Gauge chart unavailable because live data could not be loaded.');
    setText('chart-trend-note', 'Trend direction is unavailable because the live chart data could not be loaded.');
    setText('weather-condition', 'Weather unavailable');
    setText('weather-temp', 'Unavailable');
    setText('weather-wind', 'Unavailable');
    setText('weather-rain-risk', 'Unavailable');
    setText('weather-storm-risk', 'Unavailable');
    if (detailStatusBanner instanceof HTMLElement) {
      renderDetailBanner({
        liveData: {
          overall: 'offline',
          summary: 'Direct gauge data is unavailable, so this river needs a direct source check.',
          gauge: {
            state: 'unavailable',
            detail: 'No live gauge reading is available.',
          },
          weather: {
            state: 'unavailable',
            detail: 'No live weather reading is available.',
          },
        },
        checklist: [
          { status: 'skip', label: 'Gauge window', detail: 'The direct gauge could not be loaded.' },
          { status: 'watch', label: 'Skill and access', detail: 'Use the source links and access notes below.' },
        ],
        rating: 'No-go',
        score: 0,
        gaugeBandLabel: 'Unavailable',
        gauge: null,
        weather: null,
        river: {
          profile: {
            difficulty: 'moderate',
          },
        },
      });
    }
    if (readinessGrid instanceof HTMLElement) {
      renderLaunchReadiness({
        liveData: {
          overall: 'offline',
          summary: 'Direct gauge data is unavailable, so this river needs a direct source check.',
        },
        checklist: [
          { status: 'skip', label: 'Gauge window', detail: 'The direct gauge could not be loaded.' },
          { status: 'watch', label: 'Trend check', detail: 'Trend direction is unavailable because the gauge is offline.' },
          { status: 'watch', label: 'Weather window', detail: 'Weather coverage should be verified separately.' },
          { status: 'watch', label: 'Skill and access', detail: 'Use the source links and access notes below.' },
        ],
        rating: 'No-go',
        score: 0,
        gaugeBandLabel: 'Unavailable',
        gauge: null,
        weather: null,
        river: {
          profile: {
            difficulty: 'moderate',
          },
        },
      });
    }
    renderDetailMap(null);
    renderChecklist([
      {
        status: 'skip',
        label: 'Live data',
        detail: 'The direct gauge could not be loaded, so treat this river as unconfirmed right now.',
      },
      {
        status: 'watch',
        label: 'Access',
        detail: 'Use the source links and map links below to confirm put-in and take-out details.',
      },
    ]);
    renderOutlooks([
      {
        label: 'Tomorrow',
        availability: 'withheld',
        score: null,
        rating: null,
        confidence: null,
        explanation: 'Tomorrow is withheld because the live river read could not be loaded.',
      },
      {
        label: 'Weekend',
        availability: 'withheld',
        score: null,
        rating: null,
        confidence: null,
        explanation: 'Weekend is withheld because the live river read could not be loaded.',
      },
    ]);
    renderConfidenceDetail({
      label: 'Low',
      reasons: [],
      warnings: ['Confidence is unavailable because live data could not be loaded.'],
    });
  }
}

bindChartControls();
bindCopyCoordinateButtons();
initializeAccessPlanner();
renderActiveAccessContext();
updateChartButtonStates();
renderDetailMap(null);
if (detailRefreshButton instanceof HTMLButtonElement) {
  detailRefreshButton.addEventListener('click', () => {
    loadDetail();
  });
}
loadDetail();
window.setInterval(() => {
  loadDetail({ silent: true });
}, AUTO_REFRESH_MS);

