import type { RiverAlertThreshold, RiverThresholdAlert } from './alerts';
import { riverAlertManageUrl } from './alert-links';
import type { RiverDetailSnapshot } from './river-snapshots';

export interface AlertEmailPayload {
  alert: RiverThresholdAlert;
  snapshot: RiverDetailSnapshot;
}

export async function sendRiverAlertEmail(args: AlertEmailPayload): Promise<{
  provider: 'log' | 'sendgrid';
  id: string;
  subject: string;
}> {
  const subject = subjectForAlert(args.alert, args.snapshot);
  const text = textBody(args.alert, args.snapshot);
  const html = htmlBody(args.alert, args.snapshot);
  const provider = configuredProvider();

  if (provider === 'log') {
    console.log('[alerts] email log delivery', {
      to: args.alert.email,
      subject,
      text,
    });
    return {
      provider: 'log',
      id: `log_${Date.now()}`,
      subject,
    };
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.ALERTS_FROM_EMAIL;
  if (!apiKey || !from) {
    throw new Error('Missing SENDGRID_API_KEY or ALERTS_FROM_EMAIL for river alerts email delivery.');
  }

  const payload = {
    from: {
      email: from,
    },
    personalizations: [
      {
        to: [{ email: args.alert.email }],
      },
    ],
    subject,
    ...(process.env.ALERTS_REPLY_TO_EMAIL
      ? {
          reply_to: {
            email: process.env.ALERTS_REPLY_TO_EMAIL,
          },
        }
      : {}),
    content: [
      {
        type: 'text/plain',
        value: text,
      },
      {
        type: 'text/html',
        value: html,
      },
    ],
  };

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`SendGrid email delivery failed: HTTP ${response.status} ${body}`.trim());
  }

  const messageId = response.headers.get('x-message-id') || response.headers.get('X-Message-Id');
  return {
    provider: 'sendgrid',
    id: messageId || `sendgrid_${Date.now()}`,
    subject,
  };
}

function configuredProvider(): 'log' | 'sendgrid' {
  const explicit = String(process.env.ALERTS_EMAIL_PROVIDER || '')
    .trim()
    .toLowerCase();
  if (explicit === 'sendgrid') {
    return 'sendgrid';
  }
  if (explicit === 'log') {
    return 'log';
  }
  return process.env.SENDGRID_API_KEY ? 'sendgrid' : 'log';
}

function subjectForAlert(alert: RiverThresholdAlert, snapshot: RiverDetailSnapshot) {
  const riverName = snapshot.result.river.name;
  return alert.threshold === 'strong'
    ? `${riverName} looks especially strong today`
    : `${riverName} is good to paddle today`;
}

function textBody(alert: RiverThresholdAlert, snapshot: RiverDetailSnapshot) {
  const detailUrl = riverUrl(snapshot.result.river.slug);
  const manageUrl = riverAlertManageUrl(alert);
  const reachLine = snapshot.result.river.reach ? ` - ${snapshot.result.river.reach}` : '';
  const lines = [
    `${snapshot.result.river.name}${reachLine}`,
    '',
    `Current call: ${snapshot.result.rating} (${snapshot.result.score})`,
    `Summary: ${snapshot.result.explanation}`,
    `Support level: ${supportLevelLabel(snapshot.result.confidence.label)}`,
  ];

  if (bestWindowText(snapshot)) {
    lines.push(bestWindowText(snapshot) as string);
  }

  lines.push('');
  lines.push(`View river: ${detailUrl}`);
  lines.push(`Turn off this alert: ${manageUrl}`);
  lines.push('');
  lines.push(`You asked for an alert when this route reached ${thresholdLabel(alert.threshold)}.`);

  return lines.join('\n');
}

function htmlBody(alert: RiverThresholdAlert, snapshot: RiverDetailSnapshot) {
  const detailUrl = riverUrl(snapshot.result.river.slug);
  const manageUrl = riverAlertManageUrl(alert);
  const bestWindow = bestWindowText(snapshot);
  return `
    <div style="font-family: Arial, sans-serif; color: #10232d; line-height: 1.5;">
      <h2 style="margin: 0 0 8px;">${escapeHtml(snapshot.result.river.name)}</h2>
      <p style="margin: 0 0 12px; color: #5c7380;">${escapeHtml(snapshot.result.river.reach)}</p>
      <p style="margin: 0 0 12px;"><strong>Current call:</strong> ${escapeHtml(snapshot.result.rating)} (${snapshot.result.score})</p>
      <p style="margin: 0 0 12px;">${escapeHtml(snapshot.result.explanation)}</p>
      <p style="margin: 0 0 12px;"><strong>Support level:</strong> ${escapeHtml(
        supportLevelLabel(snapshot.result.confidence.label)
      )}</p>
      ${bestWindow ? `<p style="margin: 0 0 12px;"><strong>${escapeHtml(bestWindow)}</strong></p>` : ''}
      <p style="margin: 16px 0 0;">
        <a href="${detailUrl}" style="color: #104a68; font-weight: 700;">View river details</a>
      </p>
      <p style="margin: 12px 0 0; color: #5c7380; font-size: 14px;">
        You asked for an alert when this route reached ${escapeHtml(thresholdLabel(alert.threshold))}.
      </p>
      <p style="margin: 12px 0 0; color: #5c7380; font-size: 14px;">
        <a href="${manageUrl}" style="color: #5c7380;">Turn off this alert</a>
      </p>
    </div>
  `.trim();
}

function supportLevelLabel(label: string) {
  if (label === 'High') return 'Well-supported';
  if (label === 'Medium') return 'Some uncertainty';
  if (label === 'Low') return 'Cautious call';
  return label;
}

function thresholdLabel(threshold: RiverAlertThreshold) {
  return threshold === 'strong' ? 'Strong' : 'Good';
}

function riverUrl(slug: string) {
  const siteUrl = process.env.SITE_URL || 'https://paddletoday.com';
  return new URL(`/rivers/${slug}/`, siteUrl).toString();
}

function bestWindowText(snapshot: RiverDetailSnapshot) {
  const label = snapshot.result.weather?.rainTimingLabel;
  if (!label || label === 'None') {
    return null;
  }

  return `Rain timing: ${label}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
