import type { TripPreparation } from './trips';

/** Present older structured notes in the same field without losing their context. */
export function tripNotes(preparation?: TripPreparation): string {
  if (!preparation) return '';
  return [preparation.note, preparation.boatDescription ? `Boats & gear: ${preparation.boatDescription}` : '',
    preparation.vehicleDescription ? `Shuttle: ${preparation.vehicleDescription}` : ''].filter(Boolean).join('\n\n');
}

/** Unchanged legacy notes keep their original fields, limits, and exact content. */
export function withTripNotes(preparation: TripPreparation | undefined, notes: string): TripPreparation | undefined {
  if (notes === tripNotes(preparation)) return preparation ? { ...preparation } : undefined;
  return { checkInLocal: '', groupSize: null, ...preparation, boatDescription: '', vehicleDescription: '', note: notes };
}
