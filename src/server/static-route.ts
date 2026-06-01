import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import type { ServerResponse } from 'node:http';

export function sendStatic(response: ServerResponse, filePath: string, includeBody = true) {
  const stats = statSync(filePath);
  response.writeHead(200, {
    'content-type': contentTypeFor(filePath),
    'cache-control': isAsset(filePath) ? 'public, max-age=31536000, immutable' : 'no-cache',
    'content-length': stats.size,
    'access-control-allow-origin': '*',
  });

  if (!includeBody) {
    response.end();
    return response;
  }

  createReadStream(filePath).pipe(response);
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
  }

  return null;
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
