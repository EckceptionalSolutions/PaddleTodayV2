import type { AppFeedbackCategory } from '@paddletoday/api-contract';
import { escapeEmailHtml as escapeHtml, isAzureEmailProvider, sendAzureEmail } from './email-transport';

export interface FeedbackEmailPayload {
  submittedAt: string;
  category: AppFeedbackCategory;
  message: string;
  replyEmail: string;
  sourceScreen: string;
  appVersion: string;
  platform: string;
}

export async function sendFeedbackNotificationEmail(feedback: FeedbackEmailPayload): Promise<{
  provider: 'azure' | 'log' | 'disabled';
  id: string;
}> {
  const provider = configuredProvider();
  if (provider === 'disabled') {
    return { provider, id: '' };
  }

  const to = (process.env.FEEDBACK_TO_EMAIL || 'hello@paddletoday.com').trim();
  const from = (
    process.env.FEEDBACK_FROM_EMAIL ||
    process.env.ROUTE_REPLIES_FROM_EMAIL ||
    process.env.ALERTS_FROM_EMAIL ||
    ''
  ).trim();
  const subject = `PaddleToday feedback: ${categoryLabel(feedback.category)}`;
  const text = feedbackText(feedback);

  if (provider === 'log') {
    console.log('[feedback] email log delivery', {
      to,
      subject,
      category: feedback.category,
      sourceScreen: feedback.sourceScreen,
    });
    return {
      provider,
      id: `log_${Date.now()}`,
    };
  }

  const connectionString = process.env.ACS_EMAIL_CONNECTION_STRING;
  if (!connectionString || !from || !to) {
    throw new Error('Missing ACS email configuration for feedback notifications.');
  }

  const delivery = await sendAzureEmail({
    connectionString,
    senderAddress: from,
    to: [to],
    replyTo: feedback.replyEmail ? [feedback.replyEmail] : undefined,
    subject,
    plainText: text,
    html: feedbackHtml(feedback),
  });

  return {
    provider,
    id: delivery.id,
  };
}

function configuredProvider(): 'azure' | 'log' | 'disabled' {
  const explicit = String(process.env.FEEDBACK_EMAIL_PROVIDER || '')
    .trim()
    .toLowerCase();
  if (explicit === 'disabled' || explicit === 'none' || explicit === 'off') {
    return 'disabled';
  }
  if (isAzureEmailProvider(explicit)) {
    return 'azure';
  }
  if (explicit === 'log') {
    return 'log';
  }

  const hasFrom = Boolean(
    process.env.FEEDBACK_FROM_EMAIL ||
      process.env.ROUTE_REPLIES_FROM_EMAIL ||
      process.env.ALERTS_FROM_EMAIL
  );
  return process.env.ACS_EMAIL_CONNECTION_STRING && hasFrom ? 'azure' : 'disabled';
}

function feedbackText(feedback: FeedbackEmailPayload) {
  return [
    `Category: ${categoryLabel(feedback.category)}`,
    `Submitted: ${feedback.submittedAt}`,
    feedback.replyEmail ? `Reply email: ${feedback.replyEmail}` : 'Reply email: Not provided',
    feedback.sourceScreen ? `Source screen: ${feedback.sourceScreen}` : '',
    feedback.platform ? `Platform: ${feedback.platform}` : '',
    feedback.appVersion ? `App version: ${feedback.appVersion}` : '',
    '',
    feedback.message,
  ]
    .filter((line) => line !== '')
    .join('\n');
}

function feedbackHtml(feedback: FeedbackEmailPayload) {
  const details = [
    ['Category', categoryLabel(feedback.category)],
    ['Submitted', feedback.submittedAt],
    ['Reply email', feedback.replyEmail || 'Not provided'],
    ['Source screen', feedback.sourceScreen],
    ['Platform', feedback.platform],
    ['App version', feedback.appVersion],
  ].filter(([, value]) => Boolean(value));

  return `
    <div style="font-family: Arial, sans-serif; color: #10232d; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">New PaddleToday feedback</h2>
      ${details
        .map(
          ([label, value]) =>
            `<p style="margin: 0 0 4px; color: #5c7380;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
        )
        .join('')}
      <hr style="border: 0; border-top: 1px solid #d8e5ea; margin: 18px 0;">
      <p style="white-space: pre-wrap;">${escapeHtml(feedback.message)}</p>
    </div>
  `.trim();
}

function categoryLabel(category: AppFeedbackCategory) {
  const labels: Record<AppFeedbackCategory, string> = {
    route_coverage: 'Route coverage',
    river_calls: 'River calls',
    maps: 'Maps',
    alerts: 'Alerts',
    usability: 'Usability',
    other: 'Other',
  };
  return labels[category];
}
