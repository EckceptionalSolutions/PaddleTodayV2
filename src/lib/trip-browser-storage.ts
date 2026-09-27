let database: Promise<IDBDatabase> | null = null;
function open() {
  return database ??= new Promise((resolve, reject) => {
    const request = indexedDB.open('paddletoday-trips', 1);
    request.onupgradeneeded = () => { request.result.createObjectStore('state'); };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => { database = null; reject(new Error('Browser storage is unavailable. Enable site storage to save trips on this device.')); };
  });
}
async function transact<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>) {
  const db = await open();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction('state', mode), request = action(tx.objectStore('state'));
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = () => reject(new Error('Could not save locally. Your browser storage may be full.'));
    tx.onabort = tx.onerror;
  });
}
export const tripBrowserStorage = {
  async getItem(key: string) { return (await transact('readonly', store => store.get(key))) as string | null ?? null; },
  async setItem(key: string, value: string) { await transact('readwrite', store => store.put(value, key)); },
  async removeItem(key: string) { await transact('readwrite', store => store.delete(key)); },
  async clearAccount(uid: string) {
    const keys = await transact('readonly', store => store.getAllKeys());
    for (const key of keys) if (typeof key === 'string' && (key === `paddletoday:trips:v1:${uid}` || key.startsWith(`paddletoday:trips:v1:${uid}:`) || key === `trip-editor:${uid}`)) await transact('readwrite', store => store.delete(key));
  },
};
