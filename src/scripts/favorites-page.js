import { freshnessLabel, readCachedPayload, writeCachedPayload } from './client-cache.js';
import { decorateFavoriteButton, bindFavoriteButtons, refreshFavoriteButtons } from './favorites-ui.js';
import { readFavorites, subscribeFavorites } from './favorites-store.js';
import { MAP_STYLE_URL, bindMarkerPopup, ensureMapLibre, escapeHtml, markerClassForRating } from './map-runtime.js';
import { confidenceDisplayLabel, ratingDisplayLabel } from './ui-taxonomy.js';
import { createRequestGuard, isAbortError } from './request-guard.js';

const SUMMARY_CACHE_KEY = 'river-summary:v2';
const root = document.querySelector('[data-favorites-page]');
const summary = document.querySelector('[data-favorites-summary]');
const empty = document.querySelector('[data-favorites-empty]');
const grid = document.querySelector('[data-favorites-grid]');
const template = document.querySelector('[data-favorites-card-template]');
const favoritesMapShell = document.querySelector('[data-favorites-map-shell]');
const favoritesMapCopy = document.querySelector('[data-favorites-map-copy]');
const favoritesMapStatus = document.querySelector('[data-favorites-map-status]');
const favoritesMap = document.querySelector('[data-favorites-map]');

const favoritesRequestGuard = createRequestGuard();
let latestResults = [];
let lastFetchedAt = null;
let favoritesMapRuntime = null;
let favoritesMapMarkers = [];
let selectedFavoriteSlug = '';

function setText(scope, field, value) {
  const element = scope.querySelector(`[data-field="${field}"]`);
  if (element instanceof HTMLElement) {
    element.textContent = value;
  }
  return element;
}

function ratingToneKey(rating) {
  if (rating === 'Strong') return 'great';
  if (rating === 'Fair') return 'marginal';
  return String(rating).toLowerCase().replace(/[^a-z]+/g, '-');
}

function difficultyLabel(item) {
  const difficulty = item?.river?.difficulty;
  if (!difficulty) {
    return '';
  }

  return `${String(difficulty).slice(0, 1).toUpperCase()}${String(difficulty).slice(1)} difficulty`;
}

function metaLine(item) {
  const parts = [];
  if (item?.confidence?.label) {
    parts.push(confidenceDisplayLabel(item.confidence.label));
  }
  if (difficultyLabel(item)) {
    parts.push(difficultyLabel(item));
  }
  if (item?.river?.estimatedPaddleTime) {
    parts.push(item.river.estimatedPaddleTime);
  }
  return parts.join(' \u2022 ');
}

