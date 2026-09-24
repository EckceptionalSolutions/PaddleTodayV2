export const ACCOUNT_SYNC_VERSION = 1;
export const ACCOUNT_SYNC_MAX_OPERATIONS = 100;
export const ACCOUNT_SYNC_MAX_DOCUMENT_BYTES = 2 * 1024 * 1024;
export const ACCOUNT_SYNC_MAX_REQUEST_BYTES = 64 * 1024;

export interface SyncedRoute {
  slug: string;
  riverId?: string;
  name: string;
  reach: string;
  savedAt: string;
  notes?: string;
}

export interface SyncedTripDraft {
  target: {
    routeSlug: string;
    putInId: string | null;
    takeOutId: string | null;
    routeName?: string;
    putInName?: string;
    takeOutName?: string;
  };
  draft: {
    launch: string;
    expected: string;
    checkIn: string;
    groupSize: string;
    boat: string;
    vehicle: string;
    note: string;
  };
  savedAt: string;
}

export type AccountSyncOperation =
  | { operationId: string; epoch: number; baseRevision: number; type: 'put-route'; value: SyncedRoute }
  | { operationId: string; epoch: number; baseRevision: number; type: 'delete-route'; slug: string }
  | { operationId: string; epoch: number; baseRevision: number; type: 'put-draft'; value: SyncedTripDraft }
  | { operationId: string; epoch: number; baseRevision: number; type: 'delete-draft'; target: SyncedTripDraft['target'] };

export interface AccountSyncRequest {
  version: number;
  deviceId: string;
  epoch: number;
  operations: AccountSyncOperation[];
}

export interface AccountSyncReceipt {
  operationId: string;
  status: 'applied' | 'already-applied' | 'conflict';
  revision: number;
  entity: SyncedRoute | SyncedTripDraft | null;
}

export interface AccountSyncSnapshot {
  version: number;
  epoch: number;
  revision: number;
  updatedAt: string | null;
  routes: SyncedRoute[];
  drafts: SyncedTripDraft[];
  receipts: AccountSyncReceipt[];
  entityRevisions: { routes: Record<string, number>; drafts: Record<string, number> };
}

const maxText = (value: unknown, length: number): value is string =>
  typeof value === 'string' && value.length <= length;
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const dateString = (value: unknown) => typeof value === 'string' && Number.isFinite(Date.parse(value));
const uuid = (value: unknown): value is string => typeof value === 'string'
  && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export function isSyncedRoute(value: unknown): value is SyncedRoute {
  return isRecord(value) && maxText(value.slug, 160) && value.slug.length > 0
    && (value.riverId === undefined || maxText(value.riverId, 180))
    && maxText(value.name, 240) && maxText(value.reach, 300) && dateString(value.savedAt)
    && (value.notes === undefined || maxText(value.notes, 2000));
}

export function isSyncedTripDraft(value: unknown): value is SyncedTripDraft {
  if (!isRecord(value) || !isRecord(value.target) || !isRecord(value.draft)) return false;
  const target = value.target;
  const draft = value.draft;
  return maxText(target.routeSlug, 160) && target.routeSlug.length > 0
    && (target.putInId === null || maxText(target.putInId, 180))
    && (target.takeOutId === null || maxText(target.takeOutId, 180))
    && (target.routeName === undefined || maxText(target.routeName, 240))
    && (target.putInName === undefined || maxText(target.putInName, 240))
    && (target.takeOutName === undefined || maxText(target.takeOutName, 240))
    && maxText(draft.launch, 80) && maxText(draft.expected, 80) && maxText(draft.checkIn, 80)
    && maxText(draft.groupSize, 30) && maxText(draft.boat, 120) && maxText(draft.vehicle, 120)
    && maxText(draft.note, 2000) && dateString(value.savedAt);
}

export function isAccountSyncRequest(value: unknown): value is AccountSyncRequest {
  if (!isRecord(value) || value.version !== ACCOUNT_SYNC_VERSION || !Number.isSafeInteger(value.epoch)
    || (value.epoch as number) < 1 || !uuid(value.deviceId)
    || !Array.isArray(value.operations) || value.operations.length > ACCOUNT_SYNC_MAX_OPERATIONS) return false;
  return value.operations.every((item) => {
    if (!isRecord(item) || !uuid(item.operationId)
      || !Number.isSafeInteger(item.epoch) || item.epoch !== value.epoch
      || !Number.isSafeInteger(item.baseRevision) || (item.baseRevision as number) < 0) return false;
    if (item.type === 'put-route') return isSyncedRoute(item.value);
    if (item.type === 'delete-route') return maxText(item.slug, 160) && item.slug.length > 0;
    if (item.type === 'put-draft') return isSyncedTripDraft(item.value);
    if (item.type === 'delete-draft' && isRecord(item.target)) {
      const target = item.target;
      return maxText(target.routeSlug, 160) && target.routeSlug.length > 0
        && (target.putInId === null || maxText(target.putInId, 180))
        && (target.takeOutId === null || maxText(target.takeOutId, 180));
    }
    return false;
  });
}
