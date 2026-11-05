import { describe, expect, it, vi } from 'vitest';
import { verifyAuthenticatedFrontend } from './authenticated-frontend.mjs';
const uid = 'paddletoday-hosting-00000000-0000-4000-8000-000000000000';
const token = 'sensitive-fixture-token-not-for-output';
const headers = { 'cache-control': 'private, no-store', 'x-paddletoday-api-proxy': 'paddletoday-api-proxy-v1' };
function fixture() {
  const auth = { createUser: vi.fn(async () => ({ uid })), createCustomToken: vi.fn(async () => 'custom-fixture'),
    getUser: vi.fn(async () => ({ uid, displayName: uid })), deleteUser: vi.fn(async () => {}) };
  const fetchImpl = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({ uid }), { headers }))
    .mockResolvedValueOnce(new Response('{}', { headers })).mockResolvedValueOnce(new Response('{}', { status: 401 }));
  const options = { auth, fetchImpl, origin: 'https://paddletoday.com', uidFactory: () => uid,
    exchangeCustomToken: vi.fn(async () => token) };
  return { auth, fetchImpl, options };
}
describe('temporary authenticated hosting probe', () => {
  it('checks real credential forwarding, deletes its own identity, and emits no token', async () => {
    const f = fixture(), report = await verifyAuthenticatedFrontend(f.options);
    expect(report.status).toBe('passed'); expect(report.cleanup).toBe('deleted'); expect(report.deletedIdentityStatus).toBe(401);
    expect(f.auth.createUser).toHaveBeenCalledWith({ uid, displayName: uid });
    expect(f.auth.deleteUser).toHaveBeenCalledWith(uid);
    expect(f.fetchImpl.mock.calls[0][1].headers.authorization).toBe(`Bearer ${token}`);
    expect(JSON.stringify(report)).not.toContain(token);
  });
  it('still deletes the test identity when API verification fails', async () => {
    const f = fixture(); f.fetchImpl.mockReset().mockResolvedValue(new Response('{}', { status: 401 }));
    expect((await verifyAuthenticatedFrontend(f.options)).status).toBe('failed'); expect(f.auth.deleteUser).toHaveBeenCalledWith(uid);
  });
  it('suppresses SDK errors and cleans up after an uncertain create acknowledgement', async () => {
    const f = fixture(); f.auth.createUser.mockRejectedValue(new Error(token));
    const report = await verifyAuthenticatedFrontend(f.options);
    expect(report.status).toBe('failed'); expect(report.cleanup).toBe('deleted'); expect(f.auth.getUser).toHaveBeenCalledWith(uid);
    expect(JSON.stringify(report)).not.toContain(token);
  });
  it('never deletes a pre-existing identity with a different ownership marker', async () => {
    const f = fixture(); f.auth.createUser.mockRejectedValue(new Error('exists')); f.auth.getUser.mockResolvedValue({ uid, displayName: 'somebody else' });
    expect((await verifyAuthenticatedFrontend(f.options)).cleanup).toBe('not-created'); expect(f.auth.deleteUser).not.toHaveBeenCalled();
  });
  it('records only the generated test uid if cleanup needs operator attention', async () => {
    const f = fixture(); f.auth.deleteUser.mockRejectedValue(new Error(token));
    const report = await verifyAuthenticatedFrontend(f.options);
    expect(report.status).toBe('failed'); expect(report.cleanup).toBe('failed'); expect(report.cleanupUid).toBe(uid);
    expect(JSON.stringify(report)).not.toContain(token);
  });
  it('refuses destinations outside the production account before creating any identity', async () => {
    const f = fixture();
    await expect(verifyAuthenticatedFrontend({ ...f.options, origin: 'https://other.test' })).rejects.toThrow();
    expect(f.auth.createUser).not.toHaveBeenCalled();
  });
});
