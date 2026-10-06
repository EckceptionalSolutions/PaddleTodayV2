import type { BinaryStorage } from './binary-storage';

export function memoryBinaryStorage(): BinaryStorage {
  const entries = new Map<string, { bytes: Buffer; modifiedAt: string }>();
  return {
    async write(name, bytes) { entries.set(name, { bytes: Buffer.from(bytes), modifiedAt: new Date().toISOString() }); },
    async read(name) { const entry = entries.get(name); return entry ? Buffer.from(entry.bytes) : null; },
    async delete(name) { entries.delete(name); },
    async list(prefix) { return [...entries].filter(([name]) => name.startsWith(prefix)).map(([name, entry]) => ({ name, modifiedAt: entry.modifiedAt })); },
    async listPage(prefix, cursor, pageSize) {
      const remaining = (await this.list(prefix)).filter(entry => cursor === null || entry.name > cursor).sort((a,b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      const page = remaining.slice(0, pageSize);
      return { entries: page, nextCursor: remaining.length > page.length ? page.at(-1)!.name : null };
    },
  };
}
