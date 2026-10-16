/** Read a complete, bounded ArcGIS feature query; never accept a partial page as coverage. */
export async function fetchHydrographyPages(
  input: string,
  options: { fetcher?: typeof fetch; timeoutMs?: number; maxPages?: number } = {},
): Promise<{ features: any[]; exceededTransferLimit: false; [key: string]: unknown }> {
  const fetcher = options.fetcher ?? fetch;
  const features: any[] = [];
  const pageSignatures = new Set<string>();
  let first: Record<string, unknown> = {};
  let ordered = false;
  for (let page = 0; page < (options.maxPages ?? 20); page++) {
    const url = new URL(input);
    // Leave the first spatial request unsorted: this service can spend many
    // seconds sorting even a tiny envelope when pagination is requested.
    if (ordered) {
      url.searchParams.set('resultOffset', String(features.length));
      url.searchParams.set('resultRecordCount', '1000');
      url.searchParams.set('orderByFields', 'OBJECTID');
    }
    const response = await fetcher(url, { signal: AbortSignal.timeout(options.timeoutMs ?? 15_000) });
    if (!response.ok) throw new Error(`Hydrography request failed: HTTP ${response.status}`);
    const payload = await response.json();
    if (payload?.error || !Array.isArray(payload?.features)) throw new Error(payload?.error?.message ?? 'Hydrography response has no feature collection');
    if (!page) first = payload;
    if (!payload.features.length && payload.exceededTransferLimit) throw new Error('Hydrography pagination returned an empty truncated page');
    // An unsorted initial page cannot be combined with sorted later pages.
    // Restart the entire collection in stable order when pagination is needed.
    if (!ordered && payload.exceededTransferLimit) { ordered = true; continue; }
    if (payload.features.length) {
      const signature = JSON.stringify(payload.features);
      if (pageSignatures.has(signature)) throw new Error('Hydrography pagination repeated a page; coverage is incomplete');
      pageSignatures.add(signature);
    }
    features.push(...payload.features);
    if (!payload.exceededTransferLimit) return { ...first, features, exceededTransferLimit: false, paginationOrder: ordered ? 'OBJECTID' : null };
    if (!payload.features.length) throw new Error('Hydrography pagination returned an empty truncated page');
  }
  throw new Error('Hydrography query exceeds the bounded page limit; coverage is incomplete');
}
