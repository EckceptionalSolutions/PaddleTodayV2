export const plannerDays = ['Today', 'Saturday', 'Sunday'] as const;
export type PlanningDay = typeof plannerDays[number];

export interface DayTripRequest {
  day: PlanningDay;
  hours: number;
  driveMinutes: number;
  noShuttle: boolean;
  easyOnly: boolean;
}

export const plannerQuestions = ['shuttle', 'day', 'paddleTime', 'driveTime', 'startingPoint', 'unsupported'] as const;
export type PlannerQuestion = typeof plannerQuestions[number];
export interface DayTripAction {
  settings: DayTripRequest;
  question: PlannerQuestion | null;
}
export const plannerMessageLimit = 1200;
export interface ShownDayTrip {
  name: string;
  duration: string;
  driveMinutes: number;
  difficulty: string;
  rating: 'Good' | 'Strong';
}
/** Conversation context is input from the device. Route references are resolved again on the server. */
export interface PlannerExchange { message: string; answer: string; slugs: string[]; continuation?: string; askedOn?: string }
export interface PlannerExploration {
  answer: string;
  states?: string[];
  sources?: string[];
  continuation?: string;
  routes: { slug: string; name: string; reach: string; area: string; putIn: string | null; takeOut: string | null; putInName?: string; takeOutName?: string }[];
  reviewRoutes?: { slug: string; name: string; reach: string; reason: string }[];
  date: string | null;
}
export interface PlannerReply { action: DayTripAction; exploration?: PlannerExploration }
export interface PlannerContext {
  today: string;
  homePicks?: string[];
  exchanges: PlannerExchange[];
  preferences: string;
  includeAccount: boolean;
}
export interface DayTripTurn extends DayTripAction {
  message: string;
  weekday: number;
  exploration?: PlannerContext;
  originalRequest: string | null;
  shownMatches: ShownDayTrip[];
}

function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export function isDayTripRequest(value: unknown): value is DayTripRequest {
  return record(value) && Object.keys(value).length === 5 && plannerDays.some(day => day === value.day)
    && typeof value.hours === 'number' && value.hours > 0 && value.hours <= 8
    && typeof value.driveMinutes === 'number' && Number.isInteger(value.driveMinutes) && value.driveMinutes >= 1 && value.driveMinutes <= 120
    && typeof value.noShuttle === 'boolean' && typeof value.easyOnly === 'boolean';
}

export function isDayTripAction(value: unknown): value is DayTripAction {
  return record(value) && isDayTripRequest(value.settings)
    && (value.question === null || plannerQuestions.some(question => question === value.question));
}

const shortText = (value: unknown, limit: number): value is string => typeof value === 'string' && value.length <= limit;
export const plannerSlug = (value: unknown): value is string => typeof value === 'string' && /^[a-z0-9][a-z0-9-]{0,179}$/.test(value);
export function plannerDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(value + 'T12:00:00Z');
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value;
}
function isPlannerContext(v: unknown): v is PlannerContext {
  return record(v) && Object.keys(v).every(k => ['today', 'exchanges', 'preferences', 'includeAccount', 'homePicks'].includes(k))
    && (v.homePicks === undefined || (Array.isArray(v.homePicks) && v.homePicks.length <= 3 && v.homePicks.every(plannerSlug))) && plannerDate(v.today) && shortText(v.preferences, 160)
    && typeof v.includeAccount === 'boolean' && Array.isArray(v.exchanges) && v.exchanges.length <= 4
    && v.exchanges.every(e => record(e) && Object.keys(e).every(k => ['message', 'answer', 'slugs', 'continuation', 'askedOn'].includes(k))
      && (e.askedOn === undefined || plannerDate(e.askedOn))
      && (e.continuation === undefined || shortText(e.continuation, 850)) && shortText(e.message, 450) && shortText(e.answer, 650)
      && Array.isArray(e.slugs) && e.slugs.length <= 5 && e.slugs.every(plannerSlug));
}
export function isPlannerExploration(v: unknown): v is PlannerExploration {
  return record(v) && shortText(v.answer, 2000) && !!v.answer.trim() && (v.date === null || plannerDate(v.date))
    && (v.states === undefined || (Array.isArray(v.states) && v.states.length <= 4 && v.states.every(s => shortText(s, 100))))
    && (v.sources === undefined || (Array.isArray(v.sources) && v.sources.length <= 10 && v.sources.every(s => shortText(s, 400))))
    && (v.continuation === undefined || shortText(v.continuation, 850))
    && (v.reviewRoutes === undefined || (Array.isArray(v.reviewRoutes) && v.reviewRoutes.length <= 5
      && v.reviewRoutes.every(r => record(r) && plannerSlug(r.slug) && shortText(r.name, 300)
        && shortText(r.reach, 500) && shortText(r.reason, 250) && !!r.reason.trim())))
    && Array.isArray(v.routes) && v.routes.length <= 5 && v.routes.every(r => record(r) && plannerSlug(r.slug)
      && shortText(r.name, 300) && shortText(r.reach, 500) && shortText(r.area, 300)
      && (r.putInName === undefined || shortText(r.putInName, 250)) && (r.takeOutName === undefined || shortText(r.takeOutName, 250))
      && (r.putIn === null || shortText(r.putIn, 250)) && (r.takeOut === null || shortText(r.takeOut, 250)));
}

