import { escapeHtml } from './map-runtime.js';
import { joinWithBullet } from './board-domain.js';
import { ratingDisplayLabel } from './ui-taxonomy.js';
import {
  breakdownValueToneClass,
  cardLinkLabel,
  cardSummary,
  favoriteRecordForItem,
  friendlyCapReason,
  liveReadWarning,
  metaLineText,
  parseRawSignalLine,
  rawSignalLine,
  ratingToneKey,
  recommendationSlotLabel,
  recommendationSummaryText,
  recommendationTagLabels,
  recommendationVerdict,
  regionStateText,
  signedPoints,
  summaryParts,
  weatherVisualLabel,
  weatherVisualState,
} from './board-presenters.js';

function queryWithin(scope, selector) {
  if (!scope || typeof scope.querySelector !== 'function') {
    return null;
  }

  return scope.querySelector(selector);
}

function setScopedText(scope, selector, value) {
  const element = queryWithin(scope, selector);
  if (element instanceof HTMLElement) {
    element.textContent = value;
    return element;
  }

  return null;
}

export function scoreBreakdownDisclosureViewModel(breakdown) {
  if (!breakdown) {
    return null;
  }

  const rows = [
    { label: 'River quality', value: breakdown.riverQuality },
    { label: 'Wind', value: breakdown.windAdjustment },
    { label: 'Temperature', value: breakdown.temperatureAdjustment },
    { label: 'Rain timing', value: breakdown.rainAdjustment },
  ];
  if (breakdown.comfortAdjustment !== 0) {
    rows.push({ label: 'Other', value: breakdown.comfortAdjustment });
  }

  return {
    summary: `River conditions started this at ${breakdown.riverQuality}. Weather moved it to ${breakdown.finalScore} today.`,
    rows,
    capReasons: Array.isArray(breakdown.capReasons)
      ? breakdown.capReasons.map((reason) => friendlyCapReason(reason))
      : [],
  };
}

export function renderScoreBreakdownDisclosure(scope, breakdown) {
  const disclosure = queryWithin(scope, '[data-score-breakdown]');
  if (!(disclosure instanceof HTMLElement)) {
    return;
  }

  const rows = queryWithin(scope, '[data-score-breakdown-rows]');
  const capsWrap = queryWithin(scope, '[data-score-breakdown-caps-wrap]');
  const caps = queryWithin(scope, '[data-score-breakdown-caps]');
  const viewModel = scoreBreakdownDisclosureViewModel(breakdown);

  if (!viewModel) {
    disclosure.hidden = true;
    if (disclosure instanceof HTMLDetailsElement) {
      disclosure.open = false;
    }
    if (rows instanceof HTMLElement) {
      rows.innerHTML = '';
    }
    if (caps instanceof HTMLElement) {
      caps.innerHTML = '';
    }
    if (capsWrap instanceof HTMLElement) {
      capsWrap.hidden = true;
    }
    return;
  }

  disclosure.hidden = false;
  setScopedText(scope, '[data-score-breakdown-summary]', viewModel.summary);

  if (rows instanceof HTMLElement) {
    rows.innerHTML = viewModel.rows
      .map(
        (row) => `
          <article class="river-score-tooltip__row">
            <span class="river-score-tooltip__label">${escapeHtml(row.label)}</span>
            <strong class="river-score-tooltip__value ${breakdownValueToneClass(row.value)}">${escapeHtml(signedPoints(row.value))}</strong>
          </article>
        `,
      )
      .join('');
  }

  if (caps instanceof HTMLElement) {
    caps.innerHTML = viewModel.capReasons
      .map((reason) => `<li>${escapeHtml(reason)}</li>`)
      .join('');
  }
  if (capsWrap instanceof HTMLElement) {
    capsWrap.hidden = viewModel.capReasons.length === 0;
  }
}

function setCardText(scope, field, value) {
  const nodes = Array.from(scope.querySelectorAll(`[data-field="${field}"]`));
  for (const node of nodes) {
    node.textContent = value;
  }
  return nodes[0] ?? null;
}

