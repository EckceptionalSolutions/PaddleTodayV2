const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();
const zoneId = process.env.CLOUDFLARE_ZONE_ID?.trim();
const urlsJson = process.env.CLOUDFLARE_PURGE_URLS_JSON;

if (!apiToken || !zoneId || !urlsJson) {
  console.error('CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID, and CLOUDFLARE_PURGE_URLS_JSON are required.');
  process.exit(1);
}

let urls;
try {
  urls = JSON.parse(urlsJson);
} catch {
  console.error('CLOUDFLARE_PURGE_URLS_JSON must be a JSON array of exact public URLs.');
  process.exit(1);
}

if (!Array.isArray(urls) || urls.length === 0 || urls.length > 30 || urls.some((url) => typeof url !== 'string')) {
  console.error('Provide between 1 and 30 exact URLs as a JSON array.');
  process.exit(1);
}

const uniqueUrls = [...new Set(urls)];
for (const value of uniqueUrls) {
  let url;
  try {
    url = new URL(value);
  } catch {
    console.error(`Invalid URL: ${value}`);
    process.exit(1);
  }

  if (
    url.protocol !== 'https:' ||
    url.hostname !== 'paddletoday.com' ||
    url.port !== '' ||
    url.username !== '' ||
    url.password !== '' ||
    url.hash !== ''
  ) {
    console.error(`Only exact HTTPS URLs on paddletoday.com without fragments can be purged: ${value}`);
    process.exit(1);
  }
}

const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${encodeURIComponent(zoneId)}/purge_cache`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ files: uniqueUrls }),
});

let payload;
try {
  payload = await response.json();
} catch {
  console.error(`Cloudflare returned an unreadable response (${response.status}).`);
  process.exit(1);
}

if (!response.ok || payload.success !== true) {
  const errors = Array.isArray(payload.errors)
    ? payload.errors.map((error) => `${error.code ?? ''} ${error.message ?? ''}`.trim()).join('; ')
    : 'Unknown Cloudflare API error';
  console.error(`Cloudflare URL cache purge failed (${response.status}): ${errors}`);
  process.exit(1);
}

console.log(`Purged ${uniqueUrls.length} exact PaddleToday URL cache entr${uniqueUrls.length === 1 ? 'y' : 'ies'}.`);
