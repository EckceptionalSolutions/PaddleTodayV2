import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const script = path.resolve('scripts/apply-route-coordinate-corrections.ts');

it.each(['\n', '\r\n'])('keeps corrections inside the selected route with %j line endings', async (newline) => {
  const root = await mkdtemp(path.join(tmpdir(), 'paddle-coordinate-boundary-'));
  try {
    await mkdir(path.join(root, 'src/data/routes'), { recursive: true });
    await mkdir(path.join(root, 'src/data/trip-details'), { recursive: true });
    const selected = {
      id: 'selected-route', latitude: 43, longitude: -90,
      accessPoints: [{ id: 'launch', name: 'Selected launch', latitude: 43, longitude: -90 }],
    };
    const unrelated = {
      id: 'unrelated-route', latitude: 45, longitude: -91,
      putIn: { id: 'other-launch', name: 'Other launch', latitude: 45, longitude: -91 },
      takeOut: { id: 'other-finish', name: 'Other finish', latitude: 46, longitude: -92 },
    };
    const file = path.join(root, 'src/data/routes/fixture.ts');
    await writeFile(file, JSON.stringify([selected, unrelated], null, 2).replaceAll('\n', newline));
    await writeFile(path.join(root, 'corrections.json'), JSON.stringify([{
      routeId: 'selected-route', endpoint: 'putIn', endpointName: 'Selected launch', latitude: 43.1, longitude: -90.1,
    }]));
    execFileSync(process.execPath, ['--import', pathToFileURL(require.resolve('tsx')).href, script, 'corrections.json'], { cwd: root });
    const result = JSON.parse(await readFile(file, 'utf8'));
    expect(result[1]).toEqual(unrelated);
    expect(result[0]).toEqual({
      ...selected, latitude: 43.1, longitude: -90.1,
      accessPoints: [{ ...selected.accessPoints[0], latitude: 43.1, longitude: -90.1 }],
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

it('preserves the reviewed Moser hold when automatic suggestions no longer flag it', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'paddle-coordinate-hold-'));
  try {
    await mkdir(path.join(root, 'docs'), { recursive: true });
    await writeFile(path.join(root, 'docs/route-coordinate-suggestions.json'), JSON.stringify({
      generatedAt: '2026-09-05T00:00:00.000Z', items: [],
    }));
    execFileSync(process.execPath, [
      '--import', pathToFileURL(require.resolve('tsx')).href,
      path.resolve('scripts/generate-withheld-route-slugs.ts'),
    ], { cwd: root });
    const source = await readFile(path.join(root, 'src/data/generated/withheld-route-slugs.ts'), 'utf8');
    expect(source).toContain('"maumee-river-kreager-moser"');
    expect(source).not.toContain('"maumee-river-niagara-kreager"');
    expect(source).not.toContain('"pine-river-richland-center-canoe-port-1-port-4"');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
