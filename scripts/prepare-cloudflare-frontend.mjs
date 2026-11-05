import { prepareCloudflareFrontend } from './lib/cloudflare-frontend.mjs';
import { verifyCloudflareFrontendCapacity } from './lib/frontend-capacity.mjs';
try {
  const directory = process.argv[2] || 'tmp/frontend';
  console.log(JSON.stringify({ ...await prepareCloudflareFrontend(directory, process.argv[3] || 'staticwebapp.config.json', process.env.SOURCE_REVISION || null),
    capacity: await verifyCloudflareFrontendCapacity(directory) }));
}
catch (error) { console.error(error.message); process.exitCode = 1; }
