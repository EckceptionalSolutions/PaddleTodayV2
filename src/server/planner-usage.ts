import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { createJsonStorage, mutateJson, type JsonStorage } from '../lib/blob-storage';

const monthlyLimit = 10_000_000; // Integer microdollars.
export const plannerOutputLimit = 512;
export const plannerInputLimit = 32_768;

// Upper bounds per million tokens in USD, including cache writes and regional premium.
const rates = {
  'gpt-6-luna': { input: 0.14, output: 0.56 },
  'gpt-4.1-mini': { input: 0.45, output: 1.8 },
} as const;
export type PlannerModel = keyof typeof rates;
export function plannerModel(): PlannerModel {
  const model = process.env.PADDLETODAY_PLANNER_MODEL?.trim() || 'gpt-6-luna';
  if (!Object.hasOwn(rates, model)) throw new Error('Planner model has no budget rate');
  return model as PlannerModel;
}
function cost(model: PlannerModel, input: number, output: number) {
  return Math.ceil(input * rates[model].input + output * rates[model].output);
}

function digest(value: string) {
  const secret = process.env.PADDLETODAY_PLANNER_GUEST_SECRET?.trim()
    || (process.env.NODE_ENV !== 'production' && process.env.OPENAI_API_KEY);
  if (!secret) throw new Error('Planner identity unavailable');
  return createHmac('sha256', secret).update(value).digest('base64url');
}
export function issuePlannerGuest() {
  const id = randomUUID();
  return id + '.' + digest('guest-token:' + id);
}
export function verifyPlannerGuest(token: unknown) {
  if (typeof token !== 'string' || !/^[a-f0-9-]{36}\.[A-Za-z0-9_-]{43}$/.test(token)) return null;
  const [id, signature] = token.split('.');
  return timingSafeEqual(Buffer.from(signature), Buffer.from(digest('guest-token:' + id))) ? id : null;
}

type Counts = Record<string, number>;
type Ledger = { charged: number; day: string; daily: Counts; pending: Counts; alertedDollars?: number };
const empty: Ledger = { charged: 0, day: '', daily: {}, pending: {} };
const natural = (value: unknown): value is number => Number.isSafeInteger(value) && Number(value) >= 0;
const counts = (value: unknown) => !!value && typeof value === 'object' && !Array.isArray(value) && Object.values(value).every(natural);
function isLedger(value: unknown) {
  if (!value || typeof value !== 'object') return false;
  const ledger = value as Partial<Ledger>;
  return natural(ledger.charged) && typeof ledger.day === 'string' && counts(ledger.daily) && counts(ledger.pending)
    && (ledger.alertedDollars === undefined || natural(ledger.alertedDollars));
}
export function plannerStorage() {
  const sas = process.env.PADDLETODAY_PLANNER_CONTAINER_SAS_URL?.trim() || process.env.ACCOUNT_DATA_CONTAINER_SAS_URL?.trim();
  if (sas && new URL(sas).protocol !== 'https:') throw new Error('Invalid planner storage URL');
  if (!sas && process.env.NODE_ENV === 'production') throw new Error('Shared planner storage unavailable');
  return createJsonStorage({ containerSasUrl: sas, localDirectory: process.env.PADDLETODAY_PLANNER_LOCAL_DIR || '.local/planner',
    validate: isLedger, label: 'planner usage', timeoutMs: 3000, retries: 1, space: 0 });
}

export class PlannerLimit extends Error {
  constructor(readonly code: 'planner_monthly_limit' | 'planner_guest_limit' | 'planner_account_limit' | 'planner_network_limit',
    readonly resetAt: number) { super(code); }
}

export async function reservePlannerCall(storage: JsonStorage, model: PlannerModel, tier: 'guest' | 'account', id: string, ip: string, now = new Date()) {
  const day = now.toISOString().slice(0, 10);
  const blobName = 'planner-usage/' + day.slice(0, 7) + '.json';
  const principal = digest(day + ':' + tier + ':' + id);
  const network = digest(day + ':network:' + ip);
  const amount = cost(model, plannerInputLimit, plannerOutputLimit);
  const reservation = randomUUID();
  const skipGuestQuotas = tier === 'guest' && process.env.NODE_ENV === 'development'
    && process.env.PADDLETODAY_PLANNER_SKIP_GUEST_QUOTAS === '1';
  const nextDay = Date.parse(day + 'T00:00:00Z') + 86_400_000;
  let newAlert = 0;
  await mutateJson({ storage, blobName, initial: empty, mutate(ledger) {
    if (ledger.charged + amount > monthlyLimit) {
      throw new PlannerLimit('planner_monthly_limit', Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
    }
    // A late reservation from yesterday must never reset today's counters.
    if (ledger.day > day) throw new Error('Planner day changed during reservation');
    if (ledger.day !== day) { ledger.day = day; ledger.daily = {}; }
    const used = ledger.daily[principal] ?? 0;
    if (!skipGuestQuotas && used >= (tier === 'guest' ? 10 : 30)) throw new PlannerLimit(tier === 'guest' ? 'planner_guest_limit' : 'planner_account_limit', nextDay);
    if (tier === 'guest') {
      const guestNetworkCalls = ledger.daily[network] ?? 0;
      if (!skipGuestQuotas && guestNetworkCalls >= 50) throw new PlannerLimit('planner_network_limit', nextDay);
      ledger.daily[network] = guestNetworkCalls + 1;
    }
    ledger.daily[principal] = used + 1;
    ledger.charged += amount;
    const threshold = ledger.charged >= 8_000_000 ? 8 : ledger.charged >= 5_000_000 ? 5 : 0;
    newAlert = threshold > (ledger.alertedDollars ?? 0) ? threshold : 0;
    if (newAlert) ledger.alertedDollars = newAlert;
    ledger.pending[reservation] = amount;
    return ledger;
  } });
  if (newAlert) console.warn('Planner monthly budget threshold reached', { month: day.slice(0, 7), dollars: newAlert });
  return async (usage?: { input_tokens?: unknown; output_tokens?: unknown }) => {
    const input = usage?.input_tokens, output = usage?.output_tokens;
    if (!natural(input) || !natural(output) || input > plannerInputLimit || output > plannerOutputLimit) return;
    await mutateJson({ storage, blobName, initial: empty, mutate(ledger) {
      if (ledger.pending[reservation] === amount) {
        ledger.charged -= amount - cost(model, input, output);
        delete ledger.pending[reservation];
      }
      return ledger;
    } });
  };
}
