import { plannerSlug, type PlannerContext, type PlannerExploration } from '@paddletoday/api-contract';
import { requestedPlannerDate } from './planner-calendar';
import { getRiverBySlug } from '../lib/rivers';
import { accountEvidence, catalogSearch, datasets, evidencePage, plannerCard, routeEvidence, type Dataset, type PlannerCard } from './planner-catalog';

const string = { type: 'string' };
const integer = { type: 'integer' };
const object = (properties: Record<string, unknown>) => ({ type: 'object', properties, required: Object.keys(properties), additionalProperties: false });
const array = (items: object, maxItems: number) => ({ type: 'array', items, minItems: 1, maxItems });
const fn = (name: string, description: string, properties: Record<string, unknown>) =>
  ({ type: 'function', name, description, strict: true, parameters: object(properties) });

export const searchTool = fn('search_catalog', 'Search the entire public catalog. Compare up to two areas or states. Use full state names, empty strings for unrestricted fields, offset 0 initially. Counts cover every match; route examples are paged.', {
  searches: array(object({ state: string, area: string, text: string, difficulty: { enum: ['any', 'easy', 'moderate', 'hard'], type: 'string' },
    shuttleFree: { type: 'boolean' }, maxHours: { type: 'number', description: 'Maximum on-water hours; zero for any.' },
    period: { type: 'string', enum: ['catalog', 'today', 'weekend'], description: 'Catalog for destination or future planning. Today/weekend rank favorable dated calls.' }, offset: integer }), 2),
});
export const readTool = fn('read_routes', 'Read or compare up to four public records. catalog has logistics, profile.seasonNotes, safety, sourceLinks, access. conditions has result.weather, result.gauge, result.readiness, result.scoreBreakdown, result.outlooks. guide includes editorial advice. Use a dotted field or empty string. Offset pages the JSON excerpt. For history specify days back, or 0 for all available days.', {
  reads: array(object({ slug: string, dataset: { type: 'string', enum: datasets }, field: string, offset: integer, days: integer }), 4),
});
export const overnightTool = fn('find_overnight_routes', 'Find weekend paddle-camping trips with documented camping between launch and take-out. Scan across state lines and compare time to launch separately from time paddling.', {
  originCity: { type: 'string', description: 'Departure city, with state if specified. Empty for a statewide destination search.' },
  destinationState: { type: 'string', description: 'Full state name only if the user restricts the DESTINATION to that state. Empty for a radius from a city.' },
  maxDriveMinutes: { type: 'integer', description: 'Requested one-way travel limit to launch, in minutes. Zero if unspecified. Ignore nearby day-trip defaults.' },
});
export const accountTool = fn('read_my_planning', 'Read the signed-in paddler’s saved routes, draft targets or trips and paddle log summaries when relevant. Start with empty cursor.', {
  kind: { type: 'string', enum: ['saved', 'drafts', 'tripsAndLogs'] }, cursor: string,
});
export const answerTool = fn('present_exploration', 'Answer from retrieved evidence. Write [[exact-catalog-slug]] in place of the river name for each specific reach you recommend or put in review. The app replaces each reference with its name and uses those references as the route cards. Area-only answers need no references.', {
  answer: { type: 'string', description: 'Use each [[slug]] naturally in a sentence explaining why to choose or review that reach. Include only the reaches discussed, up to five. Use plain text for places and general river mentions.' },
  review: { type: 'array', maxItems: 5, items: object({ slug: string, reason: string }), description: 'ONLY if a hard requirement fails, its evidence is missing, or you advised waiting. Weaker alternatives meeting the requirements belong in slugs. A limited first-come campsite still meets a request for documented camping. Use a short, route-specific reason.' },
  requestedDateText: { type: ['string', 'null'], description: 'Quote the complete specific day requested by the user, e.g. "this Saturday". Null for an open date, a range or a season. Never use forecast dates.' },
});

