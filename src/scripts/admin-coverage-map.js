import { createPaddleMap, ensureMapLibre } from './map-runtime.js';

const root = document.querySelector('[data-admin-coverage-map]');
if (!(root instanceof HTMLElement)) throw new Error('Missing admin coverage map root.');

const mapContainer = root.querySelector('[data-admin-coverage-map-container]');
const status = root.querySelector('[data-admin-coverage-map-status]');
const dataNode = root.querySelector('[data-admin-coverage-map-data]');
const detailName = root.querySelector('[data-admin-coverage-map-detail-name]');
const detailSummary = root.querySelector('[data-admin-coverage-map-detail-summary]');
const detailGauge = root.querySelector('[data-admin-coverage-map-detail-gauge]');
const detailRoutes = root.querySelector('[data-admin-coverage-map-detail-routes]');
const detailStatus = root.querySelector('[data-admin-coverage-map-detail-status]');
const detailNote = root.querySelector('[data-admin-coverage-map-detail-note]');
const detailLink = root.querySelector('[data-admin-coverage-map-detail-link]');

if (!(mapContainer instanceof HTMLElement) || !(dataNode instanceof HTMLScriptElement)) {
  throw new Error('Admin coverage map markup is incomplete.');
}

const rows = JSON.parse(dataNode.textContent || '[]');
const rowsById = new Map(rows.map((row) => [row.id, row]));
const rowsByName = new Map(rows.map((row) => [row.name, row]));
const initialStateId = rows.find((row) => row.id === 'MN' && row.publicRoutes > 0)?.id
  || rows.find((row) => row.publicRoutes > 0)?.id
  || rows[0]?.id
  || null;
let selectedStateId = initialStateId;
let mapRuntime = null;
let maplibreRuntime = null;
let mapReady = false;
let mapInitializing = false;
let popup = null;

const topojsonScriptUrl = 'https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js';
// The state-only atlas keeps the admin glance view lightweight (~115 KB) while
// still providing the `states` object needed for the choropleth.
const statesUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

function setStatus(message) {
  if (status instanceof HTMLElement) status.textContent = message;
}

function ensureTopojson() {
  if (window.topojson) return Promise.resolve(window.topojson);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${topojsonScriptUrl}"]`);
    if (existing) {
      if (window.topojson) {
        resolve(window.topojson);
        return;
      }
      existing.addEventListener('load', () => resolve(window.topojson), { once: true });
      existing.addEventListener('error', () => reject(new Error('Topology helper failed to load.')), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = topojsonScriptUrl;
    script.async = true;
    script.onload = () => window.topojson ? resolve(window.topojson) : reject(new Error('Topology helper unavailable.'));
    script.onerror = () => reject(new Error('Topology helper failed to load.'));
    document.head.appendChild(script);
  });
}

