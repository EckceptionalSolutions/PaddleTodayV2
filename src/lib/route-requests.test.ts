import { afterEach, describe, expect, it, vi } from 'vitest';
import { decodeRouteRequestStorageKeyParam } from './route-request-storage-key';
import { appendRouteRequestReply, listRouteRequests } from './route-requests';

const originalRouteRequestsContainerSasUrl = process.env.ROUTE_REQUESTS_CONTAINER_SAS_URL;
const originalRouteRequestsBlobPrefix = process.env.ROUTE_REQUESTS_BLOB_PREFIX;

afterEach(() => {
  if (originalRouteRequestsContainerSasUrl === undefined) {
    delete process.env.ROUTE_REQUESTS_CONTAINER_SAS_URL;
  } else {
    process.env.ROUTE_REQUESTS_CONTAINER_SAS_URL = originalRouteRequestsContainerSasUrl;
  }

  if (originalRouteRequestsBlobPrefix === undefined) {
    delete process.env.ROUTE_REQUESTS_BLOB_PREFIX;
  } else {
    process.env.ROUTE_REQUESTS_BLOB_PREFIX = originalRouteRequestsBlobPrefix;
  }

  vi.unstubAllGlobals();
});

describe('listRouteRequests', () => {
  it('skips malformed or unreadable Azure blobs without failing the admin list', async () => {
    process.env.ROUTE_REQUESTS_CONTAINER_SAS_URL = 'https://storage.example/container?sig=test';
    process.env.ROUTE_REQUESTS_BLOB_PREFIX = 'route-requests';

    const validRequest = {
      submittedAt: '2026-05-28T12:00:00.000Z',
      routeName: 'Cannon River',
      state: 'MN',
      putIn: 'Put-in',
      takeOut: 'Take-out',
      sources: '',
      notes: 'Please add this route.',
      replyEmail: 'paddler@example.com',
    };

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: string | URL | Request) => {
        const url = String(input);
        if (url.includes('comp=list')) {
          return new Response(
            [
              '<?xml version="1.0" encoding="utf-8"?>',
              '<EnumerationResults><Blobs>',
              '<Blob><Name>route-requests/bad.json</Name></Blob>',
              '<Blob><Name>route-requests/read-fails.json</Name></Blob>',
              '<Blob><Name>route-requests/good.json</Name></Blob>',
              '</Blobs></EnumerationResults>',
            ].join('')
          );
        }

        if (url.includes('/bad.json')) {
          return Response.json({ submittedAt: validRequest.submittedAt });
        }

        if (url.includes('/read-fails.json')) {
          throw new Error('network failure');
        }

        if (url.includes('/good.json')) {
          return Response.json(validRequest);
        }

        return new Response(null, { status: 404 });
      })
    );

    const requests = await listRouteRequests();

    expect(requests).toEqual([{ ...validRequest, _blobName: 'route-requests/good.json' }]);
  });
});

describe('route request storage keys', () => {
  it('decodes opaque base64url route request keys while accepting legacy raw keys', () => {
    const storageKey = 'route-requests/2026-07-20T12-00-00.000Z.json';
    const encoded = Buffer.from(storageKey, 'utf8').toString('base64url');

    expect(decodeRouteRequestStorageKeyParam(`b64.${encoded}`)).toBe(storageKey);
    expect(decodeRouteRequestStorageKeyParam(encodeURIComponent(storageKey))).toBe(storageKey);
  });

  it('updates the exact Azure blob named by the decoded storage key when appending reply metadata', async () => {
    process.env.ROUTE_REQUESTS_CONTAINER_SAS_URL = 'https://storage.example/container?sig=test';
    process.env.ROUTE_REQUESTS_BLOB_PREFIX = 'route-requests';

    const storageKey = 'route-requests/2026-07-20T12-00-00.000Z.json';
    const validRequest = {
      submittedAt: '2026-07-20T12:00:00.000Z',
      routeName: 'Cannon River',
      state: 'MN',
      putIn: 'Put-in',
      takeOut: 'Take-out',
      sources: '',
      notes: 'Please add this route.',
      replyEmail: 'paddler@example.com',
    };
    const writes: Array<{ url: string; body: unknown }> = [];

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
        const url = String(input);
        if (url.includes('comp=list')) {
          return new Response(
            [
              '<?xml version="1.0" encoding="utf-8"?>',
              '<EnumerationResults><Blobs>',
              `<Blob><Name>${storageKey}</Name></Blob>`,
              '</Blobs></EnumerationResults>',
            ].join('')
          );
        }

        if (init?.method === 'PUT') {
          writes.push({ url, body: JSON.parse(String(init.body || '{}')) });
          return new Response(null, { status: 201 });
        }

        if (url.endsWith(`/${storageKey}?sig=test`)) {
          return Response.json(validRequest);
        }

        return new Response(null, { status: 404 });
      })
    );

    const updated = await appendRouteRequestReply(storageKey, {
      sentAt: '2026-07-20T12:05:00.000Z',
      to: 'paddler@example.com',
      from: 'route-requests@paddletoday.com',
      replyTo: 'route-requests@paddletoday.com',
      subject: 'Re: Paddle Today route request - Cannon River',
      provider: 'azure',
      providerId: 'email_123',
    });

    expect(writes).toHaveLength(1);
    expect(writes[0]?.url).toBe(`https://storage.example/container/${storageKey}?sig=test`);
    expect(writes[0]?.body).toMatchObject({
      ...validRequest,
      replies: [
        {
          provider: 'azure',
          providerId: 'email_123',
          subject: 'Re: Paddle Today route request - Cannon River',
        },
      ],
    });
    expect(updated._blobName).toBe(storageKey);
  });
});
