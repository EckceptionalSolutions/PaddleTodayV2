import type { RiverDetailApiResult } from '@paddletoday/api-contract';
import { createPaddleTodayApiClient } from '@paddletoday/api-client';
import { embedOptions, embedConditions, embedDateTime, routeEmbedPlanUrl, routeEmbedBrandUrl } from '../lib/route-embed';

const card = document.querySelector<HTMLElement>('[data-route-embed]');
if (card) {
  const api = createPaddleTodayApiClient({
    baseUrl: location.origin, timeoutMs: 15_000,
    fetchImpl: (input, init) => globalThis.fetch(input, { ...init, credentials: 'omit' }),
  });
  const slug = card.dataset.slug!;
  let options = embedOptions(new URLSearchParams(location.search));
  let preview = new URLSearchParams(location.search).get('preview') === '1';
  const link = card.querySelector<HTMLAnchorElement>('[data-plan-link]')!;
  // Preserve the configured public origin; partners must always leave the iframe.
  const planOrigin = new URL(link.href).origin;
  const configure = () => {
    document.documentElement.dataset.theme = options.theme;
    document.documentElement.dataset.layout = options.layout;
    document.documentElement.dataset.accent = options.accent;
    const planUrl = routeEmbedPlanUrl(planOrigin, slug, options.partner);
    const brandUrl = routeEmbedBrandUrl(planOrigin, slug, options.partner);
    if (preview) {
      planUrl.searchParams.set('utm_campaign', 'route-embed-preview');
      brandUrl.searchParams.set('utm_campaign', 'route-embed-preview');
    }
    link.href = planUrl.href;
    card.querySelector<HTMLAnchorElement>('[data-brand-link]')!.href = brandUrl.href;
    card.querySelector<HTMLElement>('[data-brand]')!.hidden = !options.branding;
  };
  configure();
  let parentOrigin = '*';
  try { if (document.referrer) parentOrigin = new URL(document.referrer).origin; } catch { /* No referring page. */ }
  const resize = () => {
    if (parent !== window) parent.postMessage({ type: 'paddletoday:embed:resize', height: card.getBoundingClientRect().height }, parentOrigin);
  };
  new ResizeObserver(resize).observe(card);
  window.addEventListener('message', event => {
    if (event.source === parent && event.data?.type === 'paddletoday:embed:measure') resize();
    // Only the same-origin builder can edit a preview in place. Partner pages
    // keep the settings in their embed URL and cannot inject card content.
    if (event.source === parent && event.origin === location.origin
      && event.data?.type === 'paddletoday:embed:configure' && typeof event.data.query === 'string'
      && event.data.query.length < 512) {
      const params = new URLSearchParams(event.data.query);
      options = embedOptions(params);
      preview = params.get('preview') === '1';
      configure();
      history.replaceState(null, '', `${location.pathname}?${params}`);
    }
  });
  let last: { result: RiverDetailApiResult; snapshotStatus?: string } | null = null;
  let failed = false;
  let loading = false;
  const set = (selector: string, value: string) => { card.querySelector<HTMLElement>(selector)!.textContent = value; };
  const status = (state: string, text: string) => {
    card.querySelector<HTMLElement>('[data-reading-status]')!.dataset.state = state;
    set('[data-status-text]', text);
  };
  const forecastScroll = card.querySelector<HTMLElement>('.embed-forecast-scroll')!;
  const previousHour = card.querySelector<HTMLButtonElement>('[data-forecast-previous]')!;
  const nextHour = card.querySelector<HTMLButtonElement>('[data-forecast-next]')!;
  const updateForecastControls = () => {
    const max = forecastScroll.scrollWidth - forecastScroll.clientWidth;
    card.querySelector<HTMLElement>('[data-forecast-controls]')!.hidden = max <= 1;
    previousHour.disabled = forecastScroll.scrollLeft <= 1;
    nextHour.disabled = forecastScroll.scrollLeft >= max - 1;
  };
  previousHour.addEventListener('click', () => forecastScroll.scrollBy({ left: -forecastScroll.clientWidth * .8 }));
  nextHour.addEventListener('click', () => forecastScroll.scrollBy({ left: forecastScroll.clientWidth * .8 }));
  forecastScroll.addEventListener('scroll', updateForecastControls, { passive: true });
  new ResizeObserver(updateForecastControls).observe(forecastScroll);
  let forecastKey = '';
  function render() {
    const conditions = embedConditions(last?.result ?? null, last?.snapshotStatus, { failed, planning: card!.dataset.planning === 'true' });
    const { reading, score, weather, band, forecast, date } = conditions;
    const localTime = (timestamp: string) => {
      const observed = embedDateTime(timestamp, forecast.reference, forecast.timeZone)!;
      return `${observed.dateKey === date?.dateKey ? '' : `${observed.dateLabel} · `}${observed.timeLabel}${forecast.hours.length ? '' : ` ${observed.zoneLabel}`}`;
    };
    const fullTime = (timestamp: string) => {
      const observed = embedDateTime(timestamp, forecast.reference, forecast.timeZone)!;
      return `${observed.dateLabel} · ${observed.timeLabel} ${observed.zoneLabel}`;
    };
    const dateElement = card!.querySelector<HTMLTimeElement>('[data-conditions-date]')!;
    dateElement.textContent = date?.dateLabel ?? 'Date unavailable';
    dateElement.dateTime = last?.result.generatedAt ?? '';
    dateElement.title = date && last ? `Snapshot: ${fullTime(last.result.generatedAt)}` : '';
    set('[data-date-label]', failed || reading?.stale || weather.stale ? 'Last snapshot' : 'Conditions for');
    const planning = card!.dataset.planning === 'true';
    card!.querySelector<HTMLElement>('.embed-score')!.dataset.scoreTone = score.tone;
    const scoreRing = card!.querySelector<HTMLElement>('[data-score-ring]')!;
    scoreRing.style.setProperty('--score-angle', `${(score.value ?? 0) * 3.6}deg`);
    scoreRing.setAttribute('aria-label', score.value === null ? score.label : `Score ${score.value} out of 100. ${score.label}.`);
    set('[data-score-value]', score.value === null ? '—' : String(score.value));
    set('[data-score-label]', score.label);
    set('[data-score-detail]', score.detail);
    set('[data-weather-temp]', weather.temperature);
    set('[data-weather-condition]', weather.condition);
    set('[data-weather-wind]', weather.wind);
    set('[data-weather-wind-label]', weather.windLabel);
    set('[data-weather-rain]', weather.rain);
    set('[data-weather-status]', weather.status);
    card!.querySelector<HTMLElement>('.embed-weather')!.dataset.weatherState = !weather.available ? 'unavailable' : weather.stale ? 'stale' : 'live';
    card!.querySelector<HTMLElement>('[data-weather-icon]')!.dataset.weatherIcon = weather.kind;
    const weatherDate = Date.parse(weather.observedAt ?? '');
    set('[data-weather-observed]', Number.isFinite(weatherDate) ? `Observed ${localTime(weather.observedAt!)}` : '');
    card!.querySelector<HTMLElement>('[data-weather-observed]')!.title = Number.isFinite(weatherDate) ? fullTime(weather.observedAt!) : '';
    const forecastElement = card!.querySelector<HTMLElement>('[data-forecast]')!;
    forecastElement.hidden = forecast.hours.length === 0;
    card!.querySelector<HTMLElement>('[data-forecast-empty]')!.hidden = forecast.hours.length > 0;
    set('[data-forecast-dates]', forecast.dates);
    set('[data-forecast-zone]', forecast.zone);
    // Avoid replacing focused/scrolled hours on the one-minute freshness tick.
    const nextForecastKey = JSON.stringify(forecast.hours);
    if (nextForecastKey !== forecastKey) {
      forecastKey = nextForecastKey;
      const list = card!.querySelector<HTMLOListElement>('[data-forecast-hours]')!;
      const template = document.querySelector<HTMLTemplateElement>('[data-forecast-hour]')!;
      list.replaceChildren(...forecast.hours.map(hour => {
        const item = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
        const time = item.querySelector('time')!;
        time.dateTime = hour.time;
        time.textContent = hour.label;
        item.querySelector<HTMLElement>('[data-weather-icon]')!.dataset.weatherIcon = hour.kind;
        item.querySelector('[data-hour-temp]')!.textContent = hour.temperature;
        item.querySelector('[data-hour-rain]')!.textContent = hour.rain;
        item.querySelector('[data-hour-wind]')!.textContent = `${hour.wind} mph`;
        item.setAttribute('aria-label', `${hour.fullLabel}. ${hour.condition}. ${hour.temperature}${hour.temperature === '—' ? '' : 'F'}. Rain chance ${hour.rain}. Wind ${hour.wind} mph.`);
        item.title = `${hour.fullLabel} · ${hour.condition}`;
        return item;
      }));
      updateForecastControls();
    }
    const risk = card!.querySelector<HTMLElement>('[data-weather-risk]')!;
    risk.hidden = !weather.risk;
    risk.textContent = weather.risk;
    const bandVisual = card!.querySelector<HTMLElement>('[data-water-band]')!;
    bandVisual.hidden = !band;
    const noBand = card!.querySelector<HTMLElement>('[data-band-unavailable]')!;
    noBand.hidden = !!band;
    noBand.textContent = planning ? 'No calibrated water-level range for this trip.' : 'Water-level guidance unavailable for this reading.';
    if (band) {
      bandVisual.dataset.kind = band.kind;
      bandVisual.dataset.tone = reading?.stale || failed ? 'old' : band.markerTone;
      bandVisual.style.setProperty('--band-start', `${band.usableStart}%`);
      bandVisual.style.setProperty('--band-end', `${band.usableStart + band.usableWidth}%`);
      card!.querySelector<HTMLElement>('[data-band-marker]')!.style.left = `${band.currentPercent}%`;
      set('[data-band-status]', `${reading?.stale || failed ? 'Last reading: ' : ''}${band.statusLabel}`);
      set('[data-band-range]', band.targetLabel);
      set('[data-band-low]', band.kind === 'minimum-only' ? 'Below minimum' : 'Low');
      set('[data-band-mid]', band.kind === 'minimum-only' ? 'Minimum met' : 'Preferred');
      set('[data-band-high]', band.kind === 'minimum-only' ? 'Upper limit unknown' : 'High');
      bandVisual.setAttribute('aria-label', `${reading?.stale || failed ? 'Older observation. ' : ''}${band.ariaLabel}`);
    }
    const chart = card!.querySelector<HTMLElement>('[data-chart-region]')!;
    const history = card!.querySelector<HTMLElement>('[data-history]')!;
    const note = card!.querySelector<HTMLElement>('[data-reading-note]')!;
    chart.hidden = true;
    history.hidden = true;
    note.hidden = true;
    const change = card!.querySelector<HTMLElement>('[data-change]')!;
    change.hidden = true;
    if (!reading) {
      status(planning ? 'planning' : 'unavailable', planning ? 'Planning route' : 'Reading unavailable');
      set('[data-reading-value]', planning ? 'Trip guide' : '—');
      set('[data-reading-unit]', '');
      set('[data-observed]', planning ? 'No calibrated gauge reading for this trip.' : 'Check the source gauge for the latest conditions.');
      set('[data-trend-label]', 'Trend unavailable');
      set('[data-trend-arrow]', '↔');
      card!.querySelector<HTMLElement>('[data-trend]')!.dataset.trend = 'unknown';
      return;
    }
    status(failed || reading.stale ? 'stale' : 'live', failed ? 'Refresh unavailable' : reading.stale ? 'Older reading' : 'Latest reading');
    set('[data-reading-value]', reading.value);
    set('[data-metric]', reading.metric);
    set('[data-reading-unit]', reading.unit);
    set('[data-observed]', `Observed ${localTime(reading.observedAt)}`);
    card!.querySelector<HTMLElement>('[data-observed]')!.title = fullTime(reading.observedAt);
    set('[data-trend-label]', `${failed || reading.stale ? 'Last trend: ' : ''}${reading.trendLabel}`);
    set('[data-trend-arrow]', { rising: '↗', falling: '↘', steady: '→', unknown: '↔' }[reading.trend]);
    card!.querySelector<HTMLElement>('[data-trend]')!.dataset.trend = reading.trend;
    if (reading.change24h) { change.hidden = false; change.textContent = reading.change24h; }
    if (failed || reading.stale) {
      note.hidden = false;
      note.textContent = failed ? 'Showing the last observation. The latest refresh could not be loaded.' : 'This observation is older. Check the source gauge for current conditions.';
    }
    if (reading.chart) {
      chart.hidden = false;
      history.hidden = false;
      card!.querySelector('[data-chart-line]')!.setAttribute('d', reading.chart.path);
      card!.querySelector('[data-chart-area]')!.setAttribute('d', reading.chart.area);
      set('[data-chart-start]', localTime(reading.chart.start));
      set('[data-chart-end]', localTime(reading.chart.end));
      const format = (value: number) => value.toLocaleString('en-US', { maximumFractionDigits: reading.unit === 'ft' ? 2 : 0 });
      set('[data-chart-duration]', reading.chart.hours < 1 ? 'Recent observations' : `${Math.round(reading.chart.hours)}h of observations`);
      set('[data-chart-range]', `${format(reading.chart.min)}–${format(reading.chart.max)} ${reading.unit}`);
      card!.querySelector('[data-chart]')!.setAttribute('aria-label', `Gauge history from ${fullTime(reading.chart.start)} to ${fullTime(reading.chart.end)}; units ${reading.unit}`);
    }
  }
  async function refresh() {
    if (loading || document.hidden) return;
    loading = true;
    try {
      const payload = await api.getRiverDetail(slug);
      if (payload.result?.river?.slug !== slug || !payload.result.liveData?.gauge) throw new Error('Invalid route reading');
      last = payload;
      failed = false;
    } catch {
      failed = true;
    } finally {
      loading = false;
      render();
    }
  }
  {
    void refresh();
    // Age retained readings even when refreshes fail. Never keep a frozen live badge.
    const ageTimer = setInterval(() => { if (last) render(); }, 60_000);
    const refreshTimer = setInterval(() => { void refresh(); }, 5 * 60_000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) void refresh(); });
    window.addEventListener('pagehide', () => { clearInterval(ageTimer); clearInterval(refreshTimer); }, { once: true });
  }
}