function savedAtLabel(savedAt) {
  if (typeof savedAt !== 'number' || !Number.isFinite(savedAt)) {
    return 'Saved on this device';
  }

  return `Saved ${new Date(savedAt).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;
}

function favoriteLookup(results) {
  return new Map(results.map((item) => [item.river.slug, item]));
}

function mapLocationForItem(item) {
  if (Number.isFinite(item?.river?.longitude) && Number.isFinite(item?.river?.latitude)) {
    return {
      longitude: item.river.longitude,
      latitude: item.river.latitude,
    };
  }

  return null;
}

function favoriteMapItems(results = latestResults) {
  const favorites = readFavorites();
  const bySlug = favoriteLookup(results);

  return favorites
    .map((favorite) => {
      const current = bySlug.get(favorite.slug);
      const location = current ? mapLocationForItem(current) : null;
      if (!current || !location) {
        return null;
      }

      return {
        favorite,
        current,
        location,
      };
    })
    .filter(Boolean);
}

function setFavoriteCardSelection(slug) {
  selectedFavoriteSlug = slug || '';

  if (!(grid instanceof HTMLElement)) {
    return;
  }

  for (const card of Array.from(grid.querySelectorAll('[data-favorite-card]'))) {
    if (!(card instanceof HTMLElement)) {
      continue;
    }

    const isSelected = Boolean(selectedFavoriteSlug) && card.dataset.favoriteCardSlug === selectedFavoriteSlug;
    card.classList.toggle('favorites-card--selected', isSelected);
  }
}

function popupMetaLine(item) {
  const parts = [`Score ${item.score}`, confidenceDisplayLabel(item.confidence.label)];
  if (item?.river?.difficulty) {
    parts.push(`${String(item.river.difficulty).slice(0, 1).toUpperCase()}${String(item.river.difficulty).slice(1)} difficulty`);
  }
  if (item?.river?.estimatedPaddleTime) {
    parts.push(item.river.estimatedPaddleTime);
  }
  return parts.join(' • ');
}

function favoriteMapPopupMarkup(item) {
  return `
    <article class="score-map-popup">
      <p class="score-map-popup__state">${escapeHtml(`${item.river.state} | ${item.river.region}`)}</p>
      <h3>${escapeHtml(item.river.name)}</h3>
      <p class="score-map-popup__reach">${escapeHtml(item.river.reach || 'Route')}</p>
      <p class="score-map-popup__verdict">${escapeHtml(item.gaugeBandLabel || item.rating)}</p>
      <p class="score-map-popup__summary">${escapeHtml(item.summary?.shortExplanation || item.explanation || 'Current route read available.')}</p>
      <p class="score-map-popup__meta">${escapeHtml(popupMetaLine(item))}</p>
      <a class="score-map-popup__link score-map-popup__link--button" href="/rivers/${encodeURIComponent(item.river.slug)}/">View route</a>
    </article>
  `;
}

async function renderFavoritesMap(results = latestResults) {
  if (
    !(favoritesMapShell instanceof HTMLElement) ||
    !(favoritesMap instanceof HTMLElement) ||
    !(favoritesMapStatus instanceof HTMLElement) ||
    !(favoritesMapCopy instanceof HTMLElement)
  ) {
    return;
  }

  const mappable = favoriteMapItems(results);
  const totalFavorites = readFavorites().length;
  const hiddenCount = Math.max(totalFavorites - mappable.length, 0);

  if (totalFavorites === 0) {
    favoritesMapShell.hidden = true;
    favoritesMapStatus.textContent = 'Save a route to see it here.';
    favoritesMapCopy.textContent = 'Your saved route map appears once you have favorites on this device.';
    for (const marker of favoritesMapMarkers) {
      marker.remove();
    }
    favoritesMapMarkers = [];
    return;
  }

  if (mappable.length === 0) {
    favoritesMapShell.hidden = true;
    favoritesMapStatus.textContent = 'Favorite map unavailable right now.';
    favoritesMapCopy.textContent = 'Saved routes exist, but none of them are available in the latest board snapshot yet.';
    for (const marker of favoritesMapMarkers) {
      marker.remove();
    }
    favoritesMapMarkers = [];
    return;
  }

  favoritesMapShell.hidden = false;
  favoritesMapStatus.textContent = mappable.length === 1 ? 'Showing 1 saved route.' : `Showing ${mappable.length} saved routes.`;
  favoritesMapCopy.textContent =
    hiddenCount > 0
      ? `${mappable.length} saved routes are on the current board. ${hiddenCount} saved ${hiddenCount === 1 ? 'route is' : 'routes are'} not in the latest snapshot.`
      : 'All saved routes on this device are shown on the current board map.';

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) {
      favoritesMapStatus.textContent = 'Favorite map unavailable right now.';
      return;
    }

    if (!favoritesMapRuntime) {
      favoritesMapRuntime = new maplibregl.Map({
        container: favoritesMap,
        style: MAP_STYLE_URL,
        center: [-93.2, 45.1],
        zoom: 6.6,
        minZoom: 4.2,
        maxZoom: 12,
        attributionControl: true,
      });

      favoritesMapRuntime.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      await new Promise((resolve) => {
        if (favoritesMapRuntime.loaded()) {
          resolve();
          return;
        }
        favoritesMapRuntime.once('load', resolve);
      });
    }

    for (const marker of favoritesMapMarkers) {
      marker.remove();
    }
    favoritesMapMarkers = [];

    const bounds = new maplibregl.LngLatBounds();
    for (const entry of mappable) {
      const { current, location } = entry;
      const markerNode = document.createElement('button');
      markerNode.type = 'button';
      markerNode.className = markerClassForRating(current.rating, current.confidence?.label);
      markerNode.innerHTML = `<span>${current.score}</span>`;
      markerNode.setAttribute(
        'aria-label',
        `${current.river.reach}: score ${current.score}, ${confidenceDisplayLabel(current.confidence.label).toLowerCase()}`
      );
      if (current.river.slug === selectedFavoriteSlug) {
        markerNode.classList.add('score-map-marker--selected');
      }

      const marker = new maplibregl.Marker({
        element: markerNode,
        anchor: 'center',
      })
        .setLngLat([location.longitude, location.latitude])
        .setPopup(new maplibregl.Popup({ offset: 18, closeButton: true, closeOnClick: true, maxWidth: '288px' }).setHTML(favoriteMapPopupMarkup(current)))
        .addTo(favoritesMapRuntime);

      bindMarkerPopup(marker, markerNode, {
        map: favoritesMapRuntime,
        onSelectedChange(selected) {
          if (!selected) {
            if (selectedFavoriteSlug === current.river.slug) {
              setFavoriteCardSelection('');
            }
            return;
          }

          setFavoriteCardSelection(current.river.slug);
        },
      });

      favoritesMapMarkers.push(marker);
      bounds.extend([location.longitude, location.latitude]);
    }

    favoritesMapRuntime.fitBounds(bounds, {
      padding: window.matchMedia('(max-width: 760px)').matches
        ? { top: 24, right: 24, bottom: 24, left: 24 }
        : { top: 42, right: 42, bottom: 42, left: 42 },
      maxZoom: mappable.length === 1 ? 9.8 : 10.2,
      duration: 650,
    });
    favoritesMapRuntime.resize();
  } catch (error) {
    console.error('Failed to load favorites map.', error);
    favoritesMapStatus.textContent = 'Favorite map unavailable right now.';
  }
}

function renderFavoriteCard(favorite, current) {
  if (!(template instanceof HTMLTemplateElement)) {
    return document.createElement('div');
  }

  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector('.favorites-card');
  if (!(card instanceof HTMLElement)) {
    return document.createElement('div');
  }
  card.dataset.favoriteCardSlug = favorite.slug;

  const linkHref = favorite.url || `/rivers/${encodeURIComponent(favorite.slug)}/`;
  const titleLink = card.querySelector('[data-field="favorite-title-link"]');
  if (titleLink instanceof HTMLAnchorElement) {
    titleLink.href = linkHref;
    titleLink.textContent = current?.river?.name || favorite.name || 'Saved route';
  }

  setText(card, 'favorite-route', current?.river?.reach || favorite.reach || 'Route');
  setText(
    card,
    'favorite-state',
    current ? `${current.river.state} \u2022 ${current.river.region}`.toUpperCase() : `${favorite.state || 'Saved'}${favorite.region ? ` \u2022 ${favorite.region}` : ''}`.toUpperCase()
  );
  setText(card, 'favorite-saved-at', savedAtLabel(favorite.savedAt));

  const favoriteButton = card.querySelector('[data-favorite-button]');
  decorateFavoriteButton(favoriteButton, favorite);

  const link = card.querySelector('[data-field="favorite-link"]');
  if (link instanceof HTMLAnchorElement) {
    link.href = linkHref;
  }

  const orb = card.querySelector('.score-orb');
  if (current) {
    const tone = ratingToneKey(current.rating);
    card.classList.add(`river-card--${tone}`);
    if (orb instanceof HTMLElement) {
      orb.classList.add(`score-orb--${tone}`);
    }

    setText(card, 'favorite-score', String(current.score));
    setText(card, 'favorite-rating', ratingDisplayLabel(current.rating, { liveData: current.liveData }));
    setText(card, 'favorite-verdict', current.gaugeBandLabel || 'Current route read');
    setText(card, 'favorite-meta', metaLine(current));
    setText(card, 'favorite-summary', current.summary?.shortExplanation || current.explanation || 'Current route read available.');
    setText(card, 'favorite-signal', current.summary?.rawSignalLine || current.summary?.gaugeNow || 'Live signal unavailable.');
    if (link instanceof HTMLAnchorElement) {
      link.textContent = 'View route';
    }
    return card;
  }

  card.classList.add('favorites-card--missing');
  setText(card, 'favorite-score', '--');
  setText(card, 'favorite-rating', 'Saved');
  setText(card, 'favorite-verdict', 'Current board unavailable');
  setText(card, 'favorite-meta', 'This route is not in the latest board snapshot');
  setText(card, 'favorite-summary', 'This saved route is not in the latest stored board, but you can still open the route page directly.');
  setText(card, 'favorite-signal', '');
  if (link instanceof HTMLAnchorElement) {
    link.textContent = 'Open route';
  }

  return card;
}

function updateSummaryLine(favorites, { fallback = false } = {}) {
  if (!(summary instanceof HTMLElement)) {
    return;
  }

  if (favorites.length === 0) {
    summary.textContent = 'No routes saved on this device yet.';
    return;
  }

  const countLabel = favorites.length === 1 ? '1 route saved' : `${favorites.length} routes saved`;
  const freshness = lastFetchedAt ? freshnessLabel(lastFetchedAt) : 'Updated recently';
  summary.textContent = fallback ? `${countLabel} \u2022 ${freshness} \u2022 showing latest available data` : `${countLabel} \u2022 ${freshness}`;
}

function renderFavorites(results = latestResults) {
  if (!(grid instanceof HTMLElement) || !(empty instanceof HTMLElement)) {
    return;
  }

  const favorites = readFavorites();
  updateSummaryLine(favorites);

  if (favorites.length === 0) {
    empty.hidden = false;
    grid.hidden = true;
    grid.innerHTML = '';
    setFavoriteCardSelection('');
    renderFavoritesMap(results);
    return;
  }

  empty.hidden = true;
  grid.hidden = false;

  try {
    const bySlug = favoriteLookup(results);
    const fragment = document.createDocumentFragment();
    for (const favorite of favorites) {
      fragment.appendChild(renderFavoriteCard(favorite, bySlug.get(favorite.slug) ?? null));
    }

    grid.innerHTML = '';
    grid.appendChild(fragment);
    setFavoriteCardSelection(selectedFavoriteSlug);
    refreshFavoriteButtons(grid);
  } catch (error) {
    console.error('Failed to render favorites.', error);
    summary.textContent = `${favorites.length === 1 ? '1 route saved' : `${favorites.length} routes saved`} • Reloading current cards failed.`;
  }
  renderFavoritesMap(results);
}

async function loadFavorites({ silent = false } = {}) {
  const { requestId, controller } = favoritesRequestGuard.begin();

  try {
    const response = await fetch('/api/rivers/summary.json', {
      headers: { accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API request failed for /api/rivers/summary.json: HTTP ${response.status}`);
    }

    const payload = await response.json();
    if (!favoritesRequestGuard.isCurrent(requestId)) {
      return;
    }

    latestResults = Array.isArray(payload?.rivers) ? payload.rivers : [];
    lastFetchedAt = Date.now();
    writeCachedPayload(SUMMARY_CACHE_KEY, payload);
    renderFavorites(latestResults);
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }

    if (!favoritesRequestGuard.isCurrent(requestId)) {
      return;
    }

    const cached = readCachedPayload(SUMMARY_CACHE_KEY);
    latestResults = Array.isArray(cached?.payload?.rivers) ? cached.payload.rivers : latestResults;
    lastFetchedAt = cached?.fetchedAt ?? lastFetchedAt;
    renderFavorites(latestResults);
    if (!silent) {
      updateSummaryLine(readFavorites(), { fallback: true });
    }
    console.error('Failed to load favorites summary.', error);
  } finally {
    favoritesRequestGuard.finish(controller);
  }
}

if (!(root instanceof HTMLElement)) {
  throw new Error('Missing favorites page root.');
}

bindFavoriteButtons(document, {
  onToggle() {
    renderFavorites(latestResults);
  },
});
subscribeFavorites(() => {
  renderFavorites(latestResults);
});
renderFavorites();
loadFavorites();
