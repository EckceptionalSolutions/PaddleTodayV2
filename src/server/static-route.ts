import { createReadStream, existsSync, statSync, readFileSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import type { ServerResponse } from 'node:http';
import { pipeline } from 'node:stream';
import { createGunzip } from 'node:zlib';
import { acceptsGzipEncoding, acceptsIdentityEncoding, securityHeaders } from './http';

const PUBLIC_ASSET_EXTENSIONS = new Set(['.css', '.js', '.json', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.woff2', '.ico']);

export type CompressedStaticFile = { sourceBytes: number };

/** The deployment packager emits this bounded, trusted inventory; ordinary local builds omit it. */
export function loadStaticCompressionManifest(rootDir: string | null): Map<string, CompressedStaticFile> {
  const result = new Map<string, CompressedStaticFile>();
  if (!rootDir) return result;
  const file = resolve(rootDir, '.static-compression.json');
  if (!existsSync(file)) {
    if (existsSync(resolve(rootDir, 'index.html.gz'))) throw new Error('Compressed static pages require an inventory');
    return result;
  }
  const manifest = JSON.parse(readFileSync(file, 'utf8')) as Record<string, CompressedStaticFile>;
  for (const [path, entry] of Object.entries(manifest)) {
    const target = safeResolve(rootDir, '/' + path);
    if (!path.endsWith('.html.gz') || !target || !Number.isSafeInteger(entry.sourceBytes) || entry.sourceBytes < 0) throw new Error('Invalid static compression inventory');
    result.set(target, entry);
  }
  return result;
}

export function sendStatic(response: ServerResponse, filePath: string, includeBody = true, statusCode = 200, compressed?: CompressedStaticFile) {
  const stats = statSync(filePath);
  const encoding = String(response.req?.headers['accept-encoding'] ?? '');
  const gzip = compressed && acceptsGzipEncoding(encoding);
  if (compressed && !gzip && !acceptsIdentityEncoding(encoding)) {
    response.writeHead(406, { ...securityHeaders(response), 'content-length': 0, 'cache-control': 'no-store', vary: 'Accept-Encoding' });
    response.end(); return response;
  }
  const logicalPath = compressed ? filePath.slice(0, -3) : filePath;
  response.writeHead(statusCode, {
    ...securityHeaders(response),
    'content-type': contentTypeFor(logicalPath),
    'cache-control': statusCode === 200 ? cacheControlFor(logicalPath) : 'no-store',
    'content-length': compressed && !gzip ? compressed.sourceBytes : stats.size,
    ...(compressed ? { vary: 'Accept-Encoding', ...(gzip ? { 'content-encoding': 'gzip' } : {}) } : {}),
    'access-control-allow-origin': '*',
  });

  if (!includeBody) {
    response.end();
    return response;
  }

  // Close both streams on read failure or client disconnect. Plain pipe leaves
  // read errors unhandled and can continue reading after a client has gone away.
  const complete = (error: NodeJS.ErrnoException | null) => {
    if (error && (error as NodeJS.ErrnoException).code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      console.warn('Static file transfer failed.', { filePath, error: error.message });
    }
  };
  if (compressed && !gzip) pipeline(createReadStream(filePath), createGunzip(), response, complete);
  else pipeline(createReadStream(filePath), response, complete);
  return response;
}

export function resolveStaticFile(pathname: string, rootDir: string): string | null {
  const normalizedPath = pathname === '/' ? '/index.html' : pathname;
  const candidates = normalizedPath.endsWith('/')
    ? [`${normalizedPath}index.html`]
    : [normalizedPath, `${normalizedPath}.html`, `${normalizedPath}/index.html`];

  for (const candidate of candidates) {
    const filePath = safeResolve(rootDir, candidate);
    if (filePath && existsSync(filePath) && statSync(filePath).isFile()) {
      return filePath;
    }
    if (filePath?.endsWith('.html') && existsSync(`${filePath}.gz`) && statSync(`${filePath}.gz`).isFile()) return `${filePath}.gz`;
  }

  return null;
}

export function resolveNotFoundPage(pathname: string, accept: string | undefined, rootDir: string): string | null {
  if (pathname === '/api' || pathname.startsWith('/api/')) return null;
  const acceptsHtml = (accept ?? '').split(',').some((entry) => {
    const [mediaType, ...parameters] = entry.split(';');
    if (mediaType.trim().toLowerCase() !== 'text/html') return false;
    const quality = parameters.find((parameter) => /^\s*q\s*=/i.test(parameter));
    return quality === undefined || Number(quality.split('=')[1].trim()) > 0;
  });
  return acceptsHtml ? resolveStaticFile('/404', rootDir) : null;
}

export function resolvePublicAssetFile(pathname: string, publicDir: string): string | null {
  if (!pathname.startsWith('/gallery/') && !pathname.startsWith('/share/routes/')) {
    return null;
  }

  const filePath = safeResolve(publicDir, pathname);
  if (filePath && existsSync(filePath) && statSync(filePath).isFile()) {
    return filePath;
  }

  return null;
}

function safeResolve(rootDir: string, relativePath: string): string | null {
  const normalizedRoot = resolve(rootDir);
  const filePath = resolve(normalizedRoot, `.${relativePath}`);
  return filePath === normalizedRoot || filePath.startsWith(`${normalizedRoot}${sep}`) ? filePath : null;
}

export function contentTypeFor(filePath: string): string {
  switch (extname(filePath).toLowerCase()) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.txt':
      return 'text/plain; charset=utf-8';
    case '.xml':
      return 'application/xml; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.woff2':
      return 'font/woff2';
    default:
      return 'application/octet-stream';
  }
}

function isAsset(filePath: string): boolean {
  return filePath.includes(`${resolve(process.cwd(), 'dist')}${process.platform === 'win32' ? '\\' : '/'}_astro`);
}

function cacheControlFor(filePath: string): string {
  if (isAsset(filePath)) {
    return 'public, max-age=31536000, immutable';
  }

  const extension = extname(filePath).toLowerCase();
  if (extension === '.html') {
    return 'public, max-age=300, s-maxage=600, stale-while-revalidate=3600';
  }

  if (isPublicAssetExtension(extension)) {
    return 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000';
  }

  return 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800';
}

function isPublicAssetExtension(extension: string): boolean {
  return PUBLIC_ASSET_EXTENSIONS.has(extension);
}