export function recommendationCardViewModel(
  item,
  index,
  nearbyReady,
  {
    latestResults,
    featuredRouteLabelForItem,
    includeRouteType = false,
  },
) {
  return {
    ratingKey: ratingToneKey(item.cardRoute.rating),
    slot: index === 0 ? "Today's Best" : recommendationSlotLabel(index, nearbyReady),
    kind: item.kind === 'group' ? 'River · top stretch score' : 'Route score',
    state: regionStateText(item),
    route: featuredRouteLabelForItem(item),
    summary: recommendationSummaryText(item, nearbyReady, latestResults),
    score: String(item.cardRoute.score),
    rating: ratingDisplayLabel(item.cardRoute.rating, {
      liveData: item.cardRoute.liveData,
    }),
    verdict: recommendationVerdict(item, index, nearbyReady),
    meta: metaLineText(item, nearbyReady, { includeRouteType }),
    liveLabel: index === 0 ? 'Live conditions right now' : '',
  };
}

function decorateRecommendationLink(link, item, { title = false } = {}) {
  if (!(link instanceof HTMLAnchorElement)) {
    return;
  }

  link.href = item.link;
  link.textContent = title ? item.cardRoute.river.name : cardLinkLabel(item);
  link.dataset.analyticsEvent = item.selectedSegment ? 'Open route planner' : 'Open route';
  link.dataset.analyticsLabel = item.selectedSegment
    ? 'segment-filter'
    : item.kind === 'group'
      ? 'river'
      : 'route';
  link.dataset.analyticsRoute = item.cardRoute.river.slug;
  link.dataset.analyticsRiver = item.cardRoute.river.name;
  link.dataset.analyticsState = item.cardRoute.river.state;
  link.dataset.analyticsRegion = item.cardRoute.river.region;
}

export function createBoardRecommendationCardRenderer({
  template,
  getLatestResults,
  featuredRouteLabelForItem,
  supportingReasonList,
  decorateFavoriteButton,
  includeRouteType = false,
  documentObject = document,
}) {
  return function createRecommendationCard(item, index, nearbyReady) {
    if (!(template instanceof HTMLTemplateElement)) {
      return documentObject.createElement('div');
    }

    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector('.recommendation-card');
    if (!(card instanceof HTMLElement)) {
      return documentObject.createElement('div');
    }

    const viewModel = recommendationCardViewModel(item, index, nearbyReady, {
      latestResults: getLatestResults(),
      featuredRouteLabelForItem,
      includeRouteType,
    });
    card.classList.add(`recommendation-card--${viewModel.ratingKey}`);
    card.classList.add(
      item.kind === 'group'
        ? 'recommendation-card--group'
        : 'recommendation-card--route',
    );
    if (index === 0) {
      card.classList.add('recommendation-card--featured');
    }

    setCardText(card, 'recommendation-slot', viewModel.slot);
    setCardText(card, 'recommendation-kind', viewModel.kind);
    setCardText(card, 'recommendation-state', viewModel.state);
    setCardText(card, 'recommendation-route', viewModel.route);
    setCardText(card, 'recommendation-summary', viewModel.summary);
    setCardText(card, 'recommendation-score', viewModel.score);
    setCardText(card, 'recommendation-rating', viewModel.rating);
    setCardText(card, 'recommendation-verdict', viewModel.verdict);
    setCardText(card, 'recommendation-meta', viewModel.meta);
    setCardText(card, 'recommendation-live-label', viewModel.liveLabel);
    renderScoreBreakdownDisclosure(card, item.cardRoute.scoreBreakdown);

    const reasons = card.querySelector('[data-field="recommendation-reasons"]');
    if (reasons instanceof HTMLElement) {
      reasons.innerHTML = supportingReasonList(item, nearbyReady)
        .map((reason) => `<li>${escapeHtml(reason)}</li>`)
        .join('');
      reasons.hidden = reasons.innerHTML === '';
    }

    const orb = card.querySelector('.score-orb');
    if (orb instanceof HTMLElement) {
      orb.classList.add(`score-orb--${viewModel.ratingKey}`);
    }

    const signal = card.querySelector('[data-field="recommendation-signal"]');
    if (signal instanceof HTMLElement) {
      signal.innerHTML = signalRowMarkup(item);
    }

    const tags = card.querySelector('[data-field="recommendation-tags"]');
    if (tags instanceof HTMLElement) {
      tags.innerHTML = renderTagMarkup(recommendationTagLabels(item, nearbyReady));
      tags.hidden = tags.innerHTML.trim().length === 0;
    }

    const weather = card.querySelector('[data-field="recommendation-weather"]');
    if (weather instanceof HTMLElement) {
      weather.innerHTML = weatherBadgeMarkup(item, 'card-weather-badge--compact');
      weather.hidden = false;
    }

    const liveLabel = card.querySelector('[data-field="recommendation-live-label"]');
    if (liveLabel instanceof HTMLElement) {
      liveLabel.hidden = index !== 0;
    }

    const detailCopy = card.querySelector('[data-field="recommendation-full"]');
    if (detailCopy instanceof HTMLElement) {
      detailCopy.textContent =
        item.cardRoute.explanation
        || item.cardRoute.summary?.shortExplanation
        || '';
    }

    const sources = card.querySelector('[data-field="recommendation-sources"]');
    if (sources instanceof HTMLElement) {
      sources.innerHTML = renderSourceBadges(item);
    }

    const details = card.querySelector('.recommendation-card__details');
    if (details instanceof HTMLElement) {
      const hasDetailCopy =
        detailCopy instanceof HTMLElement && detailCopy.textContent.trim().length > 0;
      const hasSources =
        sources instanceof HTMLElement && sources.innerHTML.trim().length > 0;
      details.hidden = !hasDetailCopy && !hasSources;
    }

    decorateRecommendationLink(
      card.querySelector('[data-field="recommendation-link"]'),
      item,
    );
    decorateRecommendationLink(
      card.querySelector('[data-field="recommendation-title-link"]'),
      item,
      { title: true },
    );
    decorateFavoriteButton(
      card.querySelector('[data-favorite-button]'),
      favoriteRecordForItem(item),
    );
    return card;
  };
}

