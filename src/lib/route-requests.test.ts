import { afterEach, describe, expect, it, vi } from 'vitest';
import { listRouteRequests } from './route-requests';

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
