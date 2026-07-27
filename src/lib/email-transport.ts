import { EmailClient } from '@azure/communication-email';

export interface SendAzureEmailArgs {
  connectionString: string;
  senderAddress: string;
  to: string[];
  subject: string;
  plainText: string;
  html: string;
  replyTo?: string[];
  operationId?: string;
}

interface EmailPoller {
  pollUntilDone(): Promise<{
    id?: string;
    status?: string;
    error?: { message?: string };
  }>;
}

interface EmailClientLike {
  beginSend(payload: unknown, options: Record<string, unknown>): Promise<EmailPoller>;
}

const clients = new Map<string, EmailClient>();

function emailClient(connectionString: string): EmailClient {
  const existing = clients.get(connectionString);
  if (existing) return existing;
  const client = new EmailClient(connectionString);
  clients.set(connectionString, client);
  return client;
}

export async function sendAzureEmail(
  args: SendAzureEmailArgs,
  client: EmailClientLike = emailClient(args.connectionString),
) {
  const poller = await client.beginSend(
    {
      senderAddress: args.senderAddress,
      content: {
        subject: args.subject,
        plainText: args.plainText,
        html: args.html,
      },
      recipients: {
        to: args.to.map((address) => ({ address })),
      },
      ...(args.replyTo?.length
        ? { replyTo: args.replyTo.map((address) => ({ address })) }
        : {}),
    },
    {
      updateIntervalInMs: 1000,
      ...(args.operationId ? { operationId: args.operationId } : {}),
    },
  );
  const response = await poller.pollUntilDone();

  if (!response.id || (response.status && response.status !== 'Succeeded')) {
    throw new Error(
      `Azure Communication Services email delivery failed: ${
        response.error?.message || response.status || 'missing operation id'
      }.`,
    );
  }

  return { id: response.id, status: response.status ?? 'Succeeded' };
}

export function escapeEmailHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function isAzureEmailProvider(value: unknown) {
  const provider = String(value ?? '').trim().toLowerCase();
  return provider === 'azure' || provider === 'acs' || provider === 'azure-communication-services';
}