export function createBoardRecommendationGridRenderer({
  container,
  createRecommendationCard,
  refreshFavoriteButtons,
  documentObject = document,
}) {
  return function renderRecommendationGrid(items, nearbyReady) {
    if (!(container instanceof HTMLElement)) {
      return;
    }

    container.innerHTML = '';
    const fragment = documentObject.createDocumentFragment();
    items.forEach((item, index) => {
      fragment.appendChild(createRecommendationCard(item, index, nearbyReady));
    });
    container.appendChild(fragment);
    refreshFavoriteButtons(container);
  };
}

export function riverCardViewModel(
  item,
  showDistance,
  {
    latestResults,
    routeLabelForItem,
    segmentLabelForItem,
    metaLine = (currentItem, currentShowDistance) =>
      metaLineText(currentItem, currentShowDistance),
  },
) {
  return {
    ratingKey: ratingToneKey(item.cardRoute.rating),
    kind: item.kind === 'group' ? 'River · top stretch score' : 'Route score',
    state: regionStateText(item),
    route: routeLabelForItem(item),
    segment: segmentLabelForItem(item),
    score: String(item.cardRoute.score),
    rating: ratingDisplayLabel(item.cardRoute.rating, {
      liveData: item.cardRoute.liveData,
      compact: true,
    }),
    verdict: recommendationVerdict(item),
    meta: metaLine(item, showDistance),
    summary: recommendationSummaryText(item, showDistance, latestResults),
  };
}

