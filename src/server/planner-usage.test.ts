import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { plannerModel, plannerStorage, reservePlannerCall } from './planner-usage';

let dir: string;
const now = new Date('2026-11-24T12:00:00Z');
const name = 'planner-usage/2026-11.json';
beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), 'planner-budget-'));
  vi.stubEnv('PADDLETODAY_PLANNER_LOCAL_DIR', dir);
  vi.stubEnv('PADDLETODAY_PLANNER_CONTAINER_SAS_URL', '');
  vi.stubEnv('ACCOUNT_DATA_CONTAINER_SAS_URL', '');
  vi.stubEnv('PADDLETODAY_PLANNER_GUEST_SECRET', 'fixture');
});
afterEach(async () => { vi.unstubAllEnvs(); await rm(dir, { recursive: true, force: true }); });

it('reserves the last affordable call once, retains unknown costs and reconciles reported usage only once', async () => {
  const storage = plannerStorage();
  const starting = 9_994_999;
  await storage.writeJson(name, { charged: starting, day: '', daily: {}, pending: {} });
  const attempt = () => reservePlannerCall(plannerStorage(), 'gpt-6-luna', 'guest', 'paddler', 'network', now);
  const results = await Promise.allSettled([attempt(), attempt(), attempt()]);
  expect(results.filter(r => r.status === 'rejected').map(r => r.reason.code)).toEqual(['planner_monthly_limit', 'planner_monthly_limit']);
  const allowed = results.find(r => r.status === 'fulfilled')!;
  const reserved = await storage.readJson(name);
  await allowed.value();
  expect(await storage.readJson(name)).toEqual(reserved);
  const usage = { input_tokens: 100, output_tokens: 25 };
  await allowed.value(usage);
  await allowed.value(usage);
  expect(await storage.readJson(name)).toMatchObject({ charged: starting + Math.ceil(100 * 0.14 + 25 * 0.56), pending: {} });
  await expect(attempt()).resolves.toBeTypeOf('function');
});

it('resets daily and monthly limits at UTC boundaries and settles against the original month', async () => {
  const storage = plannerStorage();
  const book = (when: string) => reservePlannerCall(storage, 'gpt-6-luna', 'guest', 'paddler', 'network', new Date(when));
  for (let i = 0; i < 10; i++) await book('2026-11-29T23:59:59Z');
  await expect(book('2026-11-29T23:59:59Z')).rejects.toMatchObject({ code: 'planner_guest_limit' });
  const settle = await book('2026-11-30T00:00:00Z');
  await book('2026-12-01T00:00:00Z');
  const december = await storage.readJson('planner-usage/2026-12.json');
  await settle({ input_tokens: 1, output_tokens: 1 });
  expect(await storage.readJson('planner-usage/2026-12.json')).toEqual(december);
});

it('suspends both daily guest quotas in development while charging calls against the monthly cap', async () => {
  vi.stubEnv('NODE_ENV', 'development');
  vi.stubEnv('PADDLETODAY_PLANNER_SKIP_GUEST_QUOTAS', '1');
  const storage = plannerStorage();
  const book = (id: string) => reservePlannerCall(storage, 'gpt-6-luna', 'guest', id, 'network', now);
  for (let i = 0; i < 51; i++) await book('tester');
  vi.stubEnv('NODE_ENV', 'production');
  await expect(book('tester')).rejects.toMatchObject({ code: 'planner_guest_limit' });
  await expect(book('another')).rejects.toMatchObject({ code: 'planner_network_limit' });
  vi.stubEnv('NODE_ENV', 'development');
  await storage.writeJson(name, { charged: 10_000_000, day: '', daily: {}, pending: {} });
  await expect(book('tester')).rejects.toMatchObject({ code: 'planner_monthly_limit' });
});

it('fails closed on missing production storage, unknown pricing or a damaged ledger', async () => {
  vi.stubEnv('NODE_ENV', 'production');
  expect(() => plannerStorage()).toThrow('Shared planner storage unavailable');
  vi.stubEnv('PADDLETODAY_PLANNER_MODEL', 'unpriced-model');
  expect(() => plannerModel()).toThrow('no budget rate');
  vi.stubEnv('NODE_ENV', 'test');
  const storage = plannerStorage();
  await storage.writeJson(name, { malformed: true });
  await expect(reservePlannerCall(storage, 'gpt-6-luna', 'guest', 'paddler', 'network', now)).rejects.toThrow('Invalid planner usage');
});
