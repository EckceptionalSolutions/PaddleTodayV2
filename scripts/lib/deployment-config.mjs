const required = {
  api: ['AZURE_WEBAPP_NAME', 'AZUREAPPSERVICE_PUBLISHPROFILE'],
  frontend: ['AZURE_STATIC_WEB_APPS_API_TOKEN'],
  snapshot: ['AZURE_CREDENTIALS', 'SNAPSHOT_SAS_URL'],
};

export function checkDeploymentConfig(target, env, now = Date.now()) {
  if (!required[target]) return ['Choose api, frontend, or snapshot.'];
  const errors = required[target].filter(key => !env[key]?.trim()).map(key => `${key} is missing.`);
  if (target === 'snapshot' && env.AZURE_CREDENTIALS?.trim()) {
    try {
      const credentials = JSON.parse(env.AZURE_CREDENTIALS);
      if (!['clientId', 'clientSecret', 'subscriptionId', 'tenantId'].every(key => typeof credentials?.[key] === 'string' && credentials[key].trim())) throw new Error();
    } catch { errors.push('AZURE_CREDENTIALS must be a JSON service principal credential with clientId, clientSecret, subscriptionId, and tenantId.'); }
  }
  if (target === 'snapshot' && env.SNAPSHOT_SAS_URL?.trim()) {
    try {
      const url = new URL(env.SNAPSHOT_SAS_URL);
      if (url.protocol !== 'https:' || !url.searchParams.get('sig')) throw new Error();
      const expiry = url.searchParams.get('se');
      if (expiry && (!Number.isFinite(Date.parse(expiry)) || Date.parse(expiry) <= now)) errors.push('SNAPSHOT_SAS_URL has an invalid or expired expiry.');
    } catch { errors.push('SNAPSHOT_SAS_URL must be an HTTPS SAS URL with a signature.'); }
  }
  return errors;
}
