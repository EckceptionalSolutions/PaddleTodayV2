import { describe, expect, it, vi } from 'vitest';
import { publicApiCacheUrls, purgePublicApiCache } from './public-api-cache-purge.mjs';

const path = '/api/rivers/allagash-river-churchill-dam-umsaskis/trip.gpx';
const config = { paths: path, token: 'example-token', zoneId: 'a'.repeat(32) };

describe('targeted public API cache invalidation', () => {
  it('accepts exact public API URLs and deduplicates them', () => {
    expect(publicApiCacheUrls(`${path}\n${path}\n/api/river-groups/allagash-river.json\n/api/rivers/example/geometry.json`)).toEqual([
      `https://paddletoday.com${path}`, 'https://paddletoday.com/api/river-groups/allagash-river.json', 'https://paddletoday.com/api/rivers/example/geometry.json',
    ]);
  });
  it.each(['', 'https://other.example/api/rivers/example.json', '/api/account', '/api/trips/private', '/api/rivers/../account', `${path}?all=true`, `${path}#fragment`, '/'])('rejects a broad, private or ambiguous target: %s', input => {
    expect(() => publicApiCacheUrls(input)).toThrow();
  });
  it('rejects an oversized batch', () => {
    expect(() => publicApiCacheUrls(Array.from({length:11},(_,i)=>`/api/rivers/river-${i}.json`).join('\n'))).toThrow();
  });
  it('sends only the validated URL list, without broad purge fields', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({success:true,result:{id:'purge-id'}})));
    const result = await purgePublicApiCache({...config,fetchImpl});
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, options] = fetchImpl.mock.calls[0];
    expect(url).toBe(`https://api.cloudflare.com/client/v4/zones/${config.zoneId}/purge_cache`);
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual({files:[`https://paddletoday.com${path}`]});
    expect(result).toMatchObject({status:'purge-accepted',requestId:'purge-id'});
  });
  it.each([403,200])('reports rejected purges without leaking reflected credentials (HTTP %s)', async status => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({success:false,errors:[{code:10000,message:config.token}]}),{status}));
    const error = await purgePublicApiCache({...config,fetchImpl}).catch(error => error);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toContain(`HTTP ${status}; codes: 10000`);
    expect(error.message).not.toContain(config.token);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
  it('does not send a request without configuration', async () => {
    const fetchImpl = vi.fn();
    await expect(purgePublicApiCache({...config,token:'',fetchImpl})).rejects.toThrow('must be configured');
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
