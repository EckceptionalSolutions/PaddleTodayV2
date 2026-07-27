import { escapeEmailHtml as escapeHtml, isAzureEmailProvider, sendAzureEmail } from './email-transport';
import type { RouteRequestRecord } from './route-requests';

export interface RouteRequestReplyEmailArgs {
  routeRequest: RouteRequestRecord;
  subject: string;
  message: string;
}

export async function sendRouteRequestReplyEmail(args: RouteRequestReplyEmailArgs): Promise<{
  provider: 'azure' | 'log';
  id: string;
  from: string;
  replyTo: string;
}> {
  const provider = configuredProvider();
  const from = (process.env.ROUTE_REPLIES_FROM_EMAIL || '').trim();
  const replyTo = (process.env.ROUTE_REPLIES_REPLY_TO_EMAIL || process.env.ALERTS_REPLY_TO_EMAIL || '').trim();
  const to = args.routeRequest.replyEmail.trim().toLowerCase();
  const text = textBody(args.routeRequest, args.message);
  const html = htmlBody(args.routeRequest, args.message);

  if (provider === 'log') {
    console.log('[route-requests] reply email log delivery', {
      from: from || 'route-replies@example.invalid',
      replyTo,
      to,
      subject: args.subject,
      text,
    });
    return {
      provider: 'log',
      id: `log_${Date.now()}`,
      from: from || 'route-replies@example.invalid',
      replyTo,
    };
  }

  const connectionString = process.env.ACS_EMAIL_CONNECTION_STRING;
  if (!connectionString || !from) {
    throw new Error('Missing ACS_EMAIL_CONNECTION_STRING or ROUTE_REPLIES_FROM_EMAIL for route request replies.');
  }

  const delivery = await sendAzureEmail({
    connectionString,
    senderAddress: from,
    to: [to],
    replyTo: replyTo ? [replyTo] : undefined,
    subject: args.subject,
    plainText: text,
    html,
  });

  return {
    provider: 'azure',
    id: delivery.id,
    from,
    replyTo,
  };
}

function configuredProvider(): 'azure' | 'log' {
  const explicit = String(process.env.ROUTE_REPLIES_EMAIL_PROVIDER || '')
    .trim()
    .toLowerCase();
  if (isAzureEmailProvider(explicit)) {
    return 'azure';
  }
  if (explicit === 'log') {
    return 'log';
  }
  return process.env.ACS_EMAIL_CONNECTION_STRING ? 'azure' : 'log';
}

function textBody(routeRequest: RouteRequestRecord, message: string) {
  return [
    message.trim(),
    '',
    '---',
    'Original route request',
    `Route: ${routeRequest.routeName}`,
    `State: ${routeRequest.state}`,
    routeRequest.putIn ? `Put-in: ${routeRequest.putIn}` : '',
    routeRequest.takeOut ? `Take-out: ${routeRequest.takeOut}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

function htmlBody(routeRequest: RouteRequestRecord, message: string) {
  const originalLines = [
    ['Route', routeRequest.routeName],
    ['State', routeRequest.state],
    ['Put-in', routeRequest.putIn],
    ['Take-out', routeRequest.takeOut],
  ].filter(([, value]) => Boolean(value));

  return `
    <div style="font-family: Arial, sans-serif; color: #10232d; line-height: 1.5;">
      ${message
        .trim()
        .split(/\n{2,}/)
        .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
        .join('')}
      <hr style="border: 0; border-top: 1px solid #d8e5ea; margin: 18px 0;">
      <p style="color: #5c7380; font-size: 14px; margin: 0 0 8px;"><strong>Original route request</strong></p>
      ${originalLines
        .map(
          ([label, value]) =>
            `<p style="margin: 0 0 4px; color: #5c7380; font-size: 14px;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
        )
        .join('')}
    </div>
  `.trim();
}
