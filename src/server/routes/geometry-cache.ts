export type CanonicalGeometryFeature = {
  properties?: { routeId?: string; state?: string; source?: string };
  geometry?: { type?: string; coordinates?: unknown };
};

type Entry = { feature: CanonicalGeometryFeature; bytes: number; expiresAt: number };
type Options = { maxEntries?: number; maxBytes?: number; ttlMs?: number; maxMissing?: number; missingTtlMs?: number; now?: () => number };

/** Source byte accounting plus an entry limit bounds retained geometry; parsed-object RSS is larger. */
export class GeometryCache {
  private values = new Map<string, Entry>();
  private missing = new Map<string, number>();
  private pending = new Map<string, Promise<CanonicalGeometryFeature | null>>();
  private bytes = 0;
  private now: () => number;
  private maxEntries: number;
  private maxBytes: number;
  private ttlMs: number;
  private maxMissing: number;
  private missingTtlMs: number;

  constructor(private read: (slug: string) => Promise<string | null>, options: Options = {}) {
    this.now = options.now ?? Date.now;
    this.maxEntries = options.maxEntries ?? 128;
    this.maxBytes = options.maxBytes ?? 16 * 1024 * 1024;
    this.ttlMs = options.ttlMs ?? 15 * 60 * 1000;
    this.maxMissing = options.maxMissing ?? 128;
    this.missingTtlMs = options.missingTtlMs ?? 60 * 1000;
  }

  stats() { return { entries: this.values.size, sourceBytes: this.bytes, missing: this.missing.size, inflight: this.pending.size }; }

  async load(slug: string): Promise<CanonicalGeometryFeature | null> {
    if (!/^[a-z0-9-]+$/.test(slug)) return null;
    const now = this.now();
    this.prune(now);
    const cached = this.values.get(slug);
    if (cached) { this.values.delete(slug); this.values.set(slug, cached); return cached.feature; }
    if (this.missing.has(slug)) return null;
    const pending = this.pending.get(slug);
    if (pending) return pending;
    const loading = this.read(slug).then(raw => {
      if (raw === null) {
        this.missing.set(slug, this.now() + this.missingTtlMs);
        while (this.missing.size > this.maxMissing) this.missing.delete(this.missing.keys().next().value!);
        return null;
      }
      const feature = JSON.parse(raw) as CanonicalGeometryFeature;
      const bytes = Buffer.byteLength(raw, 'utf8');
      if (bytes <= this.maxBytes && this.maxEntries > 0) {
        this.values.set(slug, { feature, bytes, expiresAt: this.now() + this.ttlMs });
        this.bytes += bytes;
        while (this.values.size > this.maxEntries || this.bytes > this.maxBytes) this.remove(this.values.keys().next().value!);
      }
      return feature;
    }).finally(() => this.pending.delete(slug));
    this.pending.set(slug, loading);
    return loading;
  }

  private remove(slug: string) { this.bytes -= this.values.get(slug)!.bytes; this.values.delete(slug); }
  private prune(now: number) {
    for (const [slug, entry] of this.values) if (entry.expiresAt <= now) this.remove(slug);
    for (const [slug, expiresAt] of this.missing) if (expiresAt <= now) this.missing.delete(slug);
  }
}
