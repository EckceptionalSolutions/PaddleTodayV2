import { createConnection, createServer } from 'node:net';

export function parseDevOptions(args) {
  const options = { apiPort: 4322, webPort: undefined, check: false, smoke: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--check') options.check = true;
    else if (arg === '--smoke') options.smoke = true;
    else if (arg === '--api-port' || arg === '--web-port') {
      const value = Number(args[++i]);
      if (!Number.isInteger(value) || value < 1024 || value > 65535) throw new Error(`${arg} requires a port between 1024 and 65535.`);
      options[arg === '--api-port' ? 'apiPort' : 'webPort'] = value;
    } else throw new Error(`Unknown option: ${arg}`);
  }
  if (options.apiPort === options.webPort) throw new Error('Frontend and API must use different ports.');
  return options;
}

export async function isPortFree(port) {
  // Windows may permit a loopback bind beside an existing wildcard listener.
  // An accepted TCP connection always means occupied, regardless of bindability.
  const occupied = await new Promise(resolve => {
    const socket = createConnection({ host: '127.0.0.1', port });
    const finish = value => { socket.destroy(); resolve(value); };
    socket.once('connect', () => finish(true));
    socket.once('error', error => finish(error.code !== 'ECONNREFUSED'));
    socket.setTimeout(1000, () => finish(true));
  });
  if (occupied) return false;
  return new Promise(resolve => {
    const socket = createServer();
    socket.once('error', () => resolve(false));
    socket.listen({ host: '127.0.0.1', port, exclusive: true }, () => socket.close(() => resolve(true)));
  });
}

export async function apiHealth(port) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/health`, { signal: AbortSignal.timeout(2000), redirect: 'error' });
    if (!response.ok) return null;
    const data = await response.json();
    return data.ok === true && ['api-only', 'one-origin'].includes(data.mode)
      && Number.isInteger(data.riverCount) && typeof data.startedAt === 'string'
      && typeof data.requestId === 'string' && data.cache && data.upstream ? data : null;
  } catch { return null; }
}

export async function isMatchingFrontend(port, api) {
  if (!api) return false;
  try {
    const response = await fetch(`http://127.0.0.1:${port}/@vite/client`, { signal: AbortSignal.timeout(2000), redirect: 'error' });
    if (!response.ok || !(await response.text()).includes('createHotContext')) return false;
    const proxied = await apiHealth(port);
    return proxied?.startedAt === api.startedAt && proxied?.riverCount === api.riverCount;
  } catch { return false; }
}

export async function selectWebPort(candidates, apiPort, api, probes = { isPortFree, isMatchingFrontend }) {
  const available = [];
  for (const port of candidates.filter(port => port !== apiPort)) {
    if (await probes.isPortFree(port)) available.push(port);
    else if (await probes.isMatchingFrontend(port, api)) return { port, reuse: true };
  }
  if (available.length) return { port: available[0], reuse: false };
  throw new Error(`No matching frontend or free port among ${candidates.join(', ')}. Choose --web-port explicitly; existing listeners were left alone.`);
}
