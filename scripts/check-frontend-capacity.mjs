import { verifyFrontendCapacity } from './lib/frontend-capacity.mjs';
try { console.log(JSON.stringify(await verifyFrontendCapacity(process.argv[2] || 'tmp/frontend', process.env.AZURE_STATIC_WEB_APPS_TIER || 'Standard'))); }
catch (error) { console.error(error.message); process.exitCode = 1; }