export async function readPlannerTool(name: string, args: Record<string, unknown>, seen: Map<string, PlannerCard>, port: number, uid?: string) {
  if (name === 'search_catalog' && Array.isArray(args.searches) && args.searches.length >= 1 && args.searches.length <= 2) {
    return Promise.all(args.searches.map(search => catalogSearch(search, seen, port)));
  }
  if (name === 'read_my_planning' && uid && ['saved', 'drafts', 'tripsAndLogs'].includes(String(args.kind))
    && typeof args.cursor === 'string' && args.cursor.length <= 180) {
    try {
      const page = await accountEvidence(uid, String(args.kind), args.cursor);
      for (const record of page.rows) {
        const route = getRiverBySlug(record.slug);
        if (route) seen.set(route.slug, plannerCard(route));
      }
      return page;
    } catch {
      return { unavailable: 'Account planning data unavailable' };
    }
  }
  if (name !== 'read_routes' || !Array.isArray(args.reads) || !args.reads.length || args.reads.length > 4) throw new Error('Invalid planner lookup');
  return Promise.all(args.reads.map(async query => {
    const { slug, dataset, field, offset, days } = query;
    if (!plannerSlug(slug) || !datasets.includes(dataset) || typeof field !== 'string' || !/^[\w.]{0,180}$/.test(field)
      || !Number.isSafeInteger(offset) || offset < 0 || !Number.isSafeInteger(days) || days < 0) throw new Error('Invalid route lookup');
    const river = getRiverBySlug(slug);
    if (!river) return { slug, unavailable: 'Route outside the public catalog' };
    const card = plannerCard(river);
    seen.set(slug, card);
    try {
      const raw = await routeEvidence(port, slug, dataset as Dataset, days);
      return { slug, dataset, name: river.name, reach: river.reach,
        ...(dataset === 'catalog' && { practicalAccess: {
          launch: river.putIn?.name, landing: river.takeOut?.name, shuttle: river.logistics?.shuttle,
          caveats: river.logistics?.accessCaveats, watchFor: river.logistics?.watchFor,
        } }), ...evidencePage(raw, field, offset) };
    } catch {
      return { slug, dataset, unavailable: 'Source unavailable' };
    }
  }));
}

export function explorationAnswer(args: Record<string, unknown>, seen: Map<string, PlannerCard>, message: string, context: PlannerContext): PlannerExploration {
  const review = args.review ?? [];
  if (typeof args.answer !== 'string' || !args.answer.trim() || args.answer.length > 2000
    || !Array.isArray(review) || review.length > 5 || !review.every(item => item && seen.has(item.slug)
      && typeof item.reason === 'string' && item.reason.trim() && item.reason.length <= 250)) throw new Error('Invalid exploration answer');
  const references = new Set<string>();
  const answer = args.answer.trim().replace(/\[\[([^\]]+)\]\]/g, (_, slug: string) => {
    const card = seen.get(slug);
    if (!card) throw new Error('Unknown route reference');
    references.add(slug);
    return card.name;
  });
  if (references.size > 5 || /\[\[|\]\]/.test(answer)) throw new Error('Invalid route references');
  const reviewRoutes = [...references].filter(slug => review.some(item => item.slug === slug)).map(slug => {
    const { reason } = review.find(item => item.slug === slug)!;
    const { name, reach } = seen.get(slug)!;
    let why = reason.trim();
    if (/\b(carry|carrying|stairs|step.free|wheelchair|portages?)\b/i.test(message) && !/\bportage\b/i.test(why)) {
      const carry = getRiverBySlug(slug)?.logistics?.accessCaveats?.find(note =>
        /\bmandatory\b.*\bportage\b|\bportage\b.*\bmandatory\b/i.test(note))?.split(/(?<=[.!?])\s+/)[0];
      if (carry && why.length + carry.length < 250) why += ' ' + carry;
    }
    return { slug, name, reach, reason: why };
  });
  const reviewed = new Set(reviewRoutes.map(r => r.slug));
  const routes = [...references].filter(slug => !reviewed.has(slug)).map(slug => seen.get(slug)!);
  let date = requestedPlannerDate(args.requestedDateText, message, context.today);
  if (!date && args.requestedDateText && !/\b(open date|date open|weekend open|undated|instead|actually)\b/i.test(message)) {
    for (const exchange of [...context.exchanges].reverse()) {
      if (exchange.askedOn) date = requestedPlannerDate(args.requestedDateText, exchange.message, exchange.askedOn);
      if (date) break;
    }
  }
  return { answer, date,
    routes, ...(reviewRoutes.length && { reviewRoutes }) };
}
