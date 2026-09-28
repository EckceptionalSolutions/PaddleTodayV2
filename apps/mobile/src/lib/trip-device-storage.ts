import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import * as Files from 'expo-file-system/legacy';

const queues = new Map<string, Promise<unknown>>();
function serial<T>(key: string, action: () => Promise<T>) {
  const work = (queues.get(key) ?? Promise.resolve()).catch(() => {}).then(action);
  queues.set(key, work);
  void work.finally(() => { if (queues.get(key) === work) queues.delete(key); }).catch(() => {});
  return work;
}
function segments(raw: string | null): string[] | null {
  if (!raw?.startsWith('{"tripSegments":')) return null;
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed.tripSegments) || !parsed.tripSegments.every((k: unknown) => typeof k === 'string')) throw new Error('Saved trip storage could not be read.');
  return parsed.tripSegments;
}
function fileReference(raw: string | null) {
  if (!raw?.startsWith('{"tripFile":')) return null;
  const value = JSON.parse(raw).tripFile;
  const root = Files.documentDirectory + 'paddletoday-trips/';
  if (typeof value !== 'string' || !value.startsWith(root) || !/^[a-f0-9-]+\.json$/.test(value.slice(root.length))) throw new Error('Saved trip storage could not be read.');
  return value;
}
/** Keep photos and large state out of Android's SQLite row/database limits. */
export const tripDeviceStorage = {
  getItem(key: string) {
    return serial(key, async () => {
      const raw = await AsyncStorage.getItem(key), file = fileReference(raw), parts = segments(raw);
      if (file) return Files.readAsStringAsync(file);
      if (!parts) return raw;
      const values = await AsyncStorage.multiGet(parts);
      if (values.some(([, v]) => v === null)) throw new Error('Saved trip storage is incomplete. Nothing was overwritten.');
      return values.map(([, v]) => v).join('');
    });
  },
  setItem(key: string, value: string) {
    return serial(key, async () => {
      const raw = await AsyncStorage.getItem(key), old = segments(raw), oldFile = fileReference(raw);
      if (value.length <= 131072 && !key.includes(':photo:')) await AsyncStorage.setItem(key, value);
      else {
        if (!Files.documentDirectory) throw new Error('Device storage is unavailable.');
        const directory = Files.documentDirectory + 'paddletoday-trips/';
        await Files.makeDirectoryAsync(directory, { intermediates: true });
        const accountKey = key.split(':photo:')[0]!.replace(/:editor$/, '');
        const accountHash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, accountKey);
        const file = directory + accountHash + '-' + Crypto.randomUUID() + '.json';
        await Files.writeAsStringAsync(file, value);
        await AsyncStorage.setItem(key, JSON.stringify({ tripFile: file }));
      }
      if (old) await AsyncStorage.multiRemove(old).catch(() => {});
      if (oldFile) await Files.deleteAsync(oldFile, { idempotent: true }).catch(() => {});
    });
  },
  removeItem(key: string) {
    return serial(key, async () => {
      const raw = await AsyncStorage.getItem(key), old = segments(raw), oldFile = fileReference(raw);
      await AsyncStorage.removeItem(key);
      if (old) await AsyncStorage.multiRemove(old);
      if (oldFile) await Files.deleteAsync(oldFile, { idempotent: true });
    });
  },
  async clearAccountFiles(storageKey: string) {
    if (!Files.documentDirectory) return;
    const directory = Files.documentDirectory + 'paddletoday-trips/';
    if (!(await Files.getInfoAsync(directory)).exists) return;
    const prefix = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, storageKey);
    for (const name of await Files.readDirectoryAsync(directory)) {
      if (name.startsWith(prefix + '-') && /^[a-f0-9-]+\.json$/.test(name)) await Files.deleteAsync(directory + name, { idempotent: true });
    }
  },
};
