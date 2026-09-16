// Run after deploying the worker and API from the same catalog revision.
const base = process.env.DEPLOYMENT_BASE_URL || 'https://paddletoday.com';
const read = async path => {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(30_000), cache: 'no-store' });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
};
const [catalog, explore] = await Promise.all([read('/api/rivers/catalog.json'), read('/api/rivers/explore.json')]);
const expected = new Set(catalog.rivers.map(item => item.river.slug));
const actual = new Set(explore.rivers.map(item => item.river.slug));
const missingRoutes = [...expected].filter(slug => !actual.has(slug));
const unexpectedRoutes = [...actual].filter(slug => !expected.has(slug));
console.log(JSON.stringify({
  publicRoutes: expected.size, exploreRoutes: actual.size,
  missingRoutes, unexpectedRoutes, coverage: explore.coverage, snapshotCatalog: explore.snapshotCatalog,
}, null, 2));
if (missingRoutes.length || unexpectedRoutes.length || actual.size !== explore.rivers.length
  || !explore.coverage || explore.coverage.missingScores !== 0) process.exitCode = 1;
