import { randomUUID } from 'node:crypto';
import { BlobPreconditionError, type JsonStorage } from './blob-storage';
import { isRecord, isString } from './json-guards';

type CaptureLease = { format: 'history-capture-lease-v1'; owner: string; expiresAt: string };
export function isHistoryCaptureLease(value: unknown): value is CaptureLease {
  return isRecord(value) && value.format === 'history-capture-lease-v1' && isString(value.owner)
    && isString(value.expiresAt) && Number.isFinite(Date.parse(value.expiresAt));
}

/** A renewable compare-and-swap lease coordinates CLI and API captures. */
export async function withHistoryCaptureLease<T>(storage: JsonStorage, name: string,
  operation: (assertOwned: () => void) => Promise<T>): Promise<T> {
  const owner = randomUUID();
  const initial = await storage.readJsonWithEtag<CaptureLease>(name);
  if (initial.value && Date.parse(initial.value.expiresAt) > Date.now()) throw new Error('Another history capture is running.');
  const lease = (): CaptureLease => ({ format: 'history-capture-lease-v1', owner, expiresAt: new Date(Date.now() + 300_000).toISOString() });
  const acquired = lease();
  await storage.writeJson(name, acquired, initial.etag ? { ifMatch: initial.etag } : { ifNoneMatch: '*' });
  let ownedUntil = Date.parse(acquired.expiresAt);
  let lost: unknown;
  let renewal: Promise<void> | null = null;
  // Leave more than the storage client's maximum request/retry duration before
  // expiration, so an old writer drains before a new owner can acquire it.
  const assertOwned = () => { if (lost || Date.now() >= ownedUntil - 120_000) throw new Error('History capture lease was lost; stopping writes.', { cause: lost }); };
  const timer = setInterval(() => {
    if (renewal || lost) return;
    renewal = (async () => {
      const current = await storage.readJsonWithEtag<CaptureLease>(name);
      if (current.value?.owner !== owner || Date.parse(current.value.expiresAt) <= Date.now() || !current.etag) throw new Error('History capture ownership changed.');
      const renewed = lease();
      await storage.writeJson(name, renewed, { ifMatch: current.etag });
      ownedUntil = Date.parse(renewed.expiresAt);
    })().catch(error => { lost = error; }).finally(() => { renewal = null; });
  }, 30_000);
  timer.unref?.();
  try {
    const result = await operation(assertOwned);
    assertOwned();
    return result;
  } finally {
    clearInterval(timer);
    await renewal;
    try {
      const current = await storage.readJsonWithEtag<CaptureLease>(name);
      if (current.value?.owner === owner && current.etag) {
        await storage.writeJson(name, { ...current.value, expiresAt: new Date(0).toISOString() }, { ifMatch: current.etag });
      }
    } catch (error) {
      if (!(error instanceof BlobPreconditionError)) console.warn('[history] capture lease cleanup failed; the lease will expire.');
    }
  }
}
