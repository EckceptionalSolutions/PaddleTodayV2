import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

export function nodeMeetsMinimum(actual, minimum) {
  const a = actual.replace(/^v/, '').split('.').map(Number);
  const b = minimum.replace(/^>=/, '').split('.').map(Number);
  for (let i = 0; i < 3; i++) { if (a[i] !== b[i]) return a[i] > b[i]; }
  return true;
}

export function dependencyChecks(root = process.cwd()) {
  const checks = [];
  const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  checks.push({ name: 'Node.js', status: nodeMeetsMinimum(process.version, manifest.engines.node) ? 'ok' : 'fail', detail: `${process.version}; requires ${manifest.engines.node}` });
  const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'));
  for (const name of ['astro', 'tsx', 'typescript', 'vitest', 'vite', 'rolldown', '@astrojs/compiler-binding', 'satteri', 'sharp', 'lightningcss', 'esbuild']) {
    const folder = join(root, 'node_modules', name);
    const file = join(folder, 'package.json');
    if (!existsSync(file)) { checks.push({ name, status: 'fail', detail: 'Dependency missing. Run npm ci.' }); continue; }
    const pkg = JSON.parse(readFileSync(file, 'utf8'));
    const expected = lock.packages[`node_modules/${name}`]?.version;
    checks.push({ name, status: pkg.version === expected ? 'ok' : 'fail', detail: `${pkg.version}; lockfile ${expected ?? 'missing'}` });
    // Check only this host's required native packages, using parent dependency versions.
    if (process.platform === 'win32' && process.arch === 'x64') {
      for (const [binding, version] of Object.entries(pkg.optionalDependencies ?? {})) {
        if (!/win32.*x64/.test(binding)) continue;
        const bindingFile = join(root, 'node_modules', binding, 'package.json');
        let actual;
        try { actual = JSON.parse(readFileSync(bindingFile, 'utf8')).version; } catch { /* Report missing. */ }
        checks.push({ name: binding, status: actual === version ? 'ok' : 'fail', detail: actual === version ? actual : `Expected ${version}; found ${actual ?? 'missing'}. Restore the matching optional binding; do not upgrade the parent package.` });
      }
    }
  }
  if (checks.every(check => check.status === 'ok')) {
    // Subprocess isolation catches native loading failures without crashing the doctor.
    const smoke = spawnSync(process.execPath, ['--input-type=module', '-e', "await import('rolldown'); await import('@astrojs/compiler-binding'); await import('satteri'); await import('sharp'); await import('lightningcss'); const esbuild = await import('esbuild'); esbuild.transformSync('const value = 1;');"], { cwd: root, encoding: 'utf8', timeout: 15000, windowsHide: true });
    checks.push({ name: 'Native loading', status: smoke.status === 0 ? 'ok' : 'fail', detail: smoke.status === 0 ? 'Build bindings load successfully.' : 'A native dependency failed to load. Stop this project’s dev servers before repairing dependencies at locked versions.' });
  }
  return checks;
}

export function npmCommand(args) {
  // npm provides its JS entrypoint inside npm run; bypass Windows shell wrappers.
  if (!process.env.npm_execpath) throw new Error('Run this command through npm run.');
  return { command: process.execPath, args: [resolve(process.env.npm_execpath), ...args] };
}
