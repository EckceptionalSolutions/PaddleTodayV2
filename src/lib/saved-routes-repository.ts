import { isSyncedRoute, type AccountSyncOperation, type AccountSyncReceipt, type AccountSyncSnapshot, type SyncedRoute } from '@paddletoday/api-contract';

type RouteOperation = Extract<AccountSyncOperation, { type: 'put-route' | 'delete-route' }>;
interface Intent {
  id: string; slug: string; value: SyncedRoute | null; epoch: number; baseRevision: number;
  at: number; parent?: string; supersedes?: string[]; operation?: RouteOperation; receipt?: AccountSyncReceipt; conflict?: boolean;
}
export interface SavedRoutesTransport {
  get(): Promise<AccountSyncSnapshot>;
  apply(operation: RouteOperation): Promise<{ snapshot: AccountSyncSnapshot; receipts: AccountSyncReceipt[] }>;
}
function validSnapshot(value: AccountSyncSnapshot | null | undefined): value is AccountSyncSnapshot {
  return !!value && value.version === 1 && Number.isSafeInteger(value.epoch) && value.epoch >= 1
    && Number.isSafeInteger(value.revision) && value.revision >= 0
    && Array.isArray(value.routes) && value.routes.every(isSyncedRoute)
    && !!value.entityRevisions?.routes && typeof value.entityRevisions.routes === 'object'
    && Object.values(value.entityRevisions.routes).every(revision => Number.isSafeInteger(revision) && revision >= 0);
}
/** Append-only local edits keep tabs from overwriting each other's pending notes. */
export class SavedRoutesRepository {
  readonly prefix: string;
  private running: Promise<void> | null = null;
  constructor(readonly uid: string, private storage: Storage, private transport: SavedRoutesTransport,
    private active: () => boolean = () => true, private notify: () => void = () => {}) {
    this.prefix = `paddletoday:web-saved:v1:${encodeURIComponent(uid)}:`;
  }
  private read<T>(key: string): T | null { const raw = this.storage.getItem(this.prefix + key); return raw === null ? null : JSON.parse(raw); }
  private write(key: string, value: unknown) { this.storage.setItem(this.prefix + key, JSON.stringify(value)); }
  snapshot(): AccountSyncSnapshot | null {
    const value = this.read<AccountSyncSnapshot>('snapshot');
    if (value && !validSnapshot(value)) throw new Error('Saved account routes could not be read. Local data has been kept for recovery.');
    return value;
  }
  private journal(): Intent[] {
    const entries: Intent[] = [];
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (!key?.startsWith(this.prefix + 'edit:')) continue;
      const entry = JSON.parse(this.storage.getItem(key)!);
      if (!entry?.id || typeof entry.slug !== 'string' || (entry.value !== null && !isSyncedRoute(entry.value))) throw new Error('A pending saved-route edit could not be read. It has been kept for recovery.');
      entries.push(entry);
    }
    return entries.sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
  }
  pending(): Intent[] {
    const entries = this.journal(), superseded = new Set(entries.flatMap(e => e.supersedes || []));
    return entries.filter(e => !e.receipt || e.receipt.status === 'conflict').filter(e => !superseded.has(e.id));
  }
  routes(): SyncedRoute[] {
    const routes = new Map((this.snapshot()?.routes || []).map(r => [r.slug, r]));
    for (const edit of this.pending()) { if (edit.value) routes.set(edit.slug, edit.value); else routes.delete(edit.slug); }
    return [...routes.values()].sort((a, b) => b.savedAt.localeCompare(a.savedAt));
  }
  conflicts() {
    const pending = this.pending(), slugs = new Set(pending.filter(e => e.conflict || e.receipt?.status === 'conflict').map(e => e.slug));
    return [...slugs].map(slug => ({ slug, local: pending.filter(e => e.slug === slug).at(-1)!.value,
      cloud: this.snapshot()?.routes.find(r => r.slug === slug) || null }));
  }
  observe(slug: string) {
    const snapshot = this.snapshot();
    if (!snapshot) throw new Error('Connect once to load your account routes before saving changes.');
    const previous = this.pending().filter(e => e.slug === slug).at(-1);
    return { epoch: snapshot.epoch, baseRevision: snapshot.entityRevisions.routes[slug] || 0, parent: previous?.id, at: previous?.at || 0 };
  }
  set(slug: string, value: SyncedRoute | null, supersedes?: string[], conflict = false, observed?: ReturnType<SavedRoutesRepository['observe']>) {
    if (!this.active()) throw new Error('Your account changed. Reopen Saved routes before editing.');
    const snapshot = this.snapshot();
    if (!snapshot) throw new Error('Connect once to load your account routes before saving changes.');
    if (value && (!isSyncedRoute(value) || value.slug !== slug)) throw new Error('This route or note cannot be saved. Keep notes within 2,000 characters.');
    const base = observed || this.observe(slug);
    const edit: Intent = { id: crypto.randomUUID(), slug, value, epoch: base.epoch,
      baseRevision: base.baseRevision, at: Math.max(Date.now(), base.at + 1),
      ...(!supersedes && base.parent ? { parent: base.parent } : {}), ...(conflict ? { conflict: true } : {}), ...(supersedes ? { supersedes } : {}) };
    this.write('edit:' + edit.id, edit); this.notify();
  }
  resolve(slug: string, choice: 'local' | 'cloud') {
    const conflict = this.conflicts().find(c => c.slug === slug);
    if (!conflict) return;
    // A new operation against the reviewed revision also catches subsequent remote edits.
    this.set(slug, choice === 'local' ? conflict.local : conflict.cloud, this.pending().filter(e => e.slug === slug).map(e => e.id));
  }
  importRoutes(routes: SyncedRoute[]) {
    const snapshot = this.snapshot();
    if (!snapshot) throw new Error('Load account routes before importing.');
    for (const route of routes) {
      const fingerprint = JSON.stringify(route);
      const marker = 'import:' + encodeURIComponent(route.slug);
      if (this.read<string>(marker) === fingerprint) continue;
      const existing = this.routes().find(r => r.slug === route.slug);
      const sameContent = existing && existing.name === route.name && existing.reach === route.reach && (existing.notes || '') === (route.notes || '');
      const prior = this.pending().find(e => e.slug === route.slug && JSON.stringify(e.value) === fingerprint);
      if (!sameContent && !prior) {
        this.set(route.slug, route, undefined, Boolean(existing));
      }
      this.write(marker, fingerprint);
    }
    this.notify();
  }
  private accept(snapshot: AccountSyncSnapshot) {
    if (!validSnapshot(snapshot)) throw new Error('The account response could not be read. Your saved routes have not been replaced.');
    const current = this.snapshot();
    if (!current || snapshot.epoch > current.epoch || (snapshot.epoch === current.epoch && snapshot.revision >= current.revision)) this.write('snapshot', snapshot);
  }
  sync(): Promise<void> {
    if (this.running) return this.running;
    this.running = this.performSync().finally(() => { this.running = null; });
    return this.running;
  }
  recovery() {
    const data: Record<string, string> = {};
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key?.startsWith(this.prefix)) data[key.slice(this.prefix.length)] = this.storage.getItem(key)!;
    }
    return data;
  }
  private assertActive() { if (!this.active()) throw new Error('Your account changed. Pending edits remain with their original account.'); }
  private async performSync() {
    this.assertActive();
    const remote = await this.transport.get(); this.assertActive(); this.accept(remote);
    // Finite snapshot: edits made while requests are running are handled by the next sync.
    for (const initial of this.pending()) {
      this.assertActive();
      const edit = this.pending().find(e => e.id === initial.id);
      if (!edit || edit.conflict || edit.receipt?.status === 'conflict') continue;
      const parent = edit.parent ? this.read<Intent>('edit:' + edit.parent) : null;
      if (edit.epoch !== remote.epoch || parent?.conflict || parent?.receipt?.status === 'conflict') {
        this.write('edit:' + edit.id, { ...edit, conflict: true }); continue;
      }
      if (parent && !parent.receipt) {
        if (!this.pending().some(entry => entry.id === parent.id)) this.write('edit:' + edit.id, { ...edit, conflict: true });
        continue;
      }
      const operation: RouteOperation = edit.operation || (edit.value
        ? { type: 'put-route', value: edit.value, operationId: edit.id, epoch: edit.epoch, baseRevision: parent?.receipt?.revision ?? edit.baseRevision }
        : { type: 'delete-route', slug: edit.slug, operationId: edit.id, epoch: edit.epoch, baseRevision: parent?.receipt?.revision ?? edit.baseRevision });
      // Store exact request before sending so retries remain idempotent after interruption.
      this.write('edit:' + edit.id, { ...edit, operation });
      const result = await this.transport.apply(operation); this.assertActive();
      const receipt = result.receipts.find(r => r.operationId === edit.id);
      if (!receipt) throw new Error('The server did not confirm this edit. It remains saved on this device.');
      this.accept(result.snapshot);
      this.write('edit:' + edit.id, receipt.status === 'conflict' ? { ...edit, operation, receipt } : { ...edit, value: null, operation: undefined, receipt: { ...receipt, entity: null } });
    }
    this.notify();
  }
}
