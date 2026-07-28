import {
  clearMapMarkers,
  createMapMarker,
  createMapStatusController,
  createPaddleMap,
  ensureMapLibre,
  escapeHtml,
  fitMapBounds,
  isMapReady,
  removeMapOverlay,
  syncGeoJsonOverlay,
  waitForMapReady,
} from './map-runtime.js';

export function featuredRouteLineColor(rating) {
  if (rating === 'Strong' || rating === 'Good') return '#2c8a54';
  if (rating === 'Fair') return '#ad752c';
  if (rating === 'No-go') return '#bb5840';
  return '#1e7397';
}

export function featuredRouteFallbackFeature(points) {
  if (points.length < 2) {
    return null;
  }

  return {
    type: 'Feature',
    properties: { traced: false },
    geometry: {
      type: 'LineString',
      coordinates: points.map((point) => [point.longitude, point.latitude]),
    },
  };
}

export function createBoardFeaturedMapController({
  elements = {},
  getAccessPoints,
  getRouteLine,
  getTracedCoordinates,
  markerClassFor,
  markerLabel,
  statusLabel,
  viewportProfile,
  resizeBeforeMarkers = false,
  ensureMapLibreImpl = ensureMapLibre,
  createMap = createPaddleMap,
  clearMarkers = clearMapMarkers,
  fitBounds = fitMapBounds,
  isReady = isMapReady,
  waitUntilReady = waitForMapReady,
  documentObject = document,
  logError = (error) => console.error('Failed to load featured map.', error),
}) {
  let runtime = null;
  let markers = [];
  let renderVersion = 0;
  const statusController = createMapStatusController(elements.status);

  function clearFeaturedMapMarkers() {
    markers = clearMarkers(markers);
  }

  function syncFeaturedRouteLine(routeLine, rating) {
    if (!runtime || !isReady(runtime)) {
      return null;
    }

    const sourceId = 'featured-route-line';
    const layerId = 'featured-route-line';

    if (routeLine) {
      syncGeoJsonOverlay(runtime, {
        sourceId,
        data: routeLine,
        layers: [{
          id: layerId,
          type: 'line',
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': featuredRouteLineColor(rating),
            'line-width': 3,
            'line-opacity': 0.82,
          },
        }],
      });

      runtime.setPaintProperty(layerId, 'line-color', featuredRouteLineColor(rating));
      return routeLine;
    }

    removeMapOverlay(runtime, {
      layerIds: [layerId],
      sourceIds: [sourceId],
    });
    return null;
  }

  function featuredMapFocusPoints(item, accessPoints, routeLine) {
    const tracedCoordinates = getTracedCoordinates(routeLine);
    if (tracedCoordinates.length > 1) {
      return tracedCoordinates.map(([longitude, latitude]) => ({ longitude, latitude }));
    }
    if (accessPoints.length > 0) {
      return accessPoints;
    }

    const river = item?.cardRoute?.river;
    return Number.isFinite(river?.longitude) && Number.isFinite(river?.latitude)
      ? [river]
      : [];
  }

  function resetPresentation() {
    if (elements.status instanceof HTMLElement) {
      statusController.ready({ message: '' });
      elements.status.hidden = true;
    }
    if (elements.caption instanceof HTMLElement) {
      elements.caption.textContent = '';
      elements.caption.hidden = true;
    }
  }

  async function renderFeaturedMap(item, { visible = false, status = '' } = {}) {
    if (
      !(elements.shell instanceof HTMLElement)
      || !(elements.container instanceof HTMLElement)
    ) {
      return;
    }

    const currentRenderVersion = ++renderVersion;
    elements.shell.hidden = !visible;

    if (elements.status instanceof HTMLElement) {
      if (status) {
        statusController.loading({ message: status });
      } else {
        statusController.ready({ message: '' });
      }
      elements.status.hidden = !status;
    }
    if (elements.caption instanceof HTMLElement) {
      elements.caption.textContent = '';
      elements.caption.hidden = true;
    }

    const rating = item?.cardRoute?.rating;
    if (!visible || !item) {
      clearFeaturedMapMarkers();
      syncFeaturedRouteLine(null, rating);
      return;
    }

    const accessPoints = getAccessPoints(item);
    const river = item.cardRoute.river;
    const hasCenterPoint =
      Number.isFinite(river.latitude) && Number.isFinite(river.longitude);
    if (!hasCenterPoint && accessPoints.length === 0) {
      clearFeaturedMapMarkers();
      syncFeaturedRouteLine(null, rating);
      return;
    }

    try {
      const maplibregl = await ensureMapLibreImpl();
      if (!maplibregl || currentRenderVersion !== renderVersion) {
        return;
      }

      if (!runtime) {
        const startingPoint = accessPoints[0] ?? river;
        runtime = createMap(maplibregl, {
          profile: 'staticPreview',
          container: elements.container,
          center: [startingPoint.longitude, startingPoint.latitude],
          zoom: 8.8,
          minZoom: 3.4,
          maxZoom: 12,
        });
        await waitUntilReady(runtime);
      }

      if (currentRenderVersion !== renderVersion) {
        return;
      }
      await waitUntilReady(runtime);
      if (currentRenderVersion !== renderVersion) {
        return;
      }

      const routeLine = await getRouteLine(item, accessPoints);
      if (currentRenderVersion !== renderVersion) {
        return;
      }

      if (resizeBeforeMarkers) {
        runtime.resize();
      }
      clearFeaturedMapMarkers();
      syncFeaturedRouteLine(routeLine, rating);

      if (accessPoints.length > 0) {
        const bounds = new maplibregl.LngLatBounds();
        for (const point of accessPoints) {
          const markerNode = documentObject.createElement('div');
          markerNode.className =
            `detail-access-marker detail-access-marker--${point.kind === 'putIn' ? 'putin' : 'takeout'}`;
          markerNode.innerHTML = `<span>${point.kind === 'putIn' ? 'IN' : 'OUT'}</span>`;
          markerNode.setAttribute('aria-hidden', 'true');

          const marker = createMapMarker({
            maplibregl,
            mapRuntime: runtime,
            element: markerNode,
            point,
          });
          markers.push(marker);
        }

        const focusPoints = featuredMapFocusPoints(item, accessPoints, routeLine);
        for (const point of focusPoints) {
          bounds.extend([point.longitude, point.latitude]);
        }

        if (focusPoints.length > 1) {
          fitBounds(runtime, bounds, {
            profile: viewportProfile,
          });
        } else {
          runtime.jumpTo({
            center: [accessPoints[0].longitude, accessPoints[0].latitude],
            zoom: 10.2,
          });
        }
      } else {
        const markerNode = documentObject.createElement('div');
        markerNode.className = markerClassFor(item);
        markerNode.innerHTML = `<span>${escapeHtml(markerLabel(item))}</span>`;
        markerNode.setAttribute('aria-hidden', 'true');

        const marker = createMapMarker({
          maplibregl,
          mapRuntime: runtime,
          element: markerNode,
          point: river,
        });
        markers.push(marker);
        runtime.jumpTo({
          center: [river.longitude, river.latitude],
          zoom: 8.8,
        });
      }

      if (!resizeBeforeMarkers) {
        runtime.resize();
      }
      if (elements.status instanceof HTMLElement) {
        statusController.ready({ message: statusLabel(item) });
        elements.status.hidden = false;
      }
      if (elements.caption instanceof HTMLElement) {
        elements.caption.textContent = '';
        elements.caption.hidden = true;
      }
    } catch (error) {
      logError(error);
      clearFeaturedMapMarkers();
      syncFeaturedRouteLine(null, rating);
      elements.shell.hidden = true;
      statusController.unavailable({ message: '' });
      resetPresentation();
    }
  }

  return {
    getRuntime: () => runtime,
    renderFeaturedMap,
  };
}