function formatStatus(value) {
  return String(value || 'unknown').replaceAll('_', ' ');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function coverageClass(row) {
  if (!row || row.publicRoutes <= 0) return 'empty';
  if (row.publicRoutes <= 10) return 'low';
  if (row.publicRoutes <= 25) return 'mid';
  if (row.publicRoutes <= 75) return 'high';
  if (row.publicRoutes <= 150) return 'max';
  return 'ultra';
}

function researchClass(row) {
  return row && ['saturated', 'research_complete'].includes(row.researchStatus)
    ? 'complete'
    : 'open';
}

function detailFor(row) {
  if (!row) {
    return {
      name: 'Choose a state',
      summary: 'Hover for a quick read; click to pin details here.',
      gauge: '—',
      routes: '—',
      researchStatus: '—',
      note: '',
      href: null,
    };
  }
  const gauge = row.gauge
    ? `${row.gauge.percent}% (${row.gauge.covered}/${row.gauge.routeCapable})${row.gauge.baselineComplete ? '' : ' · provider baseline pending'}`
    : row.publicRoutes > 0 ? 'Baseline pending' : 'No gauge baseline';
  const note = row.gauge
    ? `${row.liveRoutes} live-gauge routes · ${row.planningRoutes} planning reaches · ${row.reviewPercent}% of eligible gauges reviewed${row.discoveryComplete ? ' · discovery sweep complete' : ' · discovery sweep required'}${row.gauge.baselineComplete ? '' : ' · denominator is route-linked, not provider-wide'}`
    : `${row.liveRoutes} live-gauge routes · ${row.planningRoutes} planning reaches · this state is not yet in the comparable gauge baseline.`;
  return {
    name: row.name,
    summary: `${row.publicRoutes} public route reaches across ${row.riverFamilies} river families`,
    gauge,
    routes: row.publicRoutes,
    researchStatus: formatStatus(row.researchStatus),
    note,
    href: row.statePageHref,
  };
}

function updateDetail(id) {
  const row = rowsById.get(id);
  const detail = detailFor(row);
  if (detailName) detailName.textContent = detail.name;
  if (detailSummary) detailSummary.textContent = detail.summary;
  if (detailGauge) detailGauge.textContent = detail.gauge;
  if (detailRoutes) detailRoutes.textContent = String(detail.routes);
  if (detailStatus) detailStatus.textContent = detail.researchStatus;
  if (detailNote) detailNote.textContent = detail.note;
  if (detailLink instanceof HTMLAnchorElement) {
    detailLink.hidden = !detail.href;
    if (detail.href) detailLink.href = detail.href;
  }
  if (mapReady && mapRuntime) {
    mapRuntime.setFilter('admin-coverage-selected', ['==', ['get', 'stateId'], id || '']);
  }
}

function tooltipHtml(row) {
  const detail = detailFor(row);
  return `<strong>${escapeHtml(detail.name)}</strong><span>${escapeHtml(detail.summary)}</span><span>${escapeHtml(detail.gauge)} gauge coverage · ${escapeHtml(detail.researchStatus)}</span>`;
}

function palette() {
  const styles = getComputedStyle(root);
  const value = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
  return {
    low: value('--admin-coverage-low', '#c9e0e7'),
    mid: value('--admin-coverage-mid', '#93c0cf'),
    high: value('--admin-coverage-high', '#4d8fa7'),
    max: value('--admin-coverage-max', '#155f7c'),
    ultra: value('--admin-coverage-ultra', '#0e4962'),
    empty: value('--admin-coverage-empty', '#dfd9cf'),
    border: value('--admin-coverage-border', '#ffffff'),
    focus: value('--admin-coverage-focus', '#a8712f'),
  };
}

function enrichStates(geojson) {
  return {
    ...geojson,
    features: geojson.features
      .map((feature) => {
        // us-atlas uses numeric FIPS ids, while the operations snapshot uses
        // the app's two-letter state ids. Join on the authoritative state name
        // so the map colors and interactions stay aligned with the table.
        const stateName = feature.properties?.name;
        const row = rowsByName.get(stateName);
        const stateId = row?.id || String(feature.id).padStart(2, '0');
        return {
          ...feature,
          id: stateId,
          properties: {
            ...(feature.properties || {}),
            stateId,
            stateName: row?.name || stateName || stateId,
            coverageClass: coverageClass(row),
            researchClass: researchClass(row),
          },
        };
      }),
  };
}

function wireMapInteractions() {
  mapRuntime.on('mousemove', 'admin-coverage-fill', (event) => {
    const feature = event.features?.[0];
    if (!feature) return;
    const row = rowsById.get(feature.properties.stateId);
    mapRuntime.getCanvas().style.cursor = 'pointer';
    if (!popup && maplibreRuntime) {
      popup = new maplibreRuntime.Popup({ closeButton: false, closeOnClick: false, maxWidth: '280px', offset: 8 });
    }
    popup.setLngLat(event.lngLat).setHTML(tooltipHtml(row)).addTo(mapRuntime);
  });
  mapRuntime.on('mouseleave', 'admin-coverage-fill', () => {
    mapRuntime.getCanvas().style.cursor = '';
    popup?.remove();
  });
  mapRuntime.on('click', 'admin-coverage-fill', (event) => {
    const feature = event.features?.[0];
    if (!feature) return;
    selectedStateId = feature.properties.stateId;
    updateDetail(selectedStateId);
    popup?.remove();
  });
}

async function initializeMap() {
  if (mapRuntime || mapInitializing || mapContainer.clientWidth === 0) return;
  mapInitializing = true;
  setStatus('Loading state geometry…');
  try {
    const [maplibregl, topojson, topology] = await Promise.all([
      ensureMapLibre(),
      ensureTopojson(),
      fetch(statesUrl, { headers: { accept: 'application/json' } }).then((response) => {
        if (!response.ok) throw new Error(`State geometry request failed (${response.status}).`);
        return response.json();
      }),
    ]);
    if (!maplibregl || !topojson || !topology?.objects?.states) throw new Error('Map dependencies unavailable.');

    maplibreRuntime = maplibregl;
    mapRuntime = createPaddleMap(maplibregl, {
      container: mapContainer,
      center: [-98.5, 38.5],
      zoom: 3.25,
      minZoom: 2.5,
      maxZoom: 6.5,
      attributionControl: true,
    });

    mapRuntime.on('load', () => {
      const geojson = enrichStates(topojson.feature(topology, topology.objects.states));
      const colors = palette();
      mapRuntime.addSource('admin-coverage-states', { type: 'geojson', data: geojson, promoteId: 'stateId' });
      mapRuntime.addLayer({
        id: 'admin-coverage-fill',
        type: 'fill',
        source: 'admin-coverage-states',
        paint: {
          'fill-color': ['match', ['get', 'coverageClass'], 'low', colors.low, 'mid', colors.mid, 'high', colors.high, 'max', colors.max, 'ultra', colors.ultra, colors.empty],
          'fill-opacity': 0.9,
        },
      });
      mapRuntime.addLayer({
        id: 'admin-coverage-boundaries',
        type: 'line',
        source: 'admin-coverage-states',
        paint: { 'line-color': colors.border, 'line-width': 0.8, 'line-opacity': 0.9 },
      });
      mapRuntime.addLayer({
        id: 'admin-coverage-open',
        type: 'line',
        source: 'admin-coverage-states',
        filter: ['==', ['get', 'researchClass'], 'open'],
        paint: { 'line-color': colors.focus, 'line-width': 1.2, 'line-dasharray': [1.5, 1.5], 'line-opacity': 0.9 },
      });
      mapRuntime.addLayer({
        id: 'admin-coverage-selected',
        type: 'line',
        source: 'admin-coverage-states',
        filter: ['==', ['get', 'stateId'], selectedStateId || ''],
        paint: { 'line-color': colors.focus, 'line-width': 2.7 },
      });
      mapReady = true;
      updateDetail(selectedStateId);
      wireMapInteractions();
      setStatus(`${rows.filter((row) => row.publicRoutes > 0).length} states with public route reaches · ${rows.filter((row) => researchClass(row) === 'complete').length} research-complete · ${rows.filter((row) => row.gauge?.baselineComplete).length} with comparable gauge baseline`);
    });
    mapRuntime.on('error', (event) => {
      if (event?.error?.message) setStatus(`Map error: ${event.error.message}`);
    });
  } catch (error) {
    mapRuntime?.remove();
    mapRuntime = null;
    setStatus(error instanceof Error ? error.message : 'Map unavailable; use the coverage table below.');
  } finally {
    mapInitializing = false;
  }
}

updateDetail(selectedStateId);
const observer = new ResizeObserver(() => initializeMap());
observer.observe(mapContainer);
const visibility = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) initializeMap();
});
visibility.observe(mapContainer);
