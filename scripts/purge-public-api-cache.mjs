import { purgePublicApiCache } from './lib/public-api-cache-purge.mjs';

try {
  const result = await purgePublicApiCache({ paths: process.env.CACHE_PURGE_PATHS, token: process.env.CLOUDFLARE_API_TOKEN, zoneId: process.env.CLOUDFLARE_ZONE_ID });
  console.log(JSON.stringify(result, null, 2));
  console.log('Verify the ordinary public URL response before treating corrected content as publicly served.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