export function isDayTripTurn(value: unknown): value is DayTripTurn {
  return record(value) && isDayTripAction(value) && typeof value.message === 'string'
    && (value.exploration === undefined || isPlannerContext(value.exploration))
    && !!value.message.trim() && value.message.length <= plannerMessageLimit
    && typeof value.weekday === 'number' && Number.isInteger(value.weekday) && value.weekday >= 0 && value.weekday <= 6
    && (value.originalRequest === null || (typeof value.originalRequest === 'string' && value.originalRequest.length <= plannerMessageLimit))
    && Array.isArray(value.shownMatches) && value.shownMatches.length <= 3 && value.shownMatches.every(match =>
      record(match) && Object.keys(match).length === 5 && typeof match.name === 'string' && match.name.length <= 180
      && typeof match.duration === 'string' && match.duration.length <= 250
      && typeof match.driveMinutes === 'number' && Number.isInteger(match.driveMinutes) && match.driveMinutes >= 0 && match.driveMinutes <= 120
      && ['easy', 'moderate', 'hard'].some(difficulty => difficulty === match.difficulty)
      && (match.rating === 'Strong' || match.rating === 'Good'));
}

/** Apply supported refinements together so a missed constraint never produces a misleading match. */
export function refineDayTrip(input: string, current: DayTripRequest, askShuttle = false) {
  const next = { ...current };
  const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  const text = input.toLowerCase().trim().replace(/\b(one|two|three|four|five|six|seven|eight)\b(?=\s+(?:hours?|hrs?)\b)/g, word => String(numbers.indexOf(word) + 1));
  const parts = text.replace(/[.!?]+$/, '').split(/\s*(?:[,;]|\band\b|\bwith\b)\s*/).filter(Boolean);
  if (!parts.length) return null;
  for (const part of parts) {
    const day = (['Today', 'Saturday', 'Sunday'] as const).find(value => value.toLowerCase() === part.replace(/^on /, ''));
    const paddle = /^(?:up to |at most )?(\d+(?:\.\d+)?)\s*(?:hr|hour)s?(?: on the water| of paddling| paddle)?$/.exec(part);
    const drive = /^(?:up to |at most )?(?:a )?(\d+)\s*[- ]?(?:min|minute)s?\s+(?:drive|away)$/.exec(part);
    if (day) next.day = day;
    else if (paddle && +paddle[1] > 0 && +paddle[1] <= 8) next.hours = Number(paddle[1]);
    else if (drive && +drive[1] > 0 && +drive[1] <= 120) next.driveMinutes = Number(drive[1]);
    else if (/^(?:easy routes only|easy only|beginner friendly)$/.test(part)) next.easyOnly = true;
    else if (/^(?:a )?shorter drive$/.test(part)) next.driveMinutes = Math.max(1, Math.floor(next.driveMinutes / 2));
    else if (/^(?:no shuttle|shuttle[- ]free)$/.test(part)) { next.noShuttle = true; askShuttle = false; }
    else if (/^(?:two cars|2 cars|can arrange (?:one|a shuttle))$/.test(part)) { next.noShuttle = false; askShuttle = false; }
    else if (/^(?:one|1) car$/.test(part)) askShuttle = true;
    else return null;
  }
  return { next, askShuttle };
}

export function localDayTripAction(message: string, settings: DayTripRequest, question: PlannerQuestion | null): DayTripAction | null {
  if (question === 'day' && !/^(?:on )?(?:today|saturday|sunday)[.!?]?$/i.test(message.trim())) return null;
  if (question === 'driveTime') {
    const match = /^(\d+)\s*(?:min(?:ute)?s?)?[.!?]?$/i.exec(message.trim());
    if (match && Number(match[1]) >= 1 && Number(match[1]) <= 120) {
      return { settings: { ...settings, driveMinutes: Number(match[1]) }, question: null };
    }
    return null;
  }
  if (question === 'paddleTime' && !/^(?:(?:up to|at most) )?[\w.]+\s*(?:hr|hour)s?(?: on the water| of paddling| paddle)?[.!?]?$/i.test(message.trim())) return null;
  if (question === 'shuttle' && /^(?:yes|no)[.!?]?$/i.test(message.trim())) {
    return { settings: { ...settings, noShuttle: /^no/i.test(message.trim()) }, question: null };
  }
  if (question === 'startingPoint' || question === 'unsupported') return null;
  const local = refineDayTrip(message, settings, question === 'shuttle');
  return local ? { settings: local.next, question: local.askShuttle ? 'shuttle' : null } : null;
}
