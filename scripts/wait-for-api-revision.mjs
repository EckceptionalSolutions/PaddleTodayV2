import { waitForApiRevision } from './lib/deployment-revision.mjs';
try {
  await waitForApiRevision({
    baseUrl: process.env.DEPLOYMENT_BASE_URL || 'https://paddletodayapi-h7efgxcfg9h7gne9.centralus-01.azurewebsites.net',
    expectedRevision: process.env.DEPLOYMENT_EXPECTED_REVISION,
    onAttempt: result => console.log(JSON.stringify(result)),
  });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
