import { mixedSelectionPromptText } from './board-copy.js';
import { isGroupedItem, joinWithBullet } from './board-domain.js';
import {
  confidenceLabel,
  ratingToneKey,
  recommendationSummaryText,
  routeDifficultyLabel,
  routeLengthLabel,
  shortRouteLengthLabel,
} from './board-presenters.js';
import {
  bindMarkerPopup,
  createMapMarker,
  escapeHtml,
  markerClassForRating,
} from './map-runtime.js';
import { buildRoutePlannerHref } from '../lib/route-segments.ts';
import { isCurrentCallUnavailable } from './board-presenters.js';

export function boardMarkerClassFor(item) {
  if (isCurrentCallUnavailable(item?.cardRoute)) {
    return markerClassForRating(null, 'low');
  }

  return markerClassForRating(item.cardRoute.rating, item.cardRoute.confidence.label);
}

export function boardRouteActionModel(
  item,
  {
    route = item?.cardRoute,
    routeLabel = 'View route',
  } = {},
) {
  const routeSlug = route?.river?.slug;
  const selectedSegment = route === item?.cardRoute ? item?.selectedSegment : null;
  const grouped = isGroupedItem(item);
  const routeCount = Number.isFinite(item?.totalRouteCount)
    ? item.totalRouteCount
    : item?.allRiverRoutes?.length;

  return {
    route: routeSlug
      ? {
          href: buildRoutePlannerHref(routeSlug, selectedSegment ?? null),
          label: routeLabel,
        }
      : null,
    compare: grouped && (route?.river?.riverId || item?.link)
      ? {
          href: route?.river?.riverId
            ? `/rivers/by-river/${encodeURIComponent(route.river.riverId)}/`
            : item.link,
          label: Number.isFinite(routeCount) && routeCount > 1
            ? `Compare ${routeCount} routes`
            : 'Compare routes',
        }
      : null,
  };
}

export function boardMapRouteActionsMarkup(item, options = {}) {
  const {
    includeRoute = true,
    includeCompare = true,
    ...actionOptions
  } = options;
  const actions = boardRouteActionModel(item, actionOptions);
  const links = [
    includeRoute && actions.route
      ? `<a class="score-map-popup__link score-map-popup__link--button score-map-popup__link--primary" href="${escapeHtml(actions.route.href)}">${escapeHtml(actions.route.label)}</a>`
      : '',
    includeCompare && actions.compare
      ? `<a class="score-map-popup__link score-map-popup__link--button score-map-popup__link--secondary" href="${escapeHtml(actions.compare.href)}">${escapeHtml(actions.compare.label)}</a>`
      : '',
  ].filter(Boolean);

  return links.length > 0
    ? `<div class="score-map-popup__actions">${links.join('')}</div>`
    : '';
}

export function createBoardMapMarker({
  maplibregl,
  mapRuntime,
  item,
  point,
  markerClassFor,
  markerLabel,
  markerAriaLabel,
  popupMarkup,
  popupOptions = {},
  includeDataKey = false,
  configureMarkerNode,
  onSelectedChange,
  onClick,
  documentObject = document,
  bindPopup = bindMarkerPopup,
}) {
  if (
    !maplibregl
    || typeof maplibregl.Marker !== 'function'
    || typeof maplibregl.Popup !== 'function'
    || !mapRuntime
  ) {
    throw new Error('Board map marker requires MapLibre and an active map.');
  }

  const markerNode = documentObject.createElement('button');
  markerNode.type = 'button';
  markerNode.className = markerClassFor(item);
  markerNode.innerHTML = `<span>${escapeHtml(markerLabel(item))}</span>`;
  markerNode.setAttribute('aria-label', markerAriaLabel(item));
  if (includeDataKey) {
    markerNode.dataset.summaryMapMarker = item.key;
  }
  configureMarkerNode?.(markerNode, item);

  let marker = null;
  marker = createMapMarker({
    maplibregl,
    mapRuntime,
    element: markerNode,
    point,
    popupHtml: popupMarkup(item),
    popupOptions: {
      offset: 18,
      maxWidth: '248px',
      ...popupOptions,
    },
  });
  bindPopup(marker, markerNode, {
    map: mapRuntime,
    onSelectedChange: (selected) => onSelectedChange?.(selected, item, marker),
  });
  if (typeof onClick === 'function') {
    markerNode.addEventListener('click', () => onClick(item, marker));
  }

  return marker;
}

