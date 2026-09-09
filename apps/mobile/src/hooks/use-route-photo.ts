import { useState } from 'react';
import { illustrativePhotoForRiver, routePhotoForRiver } from '../lib/route-photos';

export function useRoutePhoto(river: { slug: string; riverId?: string }) {
  const primary = routePhotoForRiver(river);
  const fallbackUri = primary.isPlaceholder ? primary.uri : illustrativePhotoForRiver(river);
  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set());
  const useFallback = failed.has(primary.uri);
  const photo = useFallback ? { uri: fallbackUri, isPlaceholder: true, sourceKind: 'placeholder' } : primary;
  return {
    photo,
    unavailable: failed.has(photo.uri),
    onError: () => setFailed(current => new Set([...current, photo.uri])),
  };
}
