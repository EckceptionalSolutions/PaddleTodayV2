export function decodeRouteRequestStorageKeyParam(value: string) {
  const decoded = safeDecodeURIComponent(value || '');
  if (!decoded.startsWith('b64.')) {
    return decoded;
  }

  try {
    const encoded = decoded.slice(4).replace(/-/g, '+').replace(/_/g, '/');
    const padded = encoded.padEnd(encoded.length + ((4 - (encoded.length % 4)) % 4), '=');
    return Buffer.from(padded, 'base64').toString('utf8');
  } catch {
    return decoded;
  }
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