export function createBoardMapPopupRenderer({
  isNearbyReady,
  getLatestResults,
  representativeRouteLabel,
  routeLabelForItem,
  mapMarkerLabel,
  mapMarkerContext,
}) {
  return function popupMarkup(item) {
    const ratingKey = isCurrentCallUnavailable(item?.cardRoute) ? 'pending' : ratingToneKey(item.cardRoute.rating);
    const stretchFacts = joinWithBullet([
      routeLengthLabel(item),
      routeDifficultyLabel(item),
    ]);
    const reachMarkup = isGroupedItem(item)
      ? `<p class="score-map-popup__reach">${escapeHtml(representativeRouteLabel(item))}</p>`
      : `<p class="score-map-popup__reach">${escapeHtml(routeLabelForItem(item))}</p>`;

    return `
      <article class="score-map-popup">
        <h3>${escapeHtml(item.cardRoute.river.name)}</h3>
        ${reachMarkup}
        ${stretchFacts ? `<p class="score-map-popup__meta">${escapeHtml(stretchFacts)}</p>` : ''}
        <div class="score-map-popup__scoreline">
          <span class="score-map-popup__scorebadge score-map-popup__scorebadge--${escapeHtml(ratingKey)}">${escapeHtml(mapMarkerLabel(item))}</span>
          <p class="score-map-popup__verdict">${escapeHtml(mapMarkerContext(item))}</p>
        </div>
        <p class="score-map-popup__summary">${escapeHtml(recommendationSummaryText(item, isNearbyReady(item), getLatestResults()))}</p>
        ${boardMapRouteActionsMarkup(item)}
      </article>
    `;
  };
}

