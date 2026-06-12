import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import type { StoredLocation } from '../lib/location';
import { isRecord, parseJson } from '../lib/storage';

const STORAGE_KEY = 'paddletoday:user-location';

export type LocationStatus = 'loading' | 'ready' | 'idle' | 'requesting' | 'denied' | 'error';

interface StoredLocationContextValue {
  location: StoredLocation | null;
  status: LocationStatus;
  requestLocation: () => Promise<void>;
  clearLocation: () => Promise<void>;
}

const StoredLocationContext = createContext<StoredLocationContextValue | null>(null);

export function StoredLocationProvider({ children }: PropsWithChildren) {
  const [location, setLocation] = useState<StoredLocation | null>(null);
  const [status, setStatus] = useState<LocationStatus>('loading');

  const hydrateLocation = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = parseJson(raw);
      if (isStoredLocation(parsed)) {
        setLocation(parsed);
        setStatus('ready');
        return;
      }
    } catch {
      // Ignore corrupt local state and fall through to idle.
    }

    setStatus('idle');
  }, []);

  useEffect(() => {
    void hydrateLocation();
  }, [hydrateLocation]);

  const requestLocation = useCallback(async () => {
    setStatus('requesting');

    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        setStatus('denied');
        return;
      }

      const reading = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const label = await reverseGeocodeLabel(reading.coords.latitude, reading.coords.longitude);
      const nextLocation: StoredLocation = {
        latitude: reading.coords.latitude,
        longitude: reading.coords.longitude,
        label,
        source: 'device',
      };

      setLocation(nextLocation);
      setStatus('ready');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextLocation));
    } catch {
      setStatus('error');
    }
  }, []);

  const clearLocation = useCallback(async () => {
    setLocation(null);
    setStatus('idle');
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ location, status, requestLocation, clearLocation }),
    [location, status, requestLocation, clearLocation]
  );

  return createElement(StoredLocationContext.Provider, { value }, children);
}

export function useStoredLocation() {
  const context = useContext(StoredLocationContext);
  if (!context) {
    throw new Error('useStoredLocation must be used within StoredLocationProvider');
  }

  return context;
}

async function reverseGeocodeLabel(latitude: number, longitude: number) {
  try {
    const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
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
  }

  return 'Current location';
}

function isStoredLocation(value: unknown): value is StoredLocation {
  return (
    isRecord(value) &&
    typeof value.latitude === 'number' &&
    typeof value.longitude === 'number' &&
    typeof value.label === 'string'
  );
}
