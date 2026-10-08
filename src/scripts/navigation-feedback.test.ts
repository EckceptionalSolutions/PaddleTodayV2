import { afterEach, describe, expect, it, vi } from 'vitest';
import { initNavigationFeedback, isPageNavigation } from './navigation-feedback.js';

function harness({ native = true } = {}) {
  const listeners = new Map();
  const navigationListeners = new Map();
  const documentListeners = new Map();
  const message = { textContent: '' };
  const attributes = new Map();
  const feedback = { hidden: true, querySelector: () => message,
    setAttribute: (name, value) => attributes.set(name, value), removeAttribute: name => attributes.delete(name) };
  const win = { location: { href: 'https://paddletoday.com/' }, setTimeout, clearTimeout,
    addEventListener: (name, callback) => listeners.set(name, callback),
    navigation: native ? { addEventListener: (name, callback) => navigationListeners.set(name, callback) } : undefined };
  initNavigationFeedback({ doc: { querySelector: () => feedback, addEventListener: (name, callback) => documentListeners.set(name, callback) }, win });
  const navigate = (url = 'https://paddletoday.com/weekend/', extra = {}) => navigationListeners.get('navigate')({ destination: { url }, downloadRequest: null, ...extra });
  return { feedback, message, attributes, listeners, navigationListeners, documentListeners, navigate };
}

describe('navigation feedback', () => {
  afterEach(() => vi.useRealTimers());
  it.each(['#best-options', '/#home-location', 'https://example.com/', 'mailto:test@example.com', 'javascript:void(0)'])('ignores non-page destination %s', destination => {
    expect(isPageNavigation(destination, 'https://paddletoday.com/')).toBe(false);
  });
  it('recognizes other pages and changed query parameters', () => {
    expect(isPageNavigation('/weekend/', 'https://paddletoday.com/')).toBe(true);
    expect(isPageNavigation('/?q=river', 'https://paddletoday.com/')).toBe(true);
  });
  it('skips flashing for fast navigation and resets when restoring the old page', () => {
    vi.useFakeTimers();
    const { navigate, feedback, listeners } = harness();
    navigate();
    vi.advanceTimersByTime(299);
    expect(feedback.hidden).toBe(true);
    listeners.get('pagehide')();
    vi.advanceTimersByTime(7000);
    listeners.get('pageshow')();
    expect(feedback.hidden).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });
  it('shows slow navigation feedback, a long-wait explanation, and clears on failure', () => {
    vi.useFakeTimers();
    const { navigate, feedback, message, attributes, navigationListeners } = harness();
    navigate();
    vi.advanceTimersByTime(300);
    expect(feedback.hidden).toBe(false);
    expect(message.textContent).toBe('Opening page…');
    vi.advanceTimersByTime(5700);
    expect(attributes.has('data-long-wait')).toBe(true);
    expect(message.textContent).toContain('Still opening');
    navigationListeners.get('navigateerror')();
    expect(feedback.hidden).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });
  it('ignores downloads and canceled navigations', () => {
    vi.useFakeTimers();
    const { navigate, feedback } = harness();
    navigate(undefined, { downloadRequest: '' });
    navigate(undefined, { defaultPrevented: true });
    vi.advanceTimersByTime(1000);
    expect(feedback.hidden).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });
  it('does not leave feedback running indefinitely after a stalled navigation', () => {
    vi.useFakeTimers();
    const { navigate, feedback } = harness();
    navigate();
    vi.advanceTimersByTime(30000);
    expect(feedback.hidden).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });
  it('supports ordinary clicks without intercepting navigation in browsers without the Navigation API', async () => {
    vi.useFakeTimers();
    const { feedback, documentListeners } = harness({ native: false });
    const link = { href: 'https://paddletoday.com/weekend/', target: '', hasAttribute: () => false };
    documentListeners.get('click')({ button: 0, target: { closest: () => link } });
    await Promise.resolve();
    vi.advanceTimersByTime(300);
    expect(feedback.hidden).toBe(false);
  });
  it('ignores modified clicks, new tabs, downloads, and clicks canceled by other handlers', async () => {
    vi.useFakeTimers();
    const { feedback, documentListeners } = harness({ native: false });
    const click = documentListeners.get('click');
    const link = { href: 'https://paddletoday.com/weekend/', target: '', hasAttribute: () => false };
    click({ button: 0, ctrlKey: true, target: { closest: () => link } });
    click({ button: 0, target: { closest: () => ({ ...link, target: '_blank' }) } });
    click({ button: 0, target: { closest: () => ({ ...link, hasAttribute: () => true }) } });
    const event = { button: 0, target: { closest: () => link }, defaultPrevented: false };
    click(event);
    event.defaultPrevented = true;
    await Promise.resolve();
    vi.advanceTimersByTime(1000);
    expect(feedback.hidden).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });
});
