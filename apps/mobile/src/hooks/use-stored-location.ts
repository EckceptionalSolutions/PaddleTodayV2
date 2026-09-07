import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import { hasValidLocationCoordinates, type StoredLocation } from '../lib/location';
import { createLocationRequest } from '../lib/location-request';
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
  setLocationFromQuery: (query: string) => Promise<StoredLocation | null>;
  clearLocation: () => Promise<void>;
  cancelLocationRequest: () => void;
}

const StoredLocationContext = createContext<StoredLocationContextValue | null>(null);

export function StoredLocationProvider({ children }: PropsWithChildren) {
  const [location, setLocation] = useState<StoredLocation | null>(null);
  const [status, setStatus] = useState<LocationStatus>('loading');
  const activeRequest = useRef<ReturnType<typeof createLocationRequest> | null>(null);
  const revision = useRef(0);

  const hydrateLocation = useCallback(async () => {
    const initialRevision = revision.current;
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (revision.current !== initialRevision) return;
      const parsed = parseJson(raw);
      if (isStoredLocation(parsed)) {
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
    setStatus(location ? 'ready' : 'idle');
  }, [location]);

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

      setLocation(nextLocation);
      setStatus('ready');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextLocation)).catch(() => undefined);
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
  }, [beginRequest, location]);

  const setLocationFromQuery = useCallback(async (query: string) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      return null;
    }

    const request = beginRequest();

    try {
      const remoteResult = await request.run(geocodeWithOpenMeteo(cleanQuery, request.signal));
      const [result] = remoteResult ? [remoteResult] : await request.run(Location.geocodeAsync(cleanQuery));
      if (activeRequest.current !== request) return null;
      if (!hasValidLocationCoordinates(result)) {
        setStatus(location ? 'ready' : 'idle');
        return null;
      }

      const resolvedLabel = 'label' in result && typeof result.label === 'string'
        ? result.label
        : await request.run(reverseGeocodeLabel(result.latitude, result.longitude));
      if (activeRequest.current !== request) return null;
      const nextLocation: StoredLocation = {
        latitude: result.latitude,
        longitude: result.longitude,
        label: resolvedLabel === 'Current location' ? cleanQuery : resolvedLabel,
        source: 'search',
      };

      setLocation(nextLocation);
      setStatus('ready');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextLocation)).catch(() => undefined);
      return nextLocation;
    } catch {
      if (activeRequest.current === request) setStatus(location ? 'ready' : 'error');
      return null;
    } finally {
      request.finish();
      if (activeRequest.current === request) activeRequest.current = null;
    }
  }, [beginRequest, location]);

  const clearLocation = useCallback(async () => {
    activeRequest.current?.cancel();
    activeRequest.current = null;
    revision.current += 1;
    setLocation(null);
    setStatus('idle');
    await AsyncStorage.removeItem(STORAGE_KEY).catch(() => undefined);
  }, []);

  const value = useMemo(
    () => ({ location, status, requestLocation, setLocationFromQuery, clearLocation, cancelLocationRequest }),
    [location, status, requestLocation, setLocationFromQuery, clearLocation, cancelLocationRequest]
  );

  return createElement(StoredLocationContext.Provider, { value }, children);
}

async function geocodeWithOpenMeteo(query: string, signal: AbortSignal): Promise<{
  latitude: number;
  longitude: number;
  label: string;
} | null> {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json&countryCode=US`,
    { headers: { accept: 'application/json' }, signal }
  );
  if (!response.ok) {
    return null;
  }

  const payload: unknown = await response.json();
  if (!isRecord(payload) || !Array.isArray(payload.results)) {
    return null;
  }

  const candidates = payload.results.filter(isGeocodeCandidate);
  const match = candidates
    .sort((left, right) => (right.population ?? 0) - (left.population ?? 0))[0];
  if (!match) {
    return null;
  }

  const state = match.admin1 || match.country || '';
  return {
    latitude: match.latitude,
    longitude: match.longitude,
    label: state ? `${match.name}, ${state}` : match.name,
  };
}

function isGeocodeCandidate(value: unknown): value is {
  latitude: number;
  longitude: number;
  name: string;
  admin1?: string;
  country?: string;
  population?: number;
} {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    hasValidLocationCoordinates(value)
  );
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