export function createBoardMapController({
  supportsMobileViews,
  isPhone,
  getMobileView,
  setMobileView,
  getCollapsed = () => false,
  setCollapsed = () => {},
  getItems = () => [],
  getSelectedKey = () => null,
  getResultsOptions = () => ({}),
  getMapRuntime = () => null,
  onMapViewActivated = () => {},
  elements = {},
  defaultResultsTitle = 'Results',
  resultsRenderer = null,
}) {
  function activeView() {
    if (!(supportsMobileViews && isPhone())) {
      return 'map';
    }

    return getMobileView() === 'list' ? 'list' : 'map';
  }

  function setView(nextView) {
    if (!supportsMobileViews) {
      return null;
    }

    const view = nextView === 'list' ? 'list' : 'map';
    setMobileView(view);
    return view;
  }

  function presentation(collapsed = false) {
    const compact = isPhone();
    const mobileView = activeView();
    const mobileMapActive = supportsMobileViews && compact && mobileView === 'map';
    const collapsedMap = !supportsMobileViews && compact && collapsed;

    return {
      compact,
      mobileView,
      mobileMapActive,
      mobileListActive: supportsMobileViews && compact && mobileView === 'list',
      showMobileSwitch: supportsMobileViews && compact,
      showMobileBackButton: mobileMapActive,
      showCollapseToggle: !supportsMobileViews && compact,
      collapsedMap,
      toggleExpanded: !collapsedMap,
      toggleLabel: collapsedMap ? 'Show map' : 'Hide map',
    };
  }

  function closePopups(markersByKey, exceptKey = null) {
    for (const [key, marker] of markersByKey.entries()) {
      if (!marker || key === exceptKey) {
        continue;
      }

      const popup = marker.getPopup?.();
      if (popup && typeof popup.isOpen === 'function' && popup.isOpen()) {
        popup.remove();
      }
    }
  }

  function resultsContext(
    items,
    {
      selectedKey = null,
      collapsed = false,
      countMode = 'items',
      itemNounSingular = 'result',
      itemNounPlural = 'results',
      emptyText = 'No results match these filters.',
    } = {},
  ) {
    const routeCount = items.reduce(
      (total, item) => total + (item.matchingRouteCount ?? 1),
      0,
    );
    const riverCount = new Set(
      items.map((item) => item.cardRoute.river.riverId || item.cardRoute.river.name),
    ).size;
    const itemCount = items.length;
    const hasItems = itemCount > 0;
    const usesRouteCounts = countMode === 'routes';
    const countValue = String(usesRouteCounts ? routeCount : itemCount);
    const countLabel = usesRouteCounts
      ? `${routeCount} matching ${routeCount === 1 ? 'route' : 'routes'} across ${riverCount} ${riverCount === 1 ? 'river' : 'rivers'}`
      : `${itemCount} ${itemCount === 1 ? itemNounSingular : itemNounPlural} on the map`;
    const availabilityLabel = !hasItems
      ? ''
      : usesRouteCounts
        ? `${routeCount} ${routeCount === 1 ? 'route' : 'routes'} across ${riverCount} ${riverCount === 1 ? 'river' : 'rivers'} available`
        : `${countValue} available`;
    const mobileMapActive = presentation(collapsed).mobileMapActive;
    const selectedItem = items.find((item) => item.key === selectedKey);
    const noteText = !hasItems
      ? emptyText
      : mobileMapActive
        ? mixedSelectionPromptText(countLabel, selectedItem?.cardRoute.river.name)
        : countLabel;

    return {
      availabilityLabel,
      countLabel,
      countValue,
      hasItems,
      itemCount,
      mobileMapActive,
      noteText,
      riverCount,
      routeCount,
      selectedItem: selectedItem ?? null,
    };
  }

  function resolveSelection(items, selectedKey, { fallback = 'none' } = {}) {
    if (items.some((item) => item.key === selectedKey)) {
      return selectedKey;
    }

    return fallback === 'first' ? items[0]?.key ?? null : null;
  }

  function updateResultsContext(items = getItems()) {
    const context = resultsContext(items, {
      selectedKey: getSelectedKey(),
      collapsed: getCollapsed(),
      ...getResultsOptions(),
    });
    const {
      shell,
      resultsTitle,
      resultsNote,
      countNodes = [],
      viewButtons = [],
    } = elements;
    const isElement = (value) => typeof HTMLElement !== 'undefined' && value instanceof HTMLElement;
    const isButton = (value) => typeof HTMLButtonElement !== 'undefined' && value instanceof HTMLButtonElement;

    if (isElement(shell)) {
      shell.dataset.summaryMapActiveMobile = context.mobileMapActive ? 'map' : 'list';
    }

    if (isElement(resultsTitle)) {
      const fallbackTitle = typeof defaultResultsTitle === 'function'
        ? defaultResultsTitle()
        : defaultResultsTitle;
      const defaultLabel = resultsTitle.dataset.defaultLabel || fallbackTitle;
      const mobileMapLabel = resultsTitle.dataset.mobileMapLabel || defaultLabel;
      resultsTitle.textContent = context.mobileMapActive ? mobileMapLabel : defaultLabel;
    }

    if (isElement(resultsNote)) {
      resultsNote.textContent = context.noteText;
    }

    for (const countNode of countNodes) {
      if (!isElement(countNode)) {
        continue;
      }
      countNode.textContent = context.countValue;
      countNode.hidden = !context.hasItems;
    }

    for (const button of viewButtons) {
      if (!isButton(button)) {
        continue;
      }
      const view = button.dataset.summaryMapMobileView === 'map' ? 'map' : 'list';
      button.setAttribute(
        'aria-label',
        `Show ${view} view${context.availabilityLabel ? ` (${context.availabilityLabel})` : ''}`,
      );
    }

    return context;
  }

  function renderResults(items) {
    if (!resultsRenderer) {
      return null;
    }

    const {
      container,
      setItems,
      markerClassFor,
      mapMarkerLabel,
      routeLabelForItem,
      mapMarkerContext,
      getEmptyText,
      onOpen,
      onHover,
      onSelection,
      selectionFallback = 'none',
      selectionOptions,
    } = resultsRenderer;
    const isElement = typeof HTMLElement !== 'undefined' && container instanceof HTMLElement;
    if (!isElement) {
      return null;
    }

    setItems?.(items);
    updateResultsContext(items);
    container.innerHTML = '';

    if (items.length === 0) {
      container.innerHTML = `<p class="muted summary-map-results__empty">${escapeHtml(getEmptyText?.() ?? 'No results match these filters.')}</p>`;
      return null;
    }

    const fragment = document.createDocumentFragment();
    for (const item of items) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'summary-map-result';
      button.dataset.summaryMapItem = item.key;
      button.setAttribute('aria-pressed', getSelectedKey() === item.key ? 'true' : 'false');
      button.innerHTML = `
        <span class="summary-map-result__score score-map-marker ${markerClassFor(item)}"><span>${escapeHtml(mapMarkerLabel(item))}</span></span>
        <span class="summary-map-result__body">
          <strong class="summary-map-result__name">${escapeHtml(item.cardRoute.river.name)}</strong>
          <span class="summary-map-result__route">${escapeHtml(routeLabelForItem(item))}</span>
          <span class="summary-map-result__meta">${escapeHtml(isGroupedItem(item)
            ? joinWithBullet([
                mapMarkerContext(item),
                isCurrentCallUnavailable(item?.cardRoute) ? '' : `Top stretch score ${item.cardRoute.score}`,
              ])
            : joinWithBullet([confidenceLabel(item), shortRouteLengthLabel(item)]))}</span>
        </span>
      `;
      button.addEventListener('click', () => {
        onOpen(item.key);
      });
      if (onHover) {
        button.addEventListener('mouseenter', () => onHover(item.key));
        button.addEventListener('mouseleave', () => onHover(null));
        button.addEventListener('focus', () => onHover(item.key));
        button.addEventListener('blur', () => onHover(null));
      }
      fragment.appendChild(button);
    }

    container.appendChild(fragment);
    const activeKey = resolveSelection(items, getSelectedKey(), {
      fallback: selectionFallback,
    });
    onSelection(activeKey, selectionOptions);
    return activeKey;
  }

  function scrollShellIntoView() {
    const { shell } = elements;
    const isElement = typeof HTMLElement !== 'undefined' && shell instanceof HTMLElement;
    if (!isElement || !isPhone()) {
      return;
    }

    shell.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  function setViewAndSync(nextView, { scrollIntoView = false } = {}) {
    const view = setView(nextView);
    if (view === null) {
      return null;
    }

    if (view === 'map') {
      onMapViewActivated();
    }
    updateView();

    if (scrollIntoView && view === 'map') {
      window.setTimeout(() => {
        scrollShellIntoView();
      }, 45);
    }

    return view;
  }

  function updateView() {
    const {
      shell,
      toggle,
      mobileSwitch,
      mobileBackButton,
      viewButtons = [],
    } = elements;
    const isElement = (value) => typeof HTMLElement !== 'undefined' && value instanceof HTMLElement;
    const isButton = (value) => typeof HTMLButtonElement !== 'undefined' && value instanceof HTMLButtonElement;
    if (!isElement(shell) || !isButton(toggle)) {
      return null;
    }

    const viewPresentation = presentation(getCollapsed());
    const { compact, mobileView, mobileMapActive } = viewPresentation;

    shell.classList.toggle('summary-map-shell--mobile-list', viewPresentation.mobileListActive);
    shell.classList.toggle('summary-map-shell--mobile-map', mobileMapActive);
    shell.dataset.summaryMapView = mobileView;
    shell.dataset.summaryMapActiveMobile = mobileMapActive ? 'map' : 'list';

    if (isElement(mobileSwitch)) {
      mobileSwitch.hidden = !viewPresentation.showMobileSwitch;
    }
    if (isButton(mobileBackButton)) {
      mobileBackButton.hidden = !viewPresentation.showMobileBackButton;
    }

    for (const button of viewButtons) {
      if (!isButton(button)) {
        continue;
      }
      const isActive = compact && mobileView === button.dataset.summaryMapMobileView;
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      button.classList.toggle('summary-map-mobile-switch__button--active', isActive);
    }

    updateResultsContext();
    const mapRuntime = getMapRuntime();

    if (supportsMobileViews) {
      if (!compact) {
        setView('map');
      }
      toggle.hidden = true;
      if (mobileView === 'map' && mapRuntime) {
        window.setTimeout(() => {
          mapRuntime.resize();
        }, 30);
      }
      return viewPresentation;
    }

    if (!compact) {
      setCollapsed(false);
    }
    const collapsePresentation = presentation(getCollapsed());
    toggle.hidden = !collapsePresentation.showCollapseToggle;
    shell.classList.toggle('summary-map-shell--collapsed', collapsePresentation.collapsedMap);
    toggle.setAttribute('aria-expanded', collapsePresentation.toggleExpanded ? 'true' : 'false');
    toggle.textContent = collapsePresentation.toggleLabel;

    if (!collapsePresentation.collapsedMap && mapRuntime) {
      window.setTimeout(() => {
        mapRuntime.resize();
      }, 30);
    }
    return collapsePresentation;
  }

  return {
    activeView,
    closePopups,
    presentation,
    renderResults,
    resolveSelection,
    resultsContext,
    setView,
    setViewAndSync,
    updateView,
    updateResultsContext,
  };
}
