import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  ACCOUNT_SYNC_MAX_REQUEST_BYTES,
  isAccountSyncRequest,
} from '@paddletoday/api-contract';
import { AccountGoneError, AccountSizeLimitError, AccountStorageUnavailableError, accountSyncStorage, StaleSyncEpochError } from '../../lib/account-sync-storage';
import { deleteFirebaseUser, FirebaseAuthUnavailableError, firebaseUserExists, verifyAccountIdToken } from '../account-auth';
import { readJsonBody, sendJson, sendRequestBodyErrorResponse } from '../http';

const attempts = new Map<string, { count: number; resetAt: number }>();

export function accountSyncMethod(pathname: string, method: string) {
  return (pathname === '/api/account' && ['GET', 'POST', 'DELETE', 'OPTIONS'].includes(method))
    || (pathname === '/api/account/sync' && ['GET', 'POST', 'OPTIONS'].includes(method))
    || (pathname === '/api/account/deletion' && ['GET', 'OPTIONS'].includes(method));
}

export async function handleAccountRoute(
  request: IncomingMessage, response: ServerResponse, pathname: string, requestId: string, includeBody: boolean,
) {
  try {
    const token = await verifyAccountIdToken(request.headers.authorization, {
      allowRevoked: pathname === '/api/account/deletion' && request.method === 'GET',
    });
    if (!token) return sendJson(response, 401, { requestId, error: 'authentication_required' }, includeBody, 'no-store');
    const rate = rateLimit(token.uid);
    if (!rate) return sendJson(response, 429, { requestId, error: 'account_rate_limited' }, includeBody, 'no-store');
    const storage = accountSyncStorage();

    if (pathname === '/api/account/deletion' && request.method === 'GET') {
      const deletionRequested = await storage.isDeleted(token.uid);
      if (deletionRequested && await firebaseUserExists(token.uid)) {
        await deleteFirebaseUser(token.uid).catch((error: unknown) => {
          if (!(error && typeof error === 'object' && 'code' in error && error.code === 'auth/user-not-found')) throw error;
        });
      }
      const deletionComplete = deletionRequested && !(await firebaseUserExists(token.uid));
      if (deletionComplete) await storage.completeDeletion(token.uid);
      return sendJson(response, 200, { requestId, deletionRequested, deletionComplete }, includeBody, 'no-store');
    }

    if (pathname === '/api/account' && request.method === 'POST') {
      if (await storage.isDeleted(token.uid)) return sendJson(response, 410, { requestId, error: 'account_deleted' }, includeBody, 'no-store');
      const { document } = await storage.read(token.uid);
      return sendJson(response, 200, { requestId, uid: token.uid, revision: document.revision, epoch: document.epoch }, includeBody, 'no-store');
    }

    if (pathname === '/api/account' && request.method === 'GET') {
      if (await storage.isDeleted(token.uid)) return sendJson(response, 410, { requestId, error: 'account_deleted' }, includeBody, 'no-store');
      const { document } = await storage.read(token.uid);
      return sendJson(response, 200, {
        requestId, uid: token.uid, status: document.status, revision: document.revision,
        epoch: document.epoch, routeCount: Object.values(document.routes).filter((item) => item.value).length,
        draftCount: Object.values(document.drafts).filter((item) => item.value).length,
      }, includeBody, 'no-store');
    }

    if (pathname === '/api/account/sync' && request.method === 'GET') {
      if (await storage.isDeleted(token.uid)) return sendJson(response, 410, { requestId, error: 'account_deleted' }, includeBody, 'no-store');
      const { document } = await storage.read(token.uid);
      return sendJson(response, 200, {
        requestId, snapshot: {
          version: document.version, epoch: document.epoch, revision: document.revision, updatedAt: document.updatedAt,
          routes: Object.values(document.routes).flatMap((item) => item.value ? [item.value] : []),
          drafts: Object.values(document.drafts).flatMap((item) => item.value ? [item.value] : []),
          receipts: Object.values(document.receipts),
          entityRevisions: {
            routes: Object.fromEntries(Object.entries(document.routes).map(([key, item]) => [key, item.revision])),
            drafts: Object.fromEntries(Object.entries(document.drafts).map(([key, item]) => [key, item.revision])),
          },
        },
      }, includeBody, 'no-store');
    }

    if (pathname === '/api/account/sync' && request.method === 'POST') {
      let body: unknown;
      try { body = await readJsonBody(request, ACCOUNT_SYNC_MAX_REQUEST_BYTES); }
      catch (error) { return sendRequestBodyErrorResponse(error, response, requestId, includeBody); }
      if (!isAccountSyncRequest(body)) return sendJson(response, 400, { requestId, error: 'invalid_sync_request' }, includeBody, 'no-store');
      if (await storage.isDeleted(token.uid)) return sendJson(response, 410, { requestId, error: 'account_deleted' }, includeBody, 'no-store');
      const result = await storage.sync(token.uid, body.epoch, body.operations);
      return sendJson(response, 200, { requestId, ...result }, includeBody, 'no-store');
    }

    if (pathname === '/api/account' && request.method === 'DELETE') {
      if (!Number.isInteger(token.auth_time) || Math.floor(Date.now() / 1000) - token.auth_time! > 300) {
        return sendJson(response, 401, { requestId, error: 'recent_authentication_required' }, includeBody, 'no-store');
      }
      await storage.deleteAccount(token.uid);
      await deleteFirebaseUser(token.uid).catch((error: unknown) => {
        if (!(error && typeof error === 'object' && 'code' in error && error.code === 'auth/user-not-found')) throw error;
      });
      await storage.completeDeletion(token.uid);
      return sendJson(response, 200, { requestId, deleted: true }, includeBody, 'no-store');
    }
    return sendJson(response, 405, { requestId, error: 'method_not_allowed' }, includeBody, 'no-store');
  } catch (error) {
    if (error instanceof FirebaseAuthUnavailableError || error instanceof AccountStorageUnavailableError) {
      return sendJson(response, 503, { requestId, error: 'account_service_unavailable' }, includeBody, 'no-store');
    }
    if (error instanceof AccountGoneError) return sendJson(response, 410, { requestId, error: 'account_deleted' }, includeBody, 'no-store');
    if (error instanceof StaleSyncEpochError) return sendJson(response, 409, { requestId, error: 'sync_epoch_expired' }, includeBody, 'no-store');
    if (error instanceof AccountSizeLimitError) return sendJson(response, 413, { requestId, error: 'account_storage_limit' }, includeBody, 'no-store');
    if (error instanceof RangeError) return sendJson(response, 413, { requestId, error: 'sync_operation_limit' }, includeBody, 'no-store');
    console.error('Account operation failed.', { requestId, error: error instanceof Error ? error.name : 'unknown' });
    return sendJson(response, 503, { requestId, error: 'account_operation_failed' }, includeBody, 'no-store');
  }
}

function rateLimit(uid: string) {
  const now = Date.now();
  if (attempts.size > 10_000) {
    for (const [key, entry] of attempts) if (entry.resetAt <= now) attempts.delete(key);
  }
  const current = attempts.get(uid);
  if (!current || current.resetAt <= now) {
    attempts.set(uid, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  current.count += 1;
  return current.count <= 120;
}

export function accountMethodOptions(response: ServerResponse) {
  response.writeHead(204, {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept, authorization',
    'access-control-max-age': '86400',
    'cache-control': 'no-store',
  });
  response.end();
  return response;
}
