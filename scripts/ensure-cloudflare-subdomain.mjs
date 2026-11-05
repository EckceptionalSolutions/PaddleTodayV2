import { ensureWorkersSubdomain } from '../infra/cloudflare/account-subdomain.mjs';
try {
  console.log(JSON.stringify(await ensureWorkersSubdomain({ accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    token: process.env.CLOUDFLARE_API_TOKEN })));
} catch (error) { console.error(error.message); process.exitCode = 1; }
