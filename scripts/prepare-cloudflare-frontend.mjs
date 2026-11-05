import { prepareCloudflareFrontend } from './lib/cloudflare-frontend.mjs';
import { verifyCloudflareFrontendCapacity } from './lib/frontend-capacity.mjs';
try {
  const stage = process.env.FRONTEND_DEPLOYMENT_STAGE;
  if (!['canary', 'production'].includes(stage)) throw new Error('Set FRONTEND_DEPLOYMENT_STAGE to canary or production.');
  const directory = process.argv[2] || 'tmp/frontend';
  console.log(JSON.stringify({ ...await prepareCloudflareFrontend(directory, process.argv[3] || 'staticwebapp.config.json', process.env.SOURCE_REVISION || null, { noIndex: stage === 'canary' }),
    capacity: await verifyCloudflareFrontendCapacity(directory) }));
}
catch (error) { console.error(error.message); process.exitCode = 1; }
