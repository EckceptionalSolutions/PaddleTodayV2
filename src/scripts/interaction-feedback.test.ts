import { afterEach, describe, expect, it, vi } from 'vitest';
import { flashInteraction, focusLocationControls } from './interaction-feedback.js';

function surface() {
  const classes = new Set();
  return { offsetWidth: 100, classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name) }, classes };
}

describe('interaction feedback', () => {
  afterEach(() => vi.useRealTimers());
  it('extends repeated feedback without an older timeout clearing the new highlight', () => {
    vi.useFakeTimers();
    const element = surface();
    flashInteraction(element);
    vi.advanceTimersByTime(1000);
    flashInteraction(element);
    vi.advanceTimersByTime(400);
    expect(element.classes.has('interaction-highlight')).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(element.classes.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });
  it.each([false, true])('focuses immediately and respects reduced motion (%s) for the location jump', reduced => {
    vi.useFakeTimers();
    const form = { ...surface(), scrollIntoView: vi.fn() };
    const input = { focus: vi.fn() };
    focusLocationControls(form, input, { matchMedia: () => ({ matches: reduced }) });
    expect(input.focus).toHaveBeenCalledExactlyOnceWith({ preventScroll: true });
    expect(form.scrollIntoView).toHaveBeenCalledWith({ block: 'center', behavior: reduced ? 'instant' : 'smooth' });
    vi.runAllTimers();
    expect(input.focus).toHaveBeenCalledTimes(1);
    expect(form.classes.size).toBe(0);
  });
});
