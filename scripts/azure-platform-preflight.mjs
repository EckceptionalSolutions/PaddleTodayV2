import { execFileSync } from 'node:child_process';

const resourceGroup = process.env.AZURE_RESOURCE_GROUP || 'paddletoday';
const apiApp = process.env.AZURE_API_APP || 'paddletodayapi';
const storageAccount = process.env.AZURE_STORAGE_ACCOUNT || 'paddletoday';
const staticWebApp = process.env.AZURE_STATIC_WEB_APP || 'PaddleToday';
const customHostname = process.env.AZURE_CUSTOM_HOSTNAME || 'www.paddletoday.com';

const checks = [];
const failures = [];

function az(args, label) {
  try {
    const cliArgs = [...args, '--output', 'json'];
    const executable = process.platform === 'win32' ? (process.env.ComSpec || 'cmd.exe') : 'az';
    const executableArgs = process.platform === 'win32'
      ? ['/d', '/s', '/c', 'az.cmd', ...cliArgs]
      : cliArgs;
    return JSON.parse(execFileSync(executable, executableArgs, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
      shell: false,
    }));
  } catch (error) {
    const detail = error?.stderr?.toString().trim() || error?.message || 'Azure CLI command failed';
    failures.push({ id: label, status: 'blocked', detail: detail.replace(/\s+/g, ' ').slice(0, 240) });
    return null;
  }
}

function record(id, passed, observed, expected) {
  const check = { id, status: passed ? 'pass' : 'fail', observed, expected };
  checks.push(check);
  if (!passed) failures.push(check);
}

function hasUnrestrictedAllow(rules = []) {
  return rules.some((rule) => {
    const address = String(rule.ipAddress ?? rule.ip_address ?? '').toLowerCase();
    return String(rule.action ?? '').toLowerCase() === 'allow'
      && ['any', '0.0.0.0/0', '::/0'].includes(address);
  });
}

const restrictions = az(
  ['webapp', 'config', 'access-restriction', 'show', '--resource-group', resourceGroup, '--name', apiApp],
  'app-service-access-restrictions',
);
const linkedBackends = az(
  ['staticwebapp', 'backends', 'show', '--resource-group', resourceGroup, '--name', staticWebApp],
  'static-web-app-backend',
);
const hasLinkedBackend = Array.isArray(linkedBackends) && linkedBackends.length > 0;
if (restrictions) {
  const mainRules = restrictions.ipSecurityRestrictions ?? restrictions.ip_security_restrictions ?? [];
  const scmRules = restrictions.scmIpSecurityRestrictions ?? restrictions.scm_ip_security_restrictions ?? [];
  const mainDefault = restrictions.ipSecurityRestrictionsDefaultAction ?? restrictions.ip_security_restrictions_default_action ?? null;
  const scmDefault = restrictions.scmIpSecurityRestrictionsDefaultAction ?? restrictions.scm_ip_security_restrictions_default_action ?? null;
  if (hasLinkedBackend) {
    checks.push({
      id: 'app-service-origin',
      status: 'accepted-constraint',
      observed: {
        linkedBackend: linkedBackends[0]?.backendResourceId ?? null,
        defaultAction: mainDefault,
        unrestrictedAllow: hasUnrestrictedAllow(mainRules),
        ruleCount: mainRules.length,
      },
      expected: 'Static Web Apps linked App Service backends remain publicly reachable; use application authentication or a different architecture for full origin isolation.',
    });
  } else {
    record('app-service-origin', !hasUnrestrictedAllow(mainRules) && String(mainDefault ?? '').toLowerCase() !== 'allow', {
      defaultAction: mainDefault,
      unrestrictedAllow: hasUnrestrictedAllow(mainRules),
      ruleCount: mainRules.length,
    }, 'No unrestricted Allow rule and a deny-by-default posture after the intended ingress is confirmed.');
  }
  record('scm-origin', !hasUnrestrictedAllow(scmRules) && String(scmDefault ?? '').toLowerCase() !== 'allow', {
    defaultAction: scmDefault,
    unrestrictedAllow: hasUnrestrictedAllow(scmRules),
    ruleCount: scmRules.length,
  }, 'SCM is restricted independently or follows a deliberate deny-by-default policy.');
}

const app = az(['webapp', 'show', '--resource-group', resourceGroup, '--name', apiApp], 'app-service-settings');
if (app) {
  record('app-service-https', app.httpsOnly === true, app.httpsOnly, true);
  checks.push({
    id: 'app-service-public-network',
    status: 'info',
    observed: app.publicNetworkAccess ?? null,
    expected: 'Restrictions or private ingress verified; Enabled is informational until ingress is confirmed.',
  });
}

const storage = az(['storage', 'account', 'show', '--resource-group', resourceGroup, '--name', storageAccount], 'storage-settings');
if (storage) {
  record('storage-https', storage.enableHttpsTrafficOnly === true, storage.enableHttpsTrafficOnly, true);
  record('storage-tls', ['TLS1_2', 'TLS1_3'].includes(storage.minimumTlsVersion), storage.minimumTlsVersion, 'TLS1_2 or newer');
  record('storage-shared-key', storage.allowSharedKeyAccess === false, storage.allowSharedKeyAccess, false);
  record('storage-public-network', String(storage.publicNetworkAccess ?? '').toLowerCase() === 'disabled', storage.publicNetworkAccess ?? null, 'Disabled');
}

const hostname = az(
  ['staticwebapp', 'hostname', 'show', '--resource-group', resourceGroup, '--name', staticWebApp, '--hostname', customHostname],
  'custom-hostname',
);
if (hostname) {
  record('custom-hostname', hostname.status === 'Ready', hostname.status ?? null, 'Ready');
}

const result = {
  passed: failures.length === 0,
  scope: { resourceGroup, apiApp, storageAccount, staticWebApp, customHostname },
  checks: [...checks, ...failures.filter((failure) => failure.status === 'blocked')],
  nextStep: failures.length === 0
    ? 'Retain this redacted output with the release record.'
    : 'Resolve the failed checks through the Azure platform change process, then rerun this command.',
};

console.log(JSON.stringify(result, null, 2));
process.exitCode = result.passed ? 0 : 1;
