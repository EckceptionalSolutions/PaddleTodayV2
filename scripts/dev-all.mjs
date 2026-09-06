import { spawn } from 'node:child_process';
import { createWriteStream, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { setTimeout as delay } from 'node:timers/promises';
import { dependencyChecks, npmCommand } from './lib/environment.mjs';
import { apiHealth, isMatchingFrontend, isPortFree, parseDevOptions, selectWebPort } from './lib/dev-services.mjs';

const children = new Set();
let stopping = false;
let log;
function cleanup(code = 0) {
  if (stopping) return;
  stopping = true;
  // Direct Node children only. Never kill a listener that this invocation reused.
  for (const child of children) child.kill();
  log?.end();
  process.exitCode = code;
}
process.once('SIGINT', () => cleanup());
process.once('SIGTERM', () => cleanup());

function start(label, args, env) {
  const child = spawn(process.execPath, args, { env, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  children.add(child);
  for (const stream of [child.stdout, child.stderr]) stream.on('data', data => { process.stdout.write(`[${label}] ${data}`); log?.write(`[${label}] ${data}`); });
  child.once('error', error => { console.error(`${label}: ${error.message}`); cleanup(1); });
  child.once('exit', code => { children.delete(child); if (!stopping) { console.error(`${label} exited (${code}); stopping owned services.`); cleanup(1); } });
  return child;
}

async function waitFor(label, probe) {
  const deadline = Date.now() + 60000;
  while (!stopping && Date.now() < deadline) { if (await probe()) return; await delay(500); }
  throw new Error(`${label} did not become ready. See the dev log.`);
}

try {
  const options = parseDevOptions(process.argv.slice(2));
  const failed = dependencyChecks().filter(check => check.status === 'fail');
  if (failed.length) throw new Error(`${failed.map(check => `${check.name}: ${check.detail}`).join('\n')}\nRun npm run doctor.`);
  let api = await apiHealth(options.apiPort);
  const reuseApi = Boolean(api);
  if (!api && !await isPortFree(options.apiPort)) throw new Error(`API port ${options.apiPort} is occupied by an unrecognized or unhealthy service. Choose --api-port; no process was stopped.`);
  const candidates = options.webPort ? [options.webPort] : [4321, 4323, 4324];
  let web = await selectWebPort(candidates, options.apiPort, api);
  console.log(`API ${options.apiPort}: ${reuseApi ? 'reuse' : 'start'}; frontend ${web.port}: ${web.reuse ? 'reuse' : 'start'}.`);
  if (!options.check) {
    mkdirSync('.local/dev', { recursive: true });
    const logPath = `.local/dev/session-${Date.now()}-${process.pid}.log`;
    log = createWriteStream(logPath);
    log.on('error', error => { console.error(`Dev log: ${error.message}`); cleanup(1); });
    const localEnv = Object.assign({}, ...['.env', '.env.local'].filter(existsSync).map(file => parseEnv(readFileSync(file, 'utf8'))));
    const env = { ...localEnv, ...process.env, CANOE_API_HOST: '127.0.0.1', CANOE_API_PORT: String(options.apiPort), CANOE_API_ORIGIN: `http://127.0.0.1:${options.apiPort}`, NODE_ENV: 'development' };
    if (!reuseApi) {
      start('api', ['--import', 'tsx', 'src/server/bootstrap.ts', '--port', String(options.apiPort)], env);
      await waitFor('API', async () => Boolean(api = await apiHealth(options.apiPort)));
      // A previously running frontend may become healthy once its API starts.
      web = await selectWebPort(candidates, options.apiPort, api);
    }
    if (!web.reuse) {
      const npm = npmCommand(['run', 'predev']);
      await new Promise((resolve, reject) => {
        const child = spawn(npm.command, npm.args, { env, stdio: 'inherit', windowsHide: true });
        children.add(child);
        child.once('error', reject);
        child.once('exit', code => { children.delete(child); code === 0 ? resolve() : reject(new Error('predev failed.')); });
      });
      if (stopping) throw new Error('Startup cancelled.');
      start('web', ['scripts/dev-web.mjs', String(web.port)], env);
      await waitFor('Frontend/API proxy', () => isMatchingFrontend(web.port, api));
    }
    console.log(`Ready: http://127.0.0.1:${web.port}\nLogs: ${logPath}\nCtrl+C stops only services started by this command.`);
    if (options.smoke) { console.log('Startup smoke check passed; stopping owned services.'); cleanup(); }
    else if (!children.size) { console.log('Both services were already running; nothing to supervise.'); cleanup(); }
  }
} catch (error) { console.error(error.message); cleanup(1); }
