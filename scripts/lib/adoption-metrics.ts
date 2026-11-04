const mobileEvents = ['app_opened', 'river_hub_viewed', 'corridor_trip_selected', 'route_opened', 'saved_river_toggled', 'native_alert_create_succeeded', 'directions_opened', 'route_report_submitted', 'route_photo_contribution_submitted'];
const webEvents = ['Route card referral', 'Route view', 'Guide-to-route click', 'Submit route request', 'Toggle favorite', 'Submit route alert', 'Share route', 'Open app download', 'Submit condition report', 'Submit route photos', 'river_hub_viewed', 'corridor_trip_selected', 'Open route directions', 'river_hub_no_results'];
type Row = Record<string, any>;
const object = (value: unknown): Row => value && typeof value === 'object' && !Array.isArray(value) ? value as Row : {};
const count = (value: unknown) => {
  if (!Number.isSafeInteger(value) || Number(value) < 0) throw new Error('Analytics counts must be nonnegative safe integers.');
  return Number(value);
};
const day = 86_400_000;

/** Select aggregate event counts only. Never retain provider rows, users or properties. */
export function adoptionFromWeekly(input: unknown, now = new Date()) {
  const report = object(input);
  const period = object(object(report.period).current);
  const generatedAt = Date.parse(report.generatedAt);
  if (!Number.isFinite(generatedAt) || generatedAt > now.getTime() + 300_000) throw new Error('Invalid analytics source timestamp.');
  for (const value of [period.startDate, period.endDate]) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || new Date(value).toISOString().slice(0, 10) !== value) throw new Error('Invalid analytics observation period.');
  }
  if (period.startDate > period.endDate || Date.parse(period.endDate) > generatedAt) throw new Error('Invalid analytics observation period.');
  const source = object(report.sources);
  const mobile = object(source.firebase);
  const web = object(source.umami);
  const mobileCounts: Record<string, number> = {};
  const webCounts: Record<string, number> = {};
  if (mobile.status === 'ready') {
    const raw = object(mobile.value).productEvents;
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Mobile event aggregates are missing.');
    const values = object(raw);
    for (const name of mobileEvents) mobileCounts[name] = count(object(values[name]).events ?? 0);
  }
  if (web.status === 'ready') {
    const values = object(web.value).conversions;
    if (!Array.isArray(values)) throw new Error('Web event aggregates are missing.');
    for (const row of values) {
      if (webEvents.includes(object(row).name)) webCounts[row.name] = count(row.events);
    }
  }
  const status = (value: Row) => ['ready', 'manual', 'pending', 'error'].includes(value.status) ? value.status : 'pending';
  const warnings: string[] = [];
  if (mobile.status !== 'ready') warnings.push('Mobile analytics unavailable; missing counts are unknown.');
  if (web.status !== 'ready') warnings.push('Web analytics require a dashboard aggregate export on the current Umami plan; web counts are unknown.');
  const observationAgeDays = Math.floor((now.getTime() - Date.parse(`${period.endDate}T23:59:59.999Z`)) / day);
  if (observationAgeDays > 10) warnings.push(`Analytics observation period ended ${observationAgeDays} days ago; refresh the weekly report.`);
  const actions = {
    routeOpens: { mobile: mobileCounts.route_opened ?? null, web: webCounts['Route view'] ?? null },
    hubViews: { mobile: mobileCounts.river_hub_viewed ?? null, web: webCounts.river_hub_viewed ?? null },
    saveToggles: { mobile: mobileCounts.saved_river_toggled ?? null, web: webCounts['Toggle favorite'] ?? null },
    directionsOpens: { mobile: mobileCounts.directions_opened ?? null, web: webCounts['Open route directions'] ?? null },
    noResultSearches: { mobile: null, web: webCounts.river_hub_no_results ?? null },
  };
  const eventCounts: Record<string, number> = {};
  for (const counts of [mobileCounts, webCounts]) for (const [name, value] of Object.entries(counts)) eventCounts[name] = (eventCounts[name] ?? 0) + value;
  return {
    schemaVersion: 2,
    generatedAt: now.toISOString(),
    source: mobile.status === 'ready' || web.status === 'ready' ? 'weekly-product-report' : 'no-export-available',
    sourceGeneratedAt: new Date(generatedAt).toISOString(),
    period: { startDate: period.startDate as string, endDate: period.endDate as string, timezone: String(object(report.period).timezone ?? 'America/Chicago') },
    observationAgeDays,
    sources: { mobile: { status: status(mobile), eventCounts: mobileCounts }, web: { status: status(web), eventCounts: webCounts } },
    eventCount: mobile.status === 'ready' || web.status === 'ready' ? Object.values(eventCounts).reduce((sum, value) => sum + value, 0) : null,
    eventCounts,
    routeViews: actions.routeOpens.mobile === null && actions.routeOpens.web === null ? null : (actions.routeOpens.mobile ?? 0) + (actions.routeOpens.web ?? 0),
    noResultSearches: actions.noResultSearches.web,
    noResultTargets: {},
    actions,
    warnings,
    definitions: ['Counts describe observed events, not unique paddlers or completed trips.', 'Missing providers and unqueried events are unknown, not zero.', 'Save toggles include saves and removals; they are not a count of new saves.', 'No-result coverage is limited to filtered river hubs; route-level demand is unavailable in this aggregate.'],
    nextAction: 'Review route opens, save toggles and directions by platform for the stated week; review Umami in its dashboard until an aggregate export is available.',
  };
}

/** Preserve the original optional local-export input without copying arbitrary properties. */
export function adoptionFromLocal(input: unknown, now = new Date()) {
  if (!Array.isArray(input)) throw new Error('Local adoption export must be an event array.');
  const eventCounts: Record<string, number> = {};
  const noResultTargets: Record<string, number> = {};
  for (const row of input) {
    const event = object(row);
    if (![...mobileEvents, ...webEvents].includes(event.name)) throw new Error('Unknown event in local adoption export.');
    const value = count(event.count ?? 1);
    eventCounts[event.name] = (eventCounts[event.name] ?? 0) + value;
    const route = event.route ?? object(event.properties).river_id;
    if (event.name === 'river_hub_no_results' && typeof route === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(route)) noResultTargets[route] = (noResultTargets[route] ?? 0) + value;
  }
  return { generatedAt: now.toISOString(), source: 'local-privacy-safe-export', eventCount: Object.values(eventCounts).reduce((a, b) => a + b, 0), eventCounts, routeViews: (eventCounts['Route view'] ?? 0) + (eventCounts.route_opened ?? 0), noResultSearches: eventCounts.river_hub_no_results ?? 0, noResultTargets, warnings: ['Local export coverage and observation period must be checked before comparing counts.'], nextAction: 'Use demand and no-result targets in the next bounded research ranking.' };
}