export function createBoardRiverCardRenderer({
  template,
  getLatestResults,
  routeLabelForItem,
  segmentLabelForItem,
  decorateFavoriteButton,
  metaLine,
  factsMarkup = null,
  datasetKey,
  clearCardSlot = false,
  onCardOpen = null,
  documentObject = document,
}) {
  return function createCard(item, { showDistance = false, compact = false } = {}) {
    if (!(template instanceof HTMLTemplateElement)) {
      return documentObject.createElement('div');
    }

    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector('.river-card');
    if (!(card instanceof HTMLElement)) {
      return documentObject.createElement('div');
    }

    const viewModel = riverCardViewModel(item, showDistance, {
      latestResults: getLatestResults(),
      routeLabelForItem,
      segmentLabelForItem,
      metaLine,
    });
    card.classList.add(`river-card--${viewModel.ratingKey}`);
    if (compact) {
      card.classList.add('river-card--compact');
    }
    card.classList.add(
      item.kind === 'group' ? 'river-card--group' : 'river-card--route',
    );
    if (datasetKey) {
      card.dataset[datasetKey] = item.key;
    }

    setCardText(card, 'card-kind', viewModel.kind);
    setCardText(card, 'state', viewModel.state);
    setCardText(card, 'route-label', viewModel.route);
    setCardText(card, 'segment-label', viewModel.segment);
    const segmentLabel = card.querySelector('[data-field="segment-label"]');
    if (segmentLabel instanceof HTMLElement) {
      segmentLabel.hidden = !viewModel.segment;
    }
    setCardText(card, 'score', viewModel.score);
    setCardText(card, 'rating', viewModel.rating);
    setCardText(card, 'card-verdict', viewModel.verdict);
    setCardText(card, 'meta-line', viewModel.meta);
    setCardText(card, 'card-summary-main', viewModel.summary);
    if (clearCardSlot) {
      setCardText(card, 'card-slot', '');
    }

    const warning = card.querySelector('[data-field="card-warning"]');
    const liveWarning = liveReadWarning(item.cardRoute);
    if (warning instanceof HTMLElement) {
      warning.hidden = !liveWarning;
      warning.textContent = liveWarning?.short || '';
      warning.title = liveWarning?.detail || '';
      if (liveWarning?.detail) {
        warning.dataset.tooltip = liveWarning.detail;
        warning.tabIndex = 0;
      } else {
        delete warning.dataset.tooltip;
        warning.tabIndex = -1;
      }
      warning.setAttribute('aria-label', liveWarning?.detail || '');
    }

    const confidence = card.querySelector('.river-card__confidence');
    if (confidence instanceof HTMLElement) {
      confidence.classList.remove(
        'river-card__confidence--high',
        'river-card__confidence--medium',
        'river-card__confidence--low',
      );
      confidence.classList.add(
        `river-card__confidence--${item.cardRoute.confidence.label.toLowerCase()}`,
      );
    }

    const signalRow = card.querySelector('[data-field="raw-signal"]');
    if (signalRow instanceof HTMLElement) {
      signalRow.innerHTML = signalRowMarkup(item);
    }

    if (factsMarkup) {
      const facts = card.querySelector('[data-field="card-facts"]');
      const factsSection = card.querySelector('[data-field="card-facts-section"]');
      if (facts instanceof HTMLElement) {
        const markup = factsMarkup(item, showDistance);
        facts.innerHTML = markup;
        facts.hidden = !markup;
        if (factsSection instanceof HTMLElement) {
          factsSection.hidden = !markup;
        }
      }
    }

    const weather = card.querySelector('[data-field="card-weather"]');
    if (weather instanceof HTMLElement) {
      weather.innerHTML = weatherBadgeMarkup(item);
      weather.hidden = false;
    }

    const orb = card.querySelector('.score-orb');
    if (orb instanceof HTMLElement) {
      orb.classList.add(`score-orb--${viewModel.ratingKey}`);
    }

    decorateRecommendationLink(
      card.querySelector('[data-card-link]'),
      item,
    );
    decorateRecommendationLink(
      card.querySelector('[data-field="card-title-link"]'),
      item,
      { title: true },
    );
    decorateFavoriteButton(
      card.querySelector('[data-favorite-button]'),
      favoriteRecordForItem(item),
    );

    if (onCardOpen) {
      card.addEventListener('click', (event) => {
        const target = event.target;
        if (
          !(target instanceof Element)
          || target.closest('a, button, input, select, textarea, label')
        ) {
          return;
        }
        onCardOpen(item);
      });
    }

    return card;
  };
}

export function createBoardCardGridRenderer({
  createCard,
  refreshFavoriteButtons,
  onRendered = () => {},
  documentObject = document,
}) {
  return function renderCardGrid(container, items, options = {}) {
    if (!(container instanceof HTMLElement)) {
      return;
    }

    container.innerHTML = '';
    const fragment = documentObject.createDocumentFragment();
    for (const item of items) {
      fragment.appendChild(createCard(item, options));
    }
    container.appendChild(fragment);
    refreshFavoriteButtons(container);
    onRendered(container, options);
  };
}

export function signalIconMarkup(kind) {
  switch (kind) {
    case 'gauge':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 15c2.2 0 2.2-3 4.4-3s2.2 3 4.4 3 2.2-3 4.4-3 2.2 3 4.4 3"></path>
          <path d="M3 19c2.2 0 2.2-3 4.4-3s2.2 3 4.4 3 2.2-3 4.4-3 2.2 3 4.4 3"></path>
        </svg>
      `;
    case 'wind':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 9h10a2.5 2.5 0 1 0-2.5-2.5"></path>
          <path d="M3 13h14a2.5 2.5 0 1 1-2.5 2.5"></path>
          <path d="M5 17h7"></path>
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0Z"></path>
          <path d="M12 9v8"></path>
        </svg>
      `;
  }
}

export function signalRowMarkup(item) {
  const items = parseRawSignalLine(rawSignalLine(item));

  if (items.length === 0) {
    return '<span class="river-card__signal-empty">Conditions loading</span>';
  }

  return items
    .map(
      (signal) => `
        <span class="river-card__signal-item">
          <span class="river-card__signal-icon river-card__signal-icon--${signal.kind}">
            ${signalIconMarkup(signal.kind)}
          </span>
          <span>${signal.value}</span>
        </span>
      `
    )
    .join('');
}

