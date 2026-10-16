import { expect, it, vi } from 'vitest';
import { fetchHydrographyPages } from './hydrography-query';
function mockPages(pages: unknown[]) {
  return vi.fn(async () => new Response(JSON.stringify(pages.shift()), { status: 200 })) as unknown as typeof fetch;
}
it('combines paginated responses and offsets by the actual returned count', async () => {
  const fetcher = mockPages([{ features: [{ attributes: { OBJECTID: 99 } }], exceededTransferLimit: true }, { features: [{ attributes: { OBJECTID: 1 } }], exceededTransferLimit: true }, { features: [{ attributes: { OBJECTID: 2 } }] }]);
  const response = await fetchHydrographyPages('https://example.org/query?where=1%3D1', { fetcher });
  expect(response.features).toHaveLength(2);
  expect(new URL(vi.mocked(fetcher).mock.calls[1][0] as URL).searchParams.get('resultOffset')).toBe('0');
  expect(response.features.map(f=>f.attributes.OBJECTID)).toEqual([1,2]);
  expect(response.exceededTransferLimit).toBe(false);
  expect(new URL(vi.mocked(fetcher).mock.calls[2][0] as URL).searchParams.get('resultOffset')).toBe('1');
});
it('rejects truncated coverage at the page limit', async () => {
  await expect(fetchHydrographyPages('https://example.org/query', { fetcher: mockPages([{ features: [1], exceededTransferLimit: true }]), maxPages: 1 })).rejects.toThrow('incomplete');
});
it('rejects ignored pagination offsets', async () => {
  const page = { features: [{ attributes: { OBJECTID: 1 } }], exceededTransferLimit: true };
  await expect(fetchHydrographyPages('https://example.org/query', { fetcher: mockPages([page, page, page]) })).rejects.toThrow('repeated');
});
it('rejects source errors, malformed collections, and empty truncated pages', async () => {
  for (const response of [{ error: { message: 'Unavailable' } }, {}, { features: [], exceededTransferLimit: true }]) {
    await expect(fetchHydrographyPages('https://example.org/query', { fetcher: mockPages([response]) })).rejects.toThrow();
  }
});
it('accepts a complete empty collection without claiming any mapped features', async () => {
  expect((await fetchHydrographyPages('https://example.org/query', { fetcher: mockPages([{ features: [] }]) })).features).toEqual([]);
});
