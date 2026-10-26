import { describe, expect, it } from 'vitest';
import { incomingEmailLink } from './incoming-email-link';
import { incomingRouteLink } from './incoming-route-link';

const action = 'https://paddletoday-9933a.firebaseapp.com/__/auth/action?apiKey=test-key&mode=signIn&oobCode=one-time-test-code&continueUrl=https%3A%2F%2Fpaddletoday.com%2Fauth%2Fcallback';
const hosting = 'https://paddletoday-9933a.firebaseapp.com/__/auth/links?link=' + encodeURIComponent(action);

describe('Firebase email link entry', () => {
  it.each([action, hosting])('opens the callback with the complete action for cold and warm entry: %s', link => {
    expect(incomingEmailLink(link)).toBe(action);
    const route = new URL(incomingRouteLink(link), 'https://paddletoday.com');
    expect(route.pathname).toBe('/auth/callback');
    expect(route.searchParams.get('emailLink')).toBe(action);
  });
  it('accepts the project web.app Hosting domain', () => {
    expect(incomingEmailLink(action.replace('firebaseapp.com', 'web.app'))).toContain('.web.app/__/auth/action?');
  });
  it.each([
    hosting.replace('firebaseapp.com/__/auth/links', 'firebaseapp.com.evil.test/__/auth/links'),
    action.replace('https:', 'http:'),
    action.replace('mode=signIn', 'mode=resetPassword'),
    action.replace('oobCode=one-time-test-code', 'oobCode='),
    action.replace('apiKey=test-key', 'apiKey='),
    'https://paddletoday-9933a.firebaseapp.com/__/auth/links?link=' + encodeURIComponent(action.replace('paddletoday-9933a.firebaseapp.com', 'evil.test')),
    'https://paddletoday-9933a.firebaseapp.com/__/auth/links?link=%invalid',
    '/__/auth/action?mode=signIn&oobCode=test&apiKey=test',
    'paddletoday://auth/callback',
  ])('does not route untrusted, malformed or other email actions as sign-in: %s', link => {
    expect(incomingEmailLink(link)).toBeNull();
    expect(incomingRouteLink(link)).toBe(link);
  });
});
