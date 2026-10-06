import { isLogInput, isTripId, isTripPlan, type PaddleLogInput, type TripPlan } from '@paddletoday/api-contract';

export type LogMode = 'record' | 'past' | 'edit';
export type EditorDraft = { editing: TripPlan | null; editId: string; baseline?: TripPlan; log: PaddleLogInput | null; logId: string; logRevision: number; logMode?: LogMode; planStep?: 'route' | 'details' };
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const strings = (value: Record<string, unknown>, keys: string[]) => keys.every(key => typeof value[key] === 'string');
function routeShape(value: unknown) {
  return record(value) && strings(value, ['slug', 'name', 'putInId', 'putInName', 'takeOutId', 'takeOutName']);
}
function planShape(value: unknown): value is TripPlan {
  if (!record(value) || !routeShape(value.route) || !strings(value, ['title', 'date', 'launch', 'expected', 'timeZone'])
    || !Array.isArray(value.itinerary) || value.itinerary.length > 30
    || !value.itinerary.every(stop => record(stop) && strings(stop, ['id', 'time', 'location', 'note']))) return false;
  const preparation = value.preparation;
  return preparation === undefined || (record(preparation)
    && (preparation.checkInLocal === undefined || typeof preparation.checkInLocal === 'string')
    && strings(preparation, ['boatDescription', 'vehicleDescription', 'note'])
    && (preparation.groupSize === null || typeof preparation.groupSize === 'number' && Number.isFinite(preparation.groupSize)));
}
function recapShape(value: unknown): value is PaddleLogInput {
  if (!record(value) || !routeShape(value.route) || !strings(value, ['date', 'time', 'timeZone', 'notes'])
    || !(value.sourceTripId === null || isTripId(value.sourceTripId))
    || !['', 'yes', 'no', 'unsure'].includes(String(value.paddleAgain))
    || !Array.isArray(value.water) || value.water.length > 10
    || !value.water.every(water => record(water) && strings(water, ['gaugeId', 'gaugeName', 'value', 'unit', 'measuredAt', 'source', 'note']))) return false;
  // Tracks are generated data. Editable draft text is allowed to be unfinished.
  return value.track === undefined || isLogInput({ sourceTripId: null,
    route: { slug: '', name: 'Draft', putInId: '', putInName: '', takeOutId: '', takeOutName: '' },
    date: '2026-01-01', time: '', timeZone: 'UTC', notes: '', paddleAgain: '', water: [], track: value.track });
}
/** Restore editable values unchanged; validate final form values only when saving. */
export function parseEditorDraft(raw: string): EditorDraft | null {
  let value: unknown;
  try { value = JSON.parse(raw); } catch { return null; }
  if (!record(value)) return null;
  const editing = planShape(value.editing) ? value.editing : null;
  const log = !editing && recapShape(value.log) ? value.log : null;
  if (!editing && !log) return null;
  return { editing, log, editId: typeof value.editId === 'string' ? value.editId : '',
    baseline: isTripPlan(value.baseline) ? value.baseline : undefined,
    logId: typeof value.logId === 'string' ? value.logId : '',
    logRevision: Number.isSafeInteger(value.logRevision) && Number(value.logRevision) >= 0 ? Number(value.logRevision) : 0,
    logMode: value.logMode === 'record' || value.logMode === 'past' ? value.logMode : 'edit',
    planStep: value.planStep === 'route' ? 'route' : 'details' };
}
