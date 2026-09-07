import { beforeEach, expect, it, vi } from 'vitest';
const native = vi.hoisted(() => ({ available: vi.fn(), review: vi.fn() }));
vi.mock('expo-constants', () => ({ default: { expoConfig: { version: 'qa' } } }));
vi.mock('expo-store-review', () => ({ isAvailableAsync: native.available, requestReview: native.review }));
vi.mock('react-native', () => ({ Platform: { OS: 'ios' }, Linking: {} }));
import { requestAutomaticStoreReview } from './store-review';

beforeEach(() => { vi.resetAllMocks(); });

it('does not open native review when its availability check finishes after cancellation', async () => {
  let finish!: (available: boolean) => void;
  native.available.mockReturnValue(new Promise<boolean>((resolve) => { finish = resolve; }));
  let current = true;
  const running = requestAutomaticStoreReview(() => current);
  current = false;
  finish(true);
  await expect(running).resolves.toBe(false);
  expect(native.review).not.toHaveBeenCalled();
});

it('opens an available review while the opportunity is current', async () => {
  native.available.mockResolvedValue(true);
  await expect(requestAutomaticStoreReview(() => true)).resolves.toBe(true);
  expect(native.review).toHaveBeenCalledOnce();
});

it('does not request a review when the native API is unavailable', async () => {
  native.available.mockResolvedValue(false);
  await expect(requestAutomaticStoreReview()).resolves.toBe(false);
  expect(native.review).not.toHaveBeenCalled();
});
