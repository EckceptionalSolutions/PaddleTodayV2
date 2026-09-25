import { describe, expect, it } from 'vitest';
import { emailLinkDomainOption } from './email-link-domain';

describe('emailLinkDomainOption', () => {
  it('lets Firebase choose a default Hosting domain', () => {
    expect(emailLinkDomainOption('paddletoday-9933a.firebaseapp.com')).toEqual({});
    expect(emailLinkDomainOption('paddletoday-9933a.web.app')).toEqual({});
  });

  it('passes an explicitly configured custom Hosting domain', () => {
    expect(emailLinkDomainOption(' auth.paddletoday.com ')).toEqual({ linkDomain: 'auth.paddletoday.com' });
  });
});
