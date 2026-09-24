import { createHash } from 'node:crypto';
import { createJsonStorage, mutateJson, parseContainerSas, type JsonStorage } from './blob-storage';
import {
  ACCOUNT_SYNC_MAX_DOCUMENT_BYTES,
  ACCOUNT_SYNC_MAX_OPERATIONS,
  ACCOUNT_SYNC_VERSION,
  isSyncedRoute,
  isSyncedTripDraft,
  type AccountSyncOperation,
  type AccountSyncReceipt,
  type AccountSyncSnapshot,
  type SyncedTripDraft,
} from '@paddletoday/api-contract';

export interface AccountDocument {
  version: number;
  uid: string;
  status: 'active' | 'deleting';
  epoch: number;
  revision: number;
  updatedAt: string | null;
  routes: Record<string, { revision: number; value: import('@paddletoday/api-contract').SyncedRoute | null }>;
  drafts: Record<string, { revision: number; value: SyncedTripDraft | null }>;
  receipts: Record<string, AccountSyncReceipt>;
}

export interface SyncResult { snapshot: AccountSyncSnapshot; receipts: AccountSyncReceipt[] }
export interface AccountDeletionDocument {
  uid: string;
  requestedAt: string;
  status: 'requested' | 'completed';
  completedAt: string | null;
}
const MAX_STORED_RECEIPTS = 5000;
export function emptyAccountDocument(uid: string): AccountDocument {
  return { version: ACCOUNT_SYNC_VERSION, uid, status: 'active', epoch: 1, revision: 0, updatedAt: null, routes: {}, drafts: {}, receipts: {} };
}
const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const receipt = (value: unknown): value is AccountSyncReceipt =>
  record(value) && typeof value.operationId === 'string'
  && ['applied', 'already-applied', 'conflict'].includes(String(value.status))
  && Number.isSafeInteger(value.revision)
  && (value.entity === null || isSyncedRoute(value.entity) || isSyncedTripDraft(value.entity));

export function isAccountDocument(value: unknown): value is AccountDocument {
  if (!record(value) || value.version !== ACCOUNT_SYNC_VERSION || typeof value.uid !== 'string'
    || !['active', 'deleting'].includes(String(value.status)) || !Number.isSafeInteger(value.epoch)
    || !Number.isSafeInteger(value.revision) || !record(value.routes) || !record(value.drafts)
    || !record(value.receipts) || !(value.updatedAt === null || typeof value.updatedAt === 'string')) return false;
  return Object.values(value.routes).every((row) => record(row) && Number.isSafeInteger(row.revision)
      && (row.value === null || isSyncedRoute(row.value)))
    && Object.values(value.drafts).every((row) => record(row) && Number.isSafeInteger(row.revision)
      && (row.value === null || isSyncedTripDraft(row.value)))
    && Object.values(value.receipts).every(receipt);
}
function isAccountDeletion(value: unknown): value is AccountDeletionDocument {
  return record(value) && typeof value.uid === 'string' && typeof value.requestedAt === 'string'
    && (value.status === undefined || ['requested', 'completed'].includes(String(value.status)))
    && (value.completedAt === undefined || value.completedAt === null || typeof value.completedAt === 'string');
}

export class AccountGoneError extends Error {}
export class StaleSyncEpochError extends Error {}
export class AccountSizeLimitError extends Error {}
export class AccountStorageUnavailableError extends Error {}

export class AccountSyncStorage {
  constructor(private readonly storage: JsonStorage) {}

  async read(uid: string) {
    const result = await this.storage.readJsonWithEtag<AccountDocument>(accountBlobName(uid));
    const document = result.value ?? emptyAccountDocument(uid);
    if (document.uid !== uid || document.status !== 'active') throw new AccountGoneError();
    return { document, etag: result.etag };
  }

  async sync(uid: string, epoch: number, operations: AccountSyncOperation[]): Promise<SyncResult> {
    if (operations.length > ACCOUNT_SYNC_MAX_OPERATIONS) throw new RangeError('Too many sync operations.');
    const document = await mutateJson({
      storage: this.storage,
      blobName: accountBlobName(uid),
      initial: emptyAccountDocument(uid),
      attempts: 8,
      mutate: (current) => {
        if (current.uid !== uid || current.status !== 'active') throw new AccountGoneError();
        if (epoch !== current.epoch) throw new StaleSyncEpochError();
        const newReceiptCount = operations.filter((operation) => !current.receipts[operation.operationId]).length;
        if (Object.keys(current.receipts).length + newReceiptCount > MAX_STORED_RECEIPTS) {
          // Commit compaction without applying this old-epoch batch. The client
          // must fetch the new snapshot and reconcile its durable outbox.
          current.epoch += 1;
          current.receipts = {};
          current.updatedAt = new Date().toISOString();
          return current;
        }
        for (const operation of operations) applyOperation(current, operation);
        current.updatedAt = new Date().toISOString();
        if (Buffer.byteLength(JSON.stringify(current), 'utf8') > ACCOUNT_SYNC_MAX_DOCUMENT_BYTES) throw new AccountSizeLimitError();
        return current;
      },
    });
    if (document.epoch !== epoch) throw new StaleSyncEpochError();
    return { snapshot: toSnapshot(document), receipts: operations.flatMap((item) => document.receipts[item.operationId] ? [document.receipts[item.operationId]!] : []) };
  }

