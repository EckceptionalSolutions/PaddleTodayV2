import type { RiverEvidenceNote } from './types';

const routeReviewDate = (text: string) =>
  text.match(/\b20\d{2}-\d{2}-\d{2}\b/)?.[0] ??
  text.match(
    /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?\s+\d{1,2},?\s+20\d{2}\b/i,
  )?.[0];

export function isRecordedGaugeCheck(note: RiverEvidenceNote): boolean {
  if (/\b(?:current|live|historical)\b.*\b(?:check|reading|snapshot|observation|values?)\b/i.test(note.label)) return true;

  const evidenceText = `${note.label} ${note.value} ${note.note ?? ''}`;
  const hasRecordedDate = Boolean(routeReviewDate(evidenceText));
  const hasMeasuredReading = /\b\d[\d,]*(?:\.\d+)?\s*(?:cfs|ft|cms)\b/i.test(evidenceText);
  const hasGaugeContext = /\b(?:gauge|USGS|Water Services|river flow|stage)\b/i.test(evidenceText);
  const describesAnObservation = /\b(?:returned|observed|measured|same-day|during this run|during review|latest official values|snapshot)\b/i.test(evidenceText);

  return hasGaugeContext && (
    (hasRecordedDate && hasMeasuredReading) ||
    (describesAnObservation && (hasRecordedDate || hasMeasuredReading))
  );
}

export function evidenceNoteLabel(note: RiverEvidenceNote): string {
  if (!isRecordedGaugeCheck(note)) return note.label;

  const evidenceText = `${note.value} ${note.note ?? ''}`;
  const capturedDate = routeReviewDate(evidenceText);
  return capturedDate
    ? `Gauge check during route review · ${capturedDate}`
    : 'Gauge check recorded during route review';
}

export function evidenceNoteDetail(note: RiverEvidenceNote): string | undefined {
  return isRecordedGaugeCheck(note)
    ? 'This static check records gauge data observed during route review; it is not live telemetry. Check the current gauge and local conditions before paddling.'
    : note.note;
}
