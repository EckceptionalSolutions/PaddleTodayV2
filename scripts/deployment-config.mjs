import { checkDeploymentConfig } from './lib/deployment-config.mjs';

const errors = checkDeploymentConfig(process.argv[2], process.env);
if (errors.length) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else console.log('Deployment configuration is present and structurally valid. Azure still needs to authenticate and authorize the deployment.');
