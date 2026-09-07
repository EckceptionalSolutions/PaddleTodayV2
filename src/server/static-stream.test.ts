import { createReadStream, type ReadStream } from 'node:fs';
import type { ServerResponse } from 'node:http';
import { PassThrough, Writable } from 'node:stream';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendStatic } from './static-route';

vi.mock('node:fs', async (importOriginal) => ({
  ...await importOriginal<typeof import('node:fs')>(),
  statSync: vi.fn(() => ({ size: 5 })),
  createReadStream: vi.fn(),
}));

afterEach(() => vi.restoreAllMocks());

function transfer() {
  const source = new PassThrough();
  const chunks: Buffer[] = [];
  const target = Object.assign(new Writable({
    write(chunk, _encoding, callback) { chunks.push(Buffer.from(chunk)); callback(); },
  }), { writeHead: vi.fn() });
  vi.mocked(createReadStream).mockReturnValueOnce(source as unknown as ReadStream);
  const closed = new Promise<void>((resolve) => target.once('close', resolve));
  sendStatic(target as unknown as ServerResponse, 'example.html');
  return { source, target, chunks, closed };
}

describe('static file transfer lifecycle', () => {
  it('finishes a successful body', async () => {
    const { source, target, chunks, closed } = transfer();
    source.end('hello');
    await closed;
    expect(Buffer.concat(chunks).toString()).toBe('hello');
    expect(target.writableFinished).toBe(true);
  });

  it('closes a failed read without an unhandled stream error', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { source, target, closed } = transfer();
    source.destroy(new Error('QA read failure'));
    await closed;
    expect(target.destroyed).toBe(true);
    expect(target.writableFinished).toBe(false);
    expect(warn).toHaveBeenCalledWith('Static file transfer failed.', expect.objectContaining({ error: 'QA read failure' }));
  });

  it('stops reading when the client disconnects', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { source, target, closed } = transfer();
    target.destroy();
    await closed;
    await new Promise<void>((resolve) => source.closed ? resolve() : source.once('close', resolve));
    expect(source.destroyed).toBe(true);
    expect(warn).not.toHaveBeenCalled();
  });
});
