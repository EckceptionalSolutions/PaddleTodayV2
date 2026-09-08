import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState, type ComponentProps, type RefObject } from 'react';
import { exploreCameraAction, restoreExploreViewport, type ExploreCameraState, type ExploreViewportSnapshot } from '../lib/explore-camera';
import type { MapViewport } from '../lib/map-viewport';
import { RoutePlotMap, type RoutePlotMapHandle } from './route-plot-map';

type ExploreRouteMapProps = ComponentProps<typeof RoutePlotMap> & {
  mapRef: RefObject<RoutePlotMapHandle | null>;
  viewportMemory: RefObject<ExploreViewportSnapshot | null>;
  cameraContext: string;
  selectedSlug: string | null;
  hasFilters: boolean;
};

// This component lives exactly as long as the map, while its viewport memory
// belongs to Explore and survives List or an empty-result view.
export function ExploreRouteMap({ mapRef, viewportMemory, cameraContext, selectedSlug, hasFilters, ...mapProps }: ExploreRouteMapProps) {
  const isFocused = useIsFocused();
  const [ready, setReady] = useState(false);
  const [initialViewport] = useState(() => restoreExploreViewport(viewportMemory.current, cameraContext));
  const cameraState = useRef<ExploreCameraState | null>(initialViewport ? { context: cameraContext, selectedSlug } : null);
  const onReady = useCallback(() => setReady(true), []);
  const rememberViewport = useCallback((viewport: MapViewport) => {
    const copy = restoreExploreViewport({ context: cameraContext, viewport }, cameraContext);
    if (copy) viewportMemory.current = { context: cameraContext, viewport: copy };
  }, [cameraContext, viewportMemory]);
  const hasLocation = Boolean(mapProps.userLocation);

  useEffect(() => {
    if (!isFocused || !ready) return;
    const frame = requestAnimationFrame(() => {
      const next = { context: cameraContext, selectedSlug };
      const action = exploreCameraAction(cameraState.current, next, hasFilters, hasLocation);
      cameraState.current = next;
      if (action === 'all') mapRef.current?.focusAll();
      else if (action === 'user') mapRef.current?.focusUserArea();
    });
    return () => cancelAnimationFrame(frame);
  }, [cameraContext, hasFilters, hasLocation, isFocused, mapRef, ready, selectedSlug]);

  return <RoutePlotMap {...mapProps} ref={mapRef} initialViewport={initialViewport} onViewportChange={rememberViewport} onReady={onReady} />;
}
