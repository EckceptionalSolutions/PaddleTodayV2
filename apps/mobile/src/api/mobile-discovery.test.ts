import { QueryClient } from '@tanstack/react-query';
import type { MobileRouteCatalogResponse, MobileSummaryResponse, MobileExploreResponse, MobileWeekendResponse } from '@paddletoday/api-contract';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from './client';
import { loadMobileExplore, loadMobileSummary, loadMobileWeekend } from './mobile-discovery';

vi.mock('./client', () => ({ apiClient: {
  getMobileCatalog: vi.fn(), getMobileSummary: vi.fn(), getMobileExplore: vi.fn(), getMobileWeekend: vi.fn(),
} }));
const clients: QueryClient[] = [];
function client() { const result = new QueryClient(); clients.push(result); return result; }
afterEach(() => { clients.splice(0).forEach(item => item.clear()); vi.resetAllMocks(); });
const scope = { latitude: 45, longitude: -92.8, radiusMiles: 300 };
function catalog(revision = 'current', slugs = ['a']) {
  return { catalogRevision: revision, rivers: slugs.map(slug => ({ slug, state: 'Wisconsin' })) } as MobileRouteCatalogResponse;
}
function conditions(revision = 'current', slugs = ['a']) {
  return { catalogRevision: revision, generatedAt: '2026-10-06T12:00:00Z', scope: { kind: 'nearby', totalRoutes: 1000 },
    rivers: slugs.map(slug => ({ slug, summary: { shortExplanation: 'Check current access.' }, readiness: { status: 'withheld' } })) } as MobileSummaryResponse;
}

describe('mobile metadata reuse', () => {
  it('shares scoped metadata across tabs and fetches only conditions on refresh', async () => {
    vi.mocked(apiClient.getMobileCatalog).mockResolvedValue(catalog());
    vi.mocked(apiClient.getMobileSummary).mockResolvedValue(conditions());
    vi.mocked(apiClient.getMobileExplore).mockResolvedValue(conditions() as MobileExploreResponse);
    const queryClient = client();
    await loadMobileSummary(queryClient, scope);
    await loadMobileExplore(queryClient, scope);
    await loadMobileSummary(queryClient, scope);
    expect(apiClient.getMobileCatalog).toHaveBeenCalledTimes(1);
    expect(apiClient.getMobileSummary).toHaveBeenCalledTimes(2);
    expect(apiClient.getMobileExplore).toHaveBeenCalledTimes(1);
  });
  it('retrieves corrected metadata when the conditions report a new catalog revision', async () => {
    vi.mocked(apiClient.getMobileCatalog).mockResolvedValueOnce(catalog('old')).mockResolvedValueOnce(catalog('new'));
    vi.mocked(apiClient.getMobileSummary).mockResolvedValue(conditions('new'));
    const result = await loadMobileSummary(client(), scope);
    expect(apiClient.getMobileCatalog).toHaveBeenCalledTimes(2);
    expect(result.catalogRevision).toBe('new');
    expect(result.rivers[0].readiness.status).toBe('withheld');
  });
  it('rejects a second revision mismatch instead of attaching scores to old metadata', async () => {
    vi.mocked(apiClient.getMobileCatalog).mockResolvedValue(catalog('old'));
    vi.mocked(apiClient.getMobileSummary).mockResolvedValue(conditions('new'));
    await expect(loadMobileSummary(client(), scope)).rejects.toThrow('catalog changed');
    expect(apiClient.getMobileCatalog).toHaveBeenCalledTimes(2);
  });
  it('loads only the metadata needed for out-of-range Weekend alternatives', async () => {
    vi.mocked(apiClient.getMobileCatalog).mockResolvedValueOnce(catalog()).mockResolvedValueOnce(catalog('current', ['far-away']));
    vi.mocked(apiClient.getMobileWeekend).mockResolvedValue({ ...conditions(), rivers: [{ slug: 'a' }], alternatives: [{ slug: 'far-away' }] } as MobileWeekendResponse);
    const result = await loadMobileWeekend(client(), scope);
    expect(result.rivers.map(item => item.river.slug)).toEqual(['a', 'far-away']);
    expect(apiClient.getMobileCatalog).toHaveBeenLastCalledWith({ slugs: ['far-away'] }, expect.anything());
  });
  it('batches saved collections without losing routes beyond the request limit', async () => {
    const slugs = Array.from({ length: 205 }, (_, index) => `route-${index}`);
    vi.mocked(apiClient.getMobileCatalog).mockImplementation(async selected => catalog('current', selected!.slugs));
    vi.mocked(apiClient.getMobileSummary).mockImplementation(async selected => conditions('current', selected!.slugs));
    const result = await loadMobileSummary(client(), { slugs });
    expect(result.rivers.map(item => item.river.slug).sort()).toEqual([...slugs].sort());
    expect(apiClient.getMobileSummary).toHaveBeenCalledTimes(3);
  });
});
