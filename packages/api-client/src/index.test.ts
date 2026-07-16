import { describe, expect, it } from 'vitest';
import { PaddleTodayApiError, createPaddleTodayApiClient } from './index';

describe('@paddletoday/api-client', () => {
  it('parses successful JSON responses and forwards request options', async () => {
    const fetchImpl = async (_input: URL | RequestInfo, init?: RequestInit) => {
      expect(String(_input)).toBe('https://api.example.com/api/rivers/summary.json');
      expect(init?.method).toBe('GET');
      expect(init?.signal).toBeUndefined();
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

    await expect(client.getSummary()).resolves.toEqual({
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
      message: 'PaddleToday API returned invalid JSON for HTTP 500: {not valid json',
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
