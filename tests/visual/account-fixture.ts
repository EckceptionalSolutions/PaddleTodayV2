import type { Page } from '@playwright/test';
export const uid = 'account-ux-test-user';
export const route = { slug: 'test-river', name: 'Cannon River', putInId: 'upper', putInName: 'Upper landing', takeOutId: 'lower', takeOutName: 'Lower landing' };
export const plan = { title: 'Saturday with friends', route, date: '2099-10-10', launch: '09:00', expected: '', timeZone: 'America/Chicago', itinerary: [] };
export const trip = { ...plan, id: 'trip-test-0000000001', status: 'planned', ownerUid: uid, revision: 1, updatedAt: '2026-09-29T12:00:00Z', updatedBy: uid, members: [{ uid, name: 'Alex', role: 'owner', rsvp: 'going' }], shuttle: [], activity: [] };
export const past = { ...trip, id: 'trip-test-0000000002', title: 'Last summer', date: '2020-06-01', status: 'completed' };
export const log = { id: 'log-test-00000000001', sourceTripId: past.id, route, date: past.date, time: '09:00', timeZone: plan.timeZone, notes: 'A quiet morning on the river.', paddleAgain: 'yes', water: [], photos: [], revision: 1, ownerUid: uid, updatedAt: trip.updatedAt };

export async function accountFixture(page: Page, fail = false, unfinished = false) {
  await page.route('**/identitytoolkit.googleapis.com/**', r => r.fulfill({ json: { users: [{ localId: uid, email: 'alex@example.test', displayName: 'Alex', emailVerified: true, providerUserInfo: [{ providerId: 'google.com', rawId: uid, email: 'alex@example.test', displayName: 'Alex' }] }] } }));
  await page.route('**/securetoken.googleapis.com/**', r => r.abort());
  await page.route('**/api/**', r => {
    const path = new URL(r.request().url()).pathname;
    if (path === '/api/trips/invitation') return r.fulfill({ json: { invitation: { title: 'You’re invited to paddle', date: trip.date } } });
    if (path === '/api/trips/migrate') return r.fulfill({ json: { migrated: true, recovery: {} } });
    if (path === '/api/trips') return fail ? r.fulfill({ status: 503, json: { message: 'Trips are temporarily unavailable.' } }) : r.fulfill({ json: {
      trips: [trip, past, { ...trip, id: 'trip-test-draft00001', title: 'A day to decide', date: '' }, { ...trip, id: 'trip-test-overdue001', title: 'Needs a decision', date: '2020-05-01' }], logs: [log], nextCursor: null,
    } });
    return r.fulfill({ json: { rivers: [] } });
  });
  await page.addInitScript(({ uid, unfinished, plan }) => {
    if (sessionStorage.getItem('fixture-seeded')) return;
    const issued = Math.floor(Date.now() / 1000);
    const encode = (v: object) => btoa(JSON.stringify(v)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const token = `${encode({ alg: 'none' })}.${encode({ sub: uid, user_id: uid, iat: issued, exp: issued + 3600, auth_time: issued })}.fixture`;
    localStorage.setItem('firebase:authUser:account-ux-test-key:paddletoday-web', JSON.stringify({
      uid, email: 'alex@example.test', displayName: 'Alex', emailVerified: true, isAnonymous: false,
      providerData: [{ providerId: 'google.com', uid, displayName: 'Alex', email: 'alex@example.test', phoneNumber: null, photoURL: null }],
      stsTokenManager: { refreshToken: 'fixture-refresh', accessToken: token, expirationTime: Date.now() + 3600000 },
      createdAt: String(Date.now()), lastLoginAt: String(Date.now()), apiKey: 'account-ux-test-key', appName: 'paddletoday-web',
    }));
    if (unfinished) {
      const request = indexedDB.open('paddletoday-trips', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('state');
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction('state', 'readwrite');
        tx.objectStore('state').put(JSON.stringify({ editing: plan, editingId: '', logEdit: null }), `trip-editor:${uid}`);
        tx.oncomplete = () => db.close();
      };
    }
    sessionStorage.setItem('fixture-seeded', 'true');
  }, { uid, unfinished, plan });
}
