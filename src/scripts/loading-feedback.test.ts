import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLoadingFeedback } from './loading-feedback.js';

function harness() {
  const message = { textContent: '' };
  const element = { hidden: true, dataset: { loadingLabel: 'Finding routes…', loadingWaiting: 'Still fetching conditions.' }, querySelector: () => message };
  const attributes = new Map();
  const root = { querySelector: () => element, body: {
    setAttribute: (name, value) => attributes.set(name, value), removeAttribute: name => attributes.delete(name),
  } };
  return { element, message, attributes, feedback: createLoadingFeedback('board', { root }) };
}

describe('loading feedback lifecycle', () => {
  afterEach(() => vi.useRealTimers());
  it('explains a long initial wait and clears all feedback on completion', () => {
    vi.useFakeTimers();
    const { feedback, element, message, attributes } = harness();
    const finish = feedback.start();
    expect(attributes.get('data-loading-board')).toBe('initial');
    expect(element.hidden).toBe(false);
    vi.advanceTimersByTime(6000);
    expect(message.textContent).toBe('Still fetching conditions.');
    finish();
    expect(element.hidden).toBe(true);
    expect(attributes.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });
  it('never restores a long-wait prompt after a fast request finishes', () => {
    vi.useFakeTimers();
    const { feedback, element } = harness();
    feedback.start()();
    vi.advanceTimersByTime(10000);
    expect(element.hidden).toBe(true);
  });
  it('keeps silent refreshes quiet and never marks existing results as initial placeholders', () => {
    vi.useFakeTimers();
    const { feedback, element, message, attributes } = harness();
    const finish = feedback.start({ refreshing: true, silent: true });
    expect(element.hidden).toBe(true);
    expect(attributes.get('data-loading-board')).toBe('refresh');
    vi.advanceTimersByTime(6000);
    expect(element.hidden).toBe(false);
    expect(message.textContent).toContain('keep using the current results');
    finish();
  });
  it('does not let an older aborted operation dismiss the next request', () => {
    vi.useFakeTimers();
    const { feedback, element, attributes } = harness();
    const finishOld = feedback.start();
    const finishNew = feedback.start();
    finishOld();
    expect(element.hidden).toBe(false);
    expect(attributes.get('data-loading-board')).toBe('initial');
    finishNew();
    expect(element.hidden).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });
});
