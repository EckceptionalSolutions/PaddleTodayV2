// Keep selection available immediately while a dense native map attaches.
// The final batch contains every viewport marker, with unchanged identities.
export function mapMarkerBatch<T extends { id: string }>(points: T[], limit: number, selectedId?: string | null): T[] {
  if (limit >= points.length) return points;
  const batch = points.slice(0, Math.max(0, Math.floor(limit)));
  const selected = selectedId ? points.find(point => point.id === selectedId) : undefined;
  return selected && !batch.includes(selected) ? [...batch, selected] : batch;
}