  async deleteAccount(uid: string) {
    const key = deletionBlobName(uid);
    await mutateJson({
      storage: this.storage,
      blobName: accountBlobName(uid),
      initial: emptyAccountDocument(uid),
      mutate: (current) => {
        if (current.uid !== uid) throw new AccountGoneError();
        if (current.status === 'deleting') return current;
        return { ...emptyAccountDocument(uid), status: 'deleting' as const, epoch: current.epoch + 1 };
      },
    });
    await mutateJson({
      storage: this.storage, blobName: key,
      initial: { uid, requestedAt: '', status: 'requested' as const, completedAt: null },
      mutate: (current: AccountDeletionDocument) => current.uid === uid && current.requestedAt
        ? current : { uid, requestedAt: new Date().toISOString(), status: 'requested' as const, completedAt: null },
    });
    // Keep the emptied account document as a tombstone. Removing it would let an
    // in-flight sync that passed the deletion check recreate the account blob.
  }

  async completeDeletion(uid: string) {
    await mutateJson({
      storage: this.storage,
      blobName: deletionBlobName(uid),
      initial: { uid, requestedAt: '', status: 'requested' as const, completedAt: null },
      mutate: (current: AccountDeletionDocument) => {
        if (current.uid !== uid || !current.requestedAt) throw new AccountGoneError();
        if (current.status === 'completed') return current;
        return { ...current, status: 'completed' as const, completedAt: new Date().toISOString() };
      },
    });
  }

  async isDeleted(uid: string) {
    const tombstone = await this.storage.readJson<AccountDeletionDocument>(deletionBlobName(uid));
    return Boolean(tombstone && isAccountDeletion(tombstone) && tombstone.uid === uid && tombstone.requestedAt);
  }
}

function applyOperation(document: AccountDocument, operation: AccountSyncOperation) {
  if (document.receipts[operation.operationId]) return;
  const route = operation.type === 'put-route' || operation.type === 'delete-route';
  const key = operation.type === 'put-route' ? operation.value.slug
    : operation.type === 'delete-route' ? operation.slug
    : operation.type === 'put-draft' ? draftKey(operation.value.target) : draftKey(operation.target);
  const collection = route ? document.routes : document.drafts;
  const current = collection[key];
  if (operation.baseRevision !== (current?.revision ?? 0)) {
    document.receipts[operation.operationId] = { operationId: operation.operationId, status: 'conflict', revision: current?.revision ?? 0, entity: current?.value ?? null };
    return;
  }
  document.revision += 1;
  const value = operation.type === 'put-route' || operation.type === 'put-draft' ? operation.value : null;
  collection[key] = { revision: document.revision, value } as never;
  document.receipts[operation.operationId] = { operationId: operation.operationId, status: 'applied', revision: document.revision, entity: value };
}
function draftKey(target: SyncedTripDraft['target']) {
  return JSON.stringify([target.routeSlug, target.putInId, target.takeOutId]);
}
function accountBlobName(uid: string) {
  return 'accounts/' + createHash('sha256').update(uid, 'utf8').digest('hex') + '.json';
}
function deletionBlobName(uid: string) {
  return 'account-deletions/' + createHash('sha256').update(uid, 'utf8').digest('hex') + '.json';
}
function toSnapshot(document: AccountDocument): AccountSyncSnapshot {
  return {
    version: document.version, epoch: document.epoch, revision: document.revision, updatedAt: document.updatedAt,
    routes: Object.values(document.routes).flatMap((row) => row.value ? [row.value] : []),
    drafts: Object.values(document.drafts).flatMap((row) => row.value ? [row.value] : []),
    receipts: Object.values(document.receipts),
    entityRevisions: {
      routes: Object.fromEntries(Object.entries(document.routes).map(([key, row]) => [key, row.revision])),
      drafts: Object.fromEntries(Object.entries(document.drafts).map(([key, row]) => [key, row.revision])),
    },
  };
}

let instance: AccountSyncStorage | null = null;
export function accountSyncStorage() {
  if (instance) return instance;
  const sas = process.env.ACCOUNT_DATA_CONTAINER_SAS_URL?.trim();
  if (process.env.NODE_ENV === 'production' && !sas) throw new AccountStorageUnavailableError();
  if (sas) {
    try {
      const parsed = parseContainerSas(sas, { throwOnInvalid: true });
      const url = new URL(sas);
      const permissions = url.searchParams.get('sp') ?? '';
      if (!parsed || (process.env.NODE_ENV === 'production'
        && (url.protocol !== 'https:' || !url.searchParams.get('sig')
          || !['r', 'w', 'c', 'd'].every((permission) => permissions.includes(permission))))) {
        throw new AccountStorageUnavailableError();
      }
    } catch {
      throw new AccountStorageUnavailableError();
    }
  }
  instance = new AccountSyncStorage(createJsonStorage({
    containerSasUrl: sas, localDirectory: '.local/account-data', validate: (value) => isAccountDocument(value) || isAccountDeletion(value),
    label: 'account data', space: 0, timeoutMs: 12_000,
  }));
  return instance;
}
