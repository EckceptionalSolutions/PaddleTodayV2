import { dev } from 'astro';

const port = Number(process.argv[2]);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('A valid frontend port is required.');
// Own the server directly: Astro's CLI can otherwise detach in an agent environment.
const server = await dev({
  server: { host: '127.0.0.1', port },
  cacheDir: `.local/dev/astro-${port}`,
  vite: { cacheDir: `.local/dev/vite-${port}`, server: { strictPort: true } },
});
let stopping = false;
async function stop() {
  if (stopping) return;
  stopping = true;
  await server.stop();
}
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
