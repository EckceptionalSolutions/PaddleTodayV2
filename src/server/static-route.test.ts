import { mkdtempSync, writeFileSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { ServerResponse } from 'node:http';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { resolveNotFoundPage, sendStatic } from './static-route';

const directory = mkdtempSync(join(tmpdir(), 'paddletoday-404-'));
const page = join(directory, '404.html');
const markup = '<h1>Not found</h1>';
writeFileSync(page, markup);
afterAll(() => { unlinkSync(page); rmdirSync(directory); });

describe('HTML not-found recovery', () => {
  it.each([
    ['/missing', 'text/html', true],
    ['/missing', 'application/xhtml+xml, text/html;q=0.9, */*;q=0.8', true],
    ['/missing', 'TEXT/HTML; Q=0.5', true],
    ['/missing', 'application/json', false],
    ['/missing', 'text/html;q=0, application/json', false],
    ['/missing', '*/*', false],
    ['/missing', undefined, false],
    ['/api', 'text/html', false],
    ['/api/missing', 'text/html', false],
    ['/apiary/missing', 'text/html', true],
  ])('selects the recovery page for %s with Accept %s', (path, accept, expected) => {
    expect(resolveNotFoundPage(path, accept, directory)).toBe(expected ? page : null);
  });

  it('retains the ordinary fallback when no recovery file exists', () => {
    expect(resolveNotFoundPage('/missing', 'text/html', join(directory, 'absent'))).toBeNull();
  });

  it('sends a bodyless 404 HEAD response without success caching', () => {
    const response = { writeHead: vi.fn(), end: vi.fn() } as unknown as ServerResponse;
    expect(sendStatic(response, page, false, 404)).toBe(response);
    expect(response.writeHead).toHaveBeenCalledWith(404, expect.objectContaining({
      'content-type': 'text/html; charset=utf-8',
      'content-length': Buffer.byteLength(markup),
      'cache-control': 'no-store',
      'permissions-policy': 'geolocation=(self), microphone=(), camera=()',
    }));
    expect(response.end).toHaveBeenCalledWith();
  });
});
