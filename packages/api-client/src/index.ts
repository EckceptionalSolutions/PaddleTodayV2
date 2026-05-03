import type {
  ApiErrorResponse,
  CreateRiverRequestRequest,
  CreateRiverRequestResponse,
  CreateRouteReportRequest,
  CreateRouteReportResponse,
  CreateRiverAlertRequest,
  CreateRiverAlertResponse,
  RiverDetailResponse,
  RiverGroupResponse,
  RiverHistoryResponse,
  RouteCommunityResponse,
  RiverSummaryResponse,
  WeekendSummaryResponse,
} from '@paddletoday/api-contract';

export class PaddleTodayApiError extends Error {
  readonly status: number;
  readonly code: string | null;
  readonly requestId: string | null;

  constructor(args: { message: string; status: number; code?: string | null; requestId?: string | null }) {
    super(args.message);
    this.name = 'PaddleTodayApiError';
    this.status = args.status;
    this.code = args.code ?? null;
    this.requestId = args.requestId ?? null;
  }
}

export interface RequestOptions {
  signal?: AbortSignal;
}

interface JsonRequestOptions extends RequestOptions {
  body?: unknown;
  headers?: HeadersInit;
  method?: 'GET' | 'POST';
}

export interface RiverHistoryRequestOptions extends RequestOptions {
  days?: number;
}

export interface PaddleTodayApiClient {
  getSummary(options?: RequestOptions): Promise<RiverSummaryResponse>;
  getWeekendSummary(options?: RequestOptions): Promise<WeekendSummaryResponse>;
  getRiverDetail(slug: string, options?: RequestOptions): Promise<RiverDetailResponse>;
  getRiverGroup(riverId: string, options?: RequestOptions): Promise<RiverGroupResponse>;
  getRiverHistory(slug: string, options?: RiverHistoryRequestOptions): Promise<RiverHistoryResponse>;
  getRouteCommunity(slug: string, options?: RequestOptions): Promise<RouteCommunityResponse>;
  createRiverAlert(input: CreateRiverAlertRequest, options?: RequestOptions): Promise<CreateRiverAlertResponse>;
  createRiverRequest(input: CreateRiverRequestRequest, options?: RequestOptions): Promise<CreateRiverRequestResponse>;
  createRouteReport(input: CreateRouteReportRequest, options?: RequestOptions): Promise<CreateRouteReportResponse>;
}

export function createPaddleTodayApiClient(args: {
  baseUrl: string;
  fetchImpl?: typeof fetch;
  headers?: HeadersInit;
}): PaddleTodayApiClient {
  const fetchImpl = args.fetchImpl ?? globalThis.fetch;
  if (typeof fetchImpl !== 'function') {
    throw new Error('A fetch implementation is required to create the PaddleToday API client.');
  }

  const baseUrl = normalizeBaseUrl(args.baseUrl);

  async function requestJson<T>(path: string, options?: JsonRequestOptions): Promise<T> {
    const hasBody = options?.body !== undefined;
    const response = await fetchImpl(new URL(path, baseUrl), {
      method: options?.method ?? 'GET',
      headers: {
        accept: 'application/json',
        ...(hasBody ? { 'content-type': 'application/json' } : {}),
        ...args.headers,
        ...options?.headers,
      },
      signal: options?.signal,
      body: hasBody ? JSON.stringify(options.body) : undefined,
    });
    const payload = await readJsonBody(response);

    if (!response.ok) {
      const errorPayload = isApiErrorResponse(payload) ? payload : null;
      throw new PaddleTodayApiError({
        message:
          errorPayload?.message ??
          buildResponseErrorMessage(response.status, payload),
        status: response.status,
        code: errorPayload?.error ?? null,
        requestId: errorPayload?.requestId ?? null,
      });
    }

    if (!isJsonObject(payload)) {
      throw new PaddleTodayApiError({
        message: buildInvalidSuccessBodyMessage(response.status, payload),
        status: response.status,
      });
    }

    return payload as T;
  }

  return {
    getSummary(options) {
      return requestJson<RiverSummaryResponse>('/api/rivers/summary.json', options);
    },
    getWeekendSummary(options) {
      return requestJson<WeekendSummaryResponse>('/api/weekend/summary.json', options);
    },
    getRiverDetail(slug, options) {
      return requestJson<RiverDetailResponse>(
        `/api/rivers/${encodeURIComponent(slug)}.json`,
        options
      );
    },
    getRiverGroup(riverId, options) {
      return requestJson<RiverGroupResponse>(
        `/api/river-groups/${encodeURIComponent(riverId)}.json`,
        options
      );
    },
    getRiverHistory(slug, options) {
      const days = options?.days ?? 7;
      return requestJson<RiverHistoryResponse>(
        `/api/rivers/${encodeURIComponent(slug)}/history.json?days=${encodeURIComponent(String(days))}`,
        options
      );
    },
    getRouteCommunity(slug, options) {
      return requestJson<RouteCommunityResponse>(
        `/api/rivers/${encodeURIComponent(slug)}/community.json`,
        options
      );
    },
    createRiverAlert(input, options) {
      return requestJson<CreateRiverAlertResponse>('/api/alerts', {
        ...options,
        method: 'POST',
        body: input,
      });
    },
    createRiverRequest(input, options) {
      return requestJson<CreateRiverRequestResponse>('/api/river-request', {
        ...options,
        method: 'POST',
        body: input,
      });
    },
    createRouteReport(input, options) {
      return requestJson<CreateRouteReportResponse>('/api/route-photo-submissions', {
        ...options,
        method: 'POST',
        body: input,
      });
    },
  };
}

function normalizeBaseUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error('PaddleToday API base URL cannot be empty.');
  }

  return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
}

async function readJsonBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new PaddleTodayApiError({
      message: buildInvalidSuccessBodyMessage(response.status, text),
      status: response.status,
    });
  }
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (!isJsonObject(value)) {
    return false;
  }

  return typeof value.error === 'string' && (value.message === undefined || typeof value.message === 'string');
}

function buildResponseErrorMessage(status: number, body: unknown) {
  if (typeof body === 'string' && body.trim()) {
    return `PaddleToday API request failed with HTTP ${status}: ${body}`;
  }

  return `PaddleToday API request failed with HTTP ${status}.`;
}

function buildInvalidSuccessBodyMessage(status: number, body: unknown) {
  if (typeof body === 'string') {
    return `PaddleToday API returned invalid JSON for HTTP ${status}: ${body}`;
  }

  return `PaddleToday API returned an invalid JSON payload for HTTP ${status}.`;
}
