import { describe, expect, it, vi } from 'vitest';
import { escapeEmailHtml, isAzureEmailProvider, sendAzureEmail } from './email-transport';

describe('email transport', () => {
  it('escapes message content in one shared implementation', () => {
    expect(escapeEmailHtml(`<a title="'">A&B</a>`)).toBe(
      '&lt;a title=&quot;&#39;&quot;&gt;A&amp;B&lt;/a&gt;'
    );
  });

  it('recognizes supported Azure provider aliases', () => {
    expect(isAzureEmailProvider('ACS')).toBe(true);
    expect(isAzureEmailProvider('azure-communication-services')).toBe(true);
    expect(isAzureEmailProvider('log')).toBe(false);
  });

  it('sends and polls through one normalized Azure flow', async () => {
    const beginSend = vi.fn(async () => ({
      pollUntilDone: async () => ({ id: 'delivery-1', status: 'Succeeded' }),
    }));
    const result = await sendAzureEmail(
      {
        connectionString: 'unused',
        senderAddress: 'from@example.com',
        to: ['to@example.com'],
        replyTo: ['reply@example.com'],
        subject: 'Subject',
        plainText: 'Text',
        html: '<p>Text</p>',
        operationId: 'operation-1',
      },
      { beginSend },
    );

    expect(result.id).toBe('delivery-1');
    expect(beginSend).toHaveBeenCalledWith(
      expect.objectContaining({ senderAddress: 'from@example.com' }),
      { operationId: 'operation-1', updateIntervalInMs: 1000 },
    );
  });
});