export function weatherVisualMarkup(state) {
  const label = weatherVisualLabel(state);

  switch (state) {
    case 'storm':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M7 15.5a4 4 0 1 1 .9-7.9A5 5 0 0 1 18 9.5a3.5 3.5 0 1 1-.5 7H7Z"></path>
          <path d="m12 15 2 0-1.4 3H15l-3 4 1-3h-2Z"></path>
        </svg>
      `;
    case 'rain':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M7 16a4 4 0 1 1 .9-7.9A5 5 0 0 1 18 10a3.5 3.5 0 1 1-.5 7H7Z"></path>
          <path d="M9 18.5l-.8 2"></path>
          <path d="M13 18.5l-.8 2"></path>
          <path d="M17 18.5l-.8 2"></path>
        </svg>
      `;
    case 'cold':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M12 3v18"></path>
          <path d="M5.5 6.5 18.5 17.5"></path>
          <path d="M5.5 17.5 18.5 6.5"></path>
          <path d="M4 12h16"></path>
        </svg>
      `;
    case 'wind':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M4 9h10a2.5 2.5 0 1 0-2.5-2.5"></path>
          <path d="M3 13h14a2.5 2.5 0 1 1-2.5 2.5"></path>
          <path d="M5 17h7"></path>
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2.5v3"></path>
          <path d="M12 18.5v3"></path>
          <path d="m4.9 4.9 2.1 2.1"></path>
          <path d="m17 17 2.1 2.1"></path>
          <path d="M2.5 12h3"></path>
          <path d="M18.5 12h3"></path>
          <path d="m4.9 19.1 2.1-2.1"></path>
          <path d="m17 7 2.1-2.1"></path>
        </svg>
      `;
  }
}

export function featuredWeatherViewModel(item) {
  if (!item?.cardRoute) {
    return {
      hidden: true,
      iconClassName: 'home-featured__weather-icon',
      iconMarkup: '',
      label: 'Forecast pending',
    };
  }

  const state = weatherVisualState(item);
  return {
    hidden: false,
    iconClassName:
      `home-featured__weather-icon weather-indicator weather-indicator--${state}`,
    iconMarkup: weatherVisualMarkup(state),
    label: weatherVisualLabel(state),
  };
}

export function createBoardFeaturedWeatherRenderer({
  featuredWeather,
  featuredWeatherIcon,
  setLabel,
}) {
  return function updateFeaturedWeather(item) {
    if (!featuredWeather || !featuredWeatherIcon) {
      return;
    }

    const viewModel = featuredWeatherViewModel(item);
    featuredWeather.hidden = viewModel.hidden;
    featuredWeatherIcon.className = viewModel.iconClassName;
    featuredWeatherIcon.innerHTML = viewModel.iconMarkup;
    setLabel(viewModel.label);
  };
}

export function weatherBadgeMarkup(item, badgeClass) {
  const state = weatherVisualState(item);
  const label = weatherVisualLabel(state);
  const className = typeof badgeClass === 'string' && badgeClass.trim() ? ` ${badgeClass.trim()}` : '';

  return `
    <span class="card-weather-badge card-weather-badge--${state}${className}">
      <span class="card-weather-badge__icon weather-indicator weather-indicator--${state}" aria-hidden="true">
        ${weatherVisualMarkup(state)}
      </span>
      <span class="card-weather-badge__label">${escapeHtml(label)}</span>
    </span>
  `;
}

export function featuredConditionMarkup(item) {
  const summary = summaryParts(cardSummary(item));
  const conditionText = joinWithBullet([summary.main, summary.weather]);
  if (!conditionText) {
    return '';
  }

  const state = weatherVisualState(item);
  return `
    <span class="hero-call__condition-icon weather-indicator weather-indicator--${state}">
      ${weatherVisualMarkup(state)}
    </span>
    <span class="hero-call__condition-text">${escapeHtml(conditionText)}</span>
  `;
}

export function renderTagMarkup(labels) {
  return labels
    .map((label) => {
      const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<span class="recommendation-tag recommendation-tag--${escapeHtml(slug)}">${escapeHtml(label)}</span>`;
    })
    .join('');
}

export function renderSourceBadges(item) {
  const sources = Array.isArray(item.cardRoute.sources) ? item.cardRoute.sources : [];
  return sources
    .map((source) => `<span class="recommendation-source recommendation-source--${source.tone}">${escapeHtml(source.label)}</span>`)
    .join('');
}
