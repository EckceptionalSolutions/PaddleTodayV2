import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import { hasValidLocationCoordinates, type StoredLocation } from '../lib/location';
import { createLocationRequest } from '../lib/location-request';
import { locationCandidates } from '../lib/location-candidates';
import { createLocationPersistence } from '../lib/location-persistence';
import { isRecord, parseJson } from '../lib/storage';

const STORAGE_KEY = 'paddletoday:user-location';

export type LocationStatus = 'loading' | 'ready' | 'idle' | 'requesting' | 'denied' | 'error';

export interface LocationRequestResult {
  location: StoredLocation | null;
  permission: 'granted' | 'denied' | 'error';
  canAskAgain: boolean;
}

interface StoredLocationContextValue {
  location: StoredLocation | null;
  status: LocationStatus;
  requestLocation: () => Promise<LocationRequestResult>;
  searchLocations: (query: string) => Promise<StoredLocation[]>;
  selectPlanningLocation: (location: StoredLocation) => Promise<boolean>;
  clearLocation: () => Promise<void>;
  cancelLocationRequest: () => void;
  storageState: { saving: boolean; error: boolean };
  retryLocationSave: () => Promise<void>;
}

const StoredLocationContext = createContext<StoredLocationContextValue | null>(null);

export function StoredLocationProvider({ children }: PropsWithChildren) {
  const [location, setLocation] = useState<StoredLocation | null>(null);
  const locationRef = useRef<StoredLocation | null>(null);
  const [status, setStatus] = useState<LocationStatus>('loading');
  const activeRequest = useRef<ReturnType<typeof createLocationRequest> | null>(null);
  const revision = useRef(0);
  const [storageState, setStorageState] = useState({ saving: false, error: false });
  const persistLocation = useMemo(() => createLocationPersistence(AsyncStorage, setStorageState), []);
  const retryLocationSave = useCallback(() => persistLocation(locationRef.current), [persistLocation]);

  const hydrateLocation = useCallback(async () => {
    const initialRevision = revision.current;
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (revision.current !== initialRevision) return;
      const parsed = parseJson(raw);
      if (isStoredLocation(parsed)) {
        locationRef.current = parsed;
        setLocation(parsed);
        setStatus('ready');
        return;
      }
    } catch {
      // Ignore corrupt local state and fall through to idle.
    }

    if (revision.current === initialRevision) setStatus('idle');
  }, []);

  useEffect(() => {
    void hydrateLocation();
    return () => {
      revision.current += 1;
      activeRequest.current?.cancel();
      activeRequest.current = null;
    };
  }, [hydrateLocation]);

  const beginRequest = useCallback(() => {
    activeRequest.current?.cancel();
    revision.current += 1;
    const request = createLocationRequest();
    activeRequest.current = request;
    setStatus('requesting');
    return request;
  }, []);

  const cancelLocationRequest = useCallback(() => {
    activeRequest.current?.cancel();
    activeRequest.current = null;
    revision.current += 1;
    setStatus(locationRef.current ? 'ready' : 'idle');
  }, []);

  const requestLocation = useCallback(async (): Promise<LocationRequestResult> => {
    const request = beginRequest();

    try {
      const permission = await request.run(Location.requestForegroundPermissionsAsync());
      if (activeRequest.current !== request) return { location: null, permission: 'error', canAskAgain: true };
      if (permission.status !== 'granted') {
        setStatus('denied');
        return {
          location: null,
          permission: 'denied',
          canAskAgain: permission.canAskAgain,
        };
      }

      const reading = await request.run(Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      }));
      if (!hasValidLocationCoordinates(reading.coords)) throw new Error('Invalid device coordinates');

      const label = await request.run(reverseGeocodeLabel(reading.coords.latitude, reading.coords.longitude));
      if (activeRequest.current !== request) return { location: null, permission: 'error', canAskAgain: true };
      const nextLocation: StoredLocation = {
        latitude: reading.coords.latitude,
        longitude: reading.coords.longitude,
        label,
        source: 'device',
      };

      locationRef.current = nextLocation;
      setLocation(nextLocation);
      setStatus('ready');
      await persistLocation(nextLocation);
      return {
        location: nextLocation,
        permission: 'granted',
        canAskAgain: permission.canAskAgain,
      };
    } catch {
      if (activeRequest.current === request) setStatus(location ? 'ready' : 'error');
      return {
        location: null,
        permission: 'error',
        canAskAgain: true,
      };
    } finally {
      request.finish();
      if (activeRequest.current === request) activeRequest.current = null;
    }
  }, [beginRequest, location, persistLocation]);

  const searchLocations = useCallback(async (query: string): Promise<StoredLocation[]> => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return [];
    const request = beginRequest();
    try {
      const remoteResults = await request.run(geocodeWithOpenMeteo(cleanQuery, request.signal));
      if (activeRequest.current !== request) return [];
      if (remoteResults.length) {
        setStatus(locationRef.current ? 'ready' : 'idle');
        return remoteResults;
      }
      const [result] = await request.run(Location.geocodeAsync(cleanQuery));
      if (activeRequest.current !== request) return [];
      if (!hasValidLocationCoordinates(result)) {
        setStatus(locationRef.current ? 'ready' : 'idle');
        return [];
      }
      const label = await request.run(reverseGeocodeLabel(result.latitude, result.longitude));
      if (activeRequest.current !== request) return [];
      setStatus(locationRef.current ? 'ready' : 'idle');
      return [{ latitude: result.latitude, longitude: result.longitude,
        label: label === 'Current location' ? cleanQuery : label, source: 'search' }];
    } catch {
      if (activeRequest.current === request) setStatus(locationRef.current ? 'ready' : 'error');
      return [];
    } finally {
      request.finish();
      if (activeRequest.current === request) activeRequest.current = null;
    }
  }, [beginRequest]);

  const selectPlanningLocation = useCallback(async (candidate: StoredLocation) => {
    if (!isStoredLocation(candidate)) return false;
    activeRequest.current?.cancel();
    activeRequest.current = null;
    revision.current += 1;
    const next = { ...candidate, source: 'search' as const };
    locationRef.current = next;
    setLocation(next);
    setStatus('ready');
    await persistLocation(next);
    return true;
  }, [persistLocation]);

  const clearLocation = useCallback(async () => {
    activeRequest.current?.cancel();
    activeRequest.current = null;
    revision.current += 1;
    locationRef.current = null;
    setLocation(null);
    setStatus('idle');
    await persistLocation(null);
  }, [persistLocation]);

  const value = useMemo(
    () => ({ location, status, requestLocation, searchLocations, selectPlanningLocation, clearLocation, cancelLocationRequest, storageState, retryLocationSave }),
    [location, status, requestLocation, searchLocations, selectPlanningLocation, clearLocation, cancelLocationRequest, storageState, retryLocationSave]
  );

  return createElement(StoredLocationContext.Provider, { value }, children);
}

async function geocodeWithOpenMeteo(query: string, signal: AbortSignal): Promise<StoredLocation[]> {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json&countryCode=US`,
    { headers: { accept: 'application/json' }, signal }
  );
  if (!response.ok) return [];
  return locationCandidates(await response.json());
}

export function useStoredLocation() {
  const context = useContext(StoredLocationContext);
  if (!context) {
    throw new Error('useStoredLocation must be used within StoredLocationProvider');
  }

  return context;
}

async function reverseGeocodeLabel(latitude: number, longitude: number) {
  const lookup = createLocationRequest(4_000);
  try {
    const [place] = await lookup.run(Location.reverseGeocodeAsync({ latitude, longitude }));
    const city = place?.city || place?.subregion || place?.district || place?.name;
    const region = place?.region || place?.country;
    if (city && region) {
      return `${city}, ${region}`;
    }
    if (city) {
      return city;
    }
  } catch {
    // Fall back to a simple label below.
  } finally {
    lookup.finish();
  }

  return 'Current location';
}

function isStoredLocation(value: unknown): value is StoredLocation {
  return (
    isRecord(value) &&
    typeof value.label === 'string' &&
    hasValidLocationCoordinates(value)
  );
}
