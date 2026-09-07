import { afterEach, describe, expect, it, vi } from 'vitest';
import { PaddleTodayApiError, createPaddleTodayApiClient } from './index';

describe('@paddletoday/api-client', () => {
  afterEach(() => vi.useRealTimers());

  it.each([200, 429, 502])('keeps proxy response text out of user guidance for HTTP %s', async (status) => {
    const client = createPaddleTodayApiClient({
      baseUrl: 'https://api.example.com',
      fetchImpl: async () => new Response('<html>upstream proxy diagnostic</html>', { status }),
    });
    await expect(client.getSummary()).rejects.toMatchObject({
      name: 'PaddleTodayApiError', status,
      message: status === 502 ? 'PaddleToday is temporarily unavailable. Please try again shortly.'
        : status === 429 ? 'PaddleToday is receiving too many requests. Wait a moment and try again.'
          : 'PaddleToday could not read the response. Please try again.',
    });
  });

  it.each([
    new Headers({ 'X-Client': 'shared', Accept: 'application/problem+json' }),
    [['X-Client', 'shared'], ['Accept', 'application/problem+json']] as [string, string][],
    { 'X-Client': 'shared', Accept: 'application/problem+json' },
  ])('merges standard header inputs with case-insensitive request overrides', async (headers) => {
    const client = createPaddleTodayApiClient({
      baseUrl: 'https://api.example.com', headers,
      fetchImpl: async (_url, init) => {
        expect(init?.headers).toEqual({ accept: 'application/problem+json', 'x-client': 'request', 'x-request-test': 'local-only' });
        return Response.json({ rivers: [] });
      },
    });
    await client.getSummary({ headers: new Headers({ 'x-client': 'request', 'X-Request-Test': 'local-only' }) });
    expect(new Headers(headers).get('x-client')).toBe('shared');
  });

  function stalledBody(signal: AbortSignal) {
    return new Response(new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('{"rivers":'));
        signal.addEventListener('abort', () => controller.error(signal.reason), { once: true });
      },
    }), { status: 200 });
  }

  it('times out a body that stalls after successful response headers', async () => {
    vi.useFakeTimers();
    const client = createPaddleTodayApiClient({
      baseUrl: 'https://api.example.com', timeoutMs: 1000,
      fetchImpl: async (_url, init) => stalledBody(init!.signal!),
    });
    const assertion = expect(client.getSummary()).rejects.toMatchObject({
      name: 'PaddleTodayApiError', code: 'request_timeout', status: 0,
    });
    await vi.advanceTimersByTimeAsync(1000);
    await assertion;
    expect(vi.getTimerCount()).toBe(0);
  });

  it('keeps caller cancellation connected while the body is downloading', async () => {
    const controller = new AbortController();
    let bodyStarted!: () => void;
    const started = new Promise<void>((resolve) => { bodyStarted = resolve; });
    const client = createPaddleTodayApiClient({
      baseUrl: 'https://api.example.com', timeoutMs: 1000,
      fetchImpl: async (_url, init) => {
        const response = stalledBody(init!.signal!);
        bodyStarted();
        return response;
      },
    });
    const assertion = expect(client.getSummary({ signal: controller.signal })).rejects.toMatchObject({ name: 'AbortError' });
    await started;
    controller.abort();
    await assertion;
  });

  it('cleans up the deadline after a successful response', async () => {
    vi.useFakeTimers();
    const client = createPaddleTodayApiClient({
      baseUrl: 'https://api.example.com', timeoutMs: 1000,
      fetchImpl: async () => Response.json({ rivers: [] }),
    });
    await expect(client.getSummary()).resolves.toEqual({ rivers: [] });
    expect(vi.getTimerCount()).toBe(0);
  });

  it('parses successful JSON responses and forwards request options', async () => {
    const fetchImpl = async (_input: URL | RequestInfo, init?: RequestInit) => {
      expect(String(_input)).toBe('https://api.example.com/api/rivers/summary.json');
      expect(init?.method).toBe('GET');
      expect(init?.signal).toBeUndefined();
      expect(init?.cache).toBe('no-store');
      expect(init?.headers).toEqual({
        accept: 'application/json',
        'x-client': 'test',
      });

      return new Response(
        JSON.stringify({
          requestId: 'req-1',
          generatedAt: '2026-04-17T12:00:00Z',
          riverCount: 1,
          rivers: [],
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        }
      );
    };

    const client = createPaddleTodayApiClient({
      baseUrl: 'https://api.example.com',
      fetchImpl,
      headers: {
        'x-client': 'test',
      },
    });

    await expect(client.getSummary({ cache: 'no-store' })).resolves.toEqual({
      requestId: 'req-1',
      generatedAt: '2026-04-17T12:00:00Z',
      riverCount: 1,
      rivers: [],
    });
  });

  it('throws a structured API error for error responses with JSON bodies', async () => {
    const client = createPaddleTodayApiClient({
      baseUrl: 'https://api.example.com',
      fetchImpl: async () =>
        new Response(
          JSON.stringify({
            requestId: 'req-2',
            error: 'bad_request',
            message: 'River slug is required.',
          }),
          {
            status: 400,
            headers: {
              'content-type': 'application/json',
            },
          }
        ),
    });

    await expect(client.getWeekendSummary()).rejects.toMatchObject({
      name: 'PaddleTodayApiError',
      status: 400,
      code: 'bad_request',
      requestId: 'req-2',
      message: 'River slug is required.',
    });
  });

  it('surfaces malformed JSON instead of swallowing parse failures', async () => {
    const client = createPaddleTodayApiClient({
      baseUrl: 'https://api.example.com',
      fetchImpl: async () =>
        new Response('{not valid json', {
          status: 500,
          headers: {
            'content-type': 'application/json',
          },
        }),
    });

    await expect(client.getRiverDetail('test-river')).rejects.toMatchObject({
      name: 'PaddleTodayApiError',
      status: 500,
      message: 'PaddleToday is temporarily unavailable. Please try again shortly.',
    });
  });

  it('posts route contribution reports as JSON', async () => {
    const fetchImpl = async (_input: URL | RequestInfo, init?: RequestInit) => {
      expect(String(_input)).toBe('https://api.example.com/api/route-contributions');
      expect(init?.method).toBe('POST');
      expect(init?.headers).toEqual({
        accept: 'application/json',
        'content-type': 'application/json',
      });
      expect(JSON.parse(String(init?.body))).toMatchObject({
        riverSlug: 'cannon-river-welch',
        contributorName: 'Test Paddler',
        contributorEmail: 'test@example.com',
        tripReport: 'Good level with clear access.',
        reviewConsent: true,
        scoringOutcome: {
          schemaVersion: 1,
          observedWaterLevel: 'ideal',
          tripCompletion: 'completed',
          overallVerdict: 'good',
        },
        files: [],
      });

      return new Response(
        JSON.stringify({
          requestId: 'req-3',
          ok: true,
          stored: true,
          storage: 'local',
          submissionId: 'submission-1',
        }),
        { status: 202 }
      );
    };

    const client = createPaddleTodayApiClient({
      baseUrl: 'https://api.example.com',
      fetchImpl,
    });

    await expect(
      client.createRouteContribution({
        riverSlug: 'cannon-river-welch',
        contributorName: 'Test Paddler',
        contributorEmail: 'test@example.com',
        tripReport: 'Good level with clear access.',
        reviewConsent: true,
        scoringOutcome: {
          schemaVersion: 1,
          observedWaterLevel: 'ideal',
          tripCompletion: 'completed',
          overallVerdict: 'good',
        },
        files: [],
      })
    ).resolves.toMatchObject({
      ok: true,
      submissionId: 'submission-1',
    });
  });

  it('posts app feedback as JSON', async () => {
    const fetchImpl = async (_input: URL | RequestInfo, init?: RequestInit) => {
      expect(String(_input)).toBe('https://api.example.com/api/feedback');
      expect(init?.method).toBe('POST');
      expect(JSON.parse(String(init?.body))).toEqual({
        category: 'usability',
        message: 'The route filters are useful but hard to discover.',
        sourceScreen: '/more',
        platform: 'ios',
      });

      return Response.json(
        {
          requestId: 'req-feedback',
          ok: true,
          stored: true,
          storage: 'azure',
          notificationSent: true,
        },
        { status: 202 }
      );
    };

    const client = createPaddleTodayApiClient({
      baseUrl: 'https://api.example.com',
      fetchImpl,
    });

    await expect(
      client.createAppFeedback({
        category: 'usability',
        message: 'The route filters are useful but hard to discover.',
        sourceScreen: '/more',
        platform: 'ios',
      })
    ).resolves.toMatchObject({
      ok: true,
      notificationSent: true,
    });
  });
});
