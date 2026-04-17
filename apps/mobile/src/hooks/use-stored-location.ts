import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import type { StoredLocation } from '../lib/location';
import { isRecord, parseJson } from '../lib/storage';

const STORAGE_KEY = 'paddletoday:user-location';

export type LocationStatus = 'loading' | 'ready' | 'idle' | 'requesting' | 'denied' | 'error';

export function useStoredLocation() {
  const [location, setLocation] = useState<StoredLocation | null>(null);
  const [status, setStatus] = useState<LocationStatus>('loading');

  useEffect(() => {
    void hydrateLocation();
  }, []);

  async function hydrateLocation() {
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
  }

  async function requestLocation() {
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
  }

  async function clearLocation() {
    setLocation(null);
    setStatus('idle');
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  return {
    location,
    status,
    requestLocation,
    clearLocation,
  };
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
