import assert from 'node:assert/strict';

/** Register only an unconfigured account; never rename an existing subdomain. */
export async function ensureWorkersSubdomain({ accountId, token, fetchImpl = fetch }) {
  assert.match(accountId || '', /^[a-f0-9]{32}$/);
  assert.ok(token, 'A dedicated Workers publishing token is required.');
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/subdomain`;
  const request = async (method, value) => {
    const response = await fetchImpl(endpoint, { method, redirect: 'error', signal: AbortSignal.timeout(30000),
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      ...(value ? { body: JSON.stringify(value) } : {}) });
    const body = await response.json();
    return { response, body };
  };
  const current = await request('GET');
  const valid = result => result.response.ok && result.body.success === true
    && /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(result.body.result?.subdomain || '');
  if (valid(current)) return { subdomain: current.body.result.subdomain, created: false };
  // 10007 is Cloudflare's explicit unregistered-subdomain condition. Permission,
  // network, and malformed-response failures must never be treated as absence.
  if (![400, 404].includes(current.response.status) || !current.body.errors?.some(error => error.code === 10007)) {
    throw new Error(`Workers subdomain lookup failed (HTTP ${current.response.status}); no account change attempted.`);
  }
  const subdomain = `paddletoday-${accountId.slice(0, 8)}`;
  const created = await request('PUT', { subdomain });
  assert.ok(valid(created) && created.body.result.subdomain === subdomain,
    `Workers subdomain registration did not confirm ${subdomain}; inspect account state before retrying.`);
  const confirmed = await request('GET');
  assert.ok(valid(confirmed) && confirmed.body.result.subdomain === subdomain, 'Workers subdomain readback failed.');
  return { subdomain, created: true };
}
