import { Platform } from 'react-native';
import type { KeyboardEvent } from 'react';

// React Native Web handles Enter for Pressable, but Space only for button roles.
// Checkbox, radio, and switch controls need Space activation without page scroll.
export function selectionKeyboardProps(onActivate: () => void, disabled = false) {
  if (Platform.OS !== 'web') return {};
  return {
    onKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (event.key !== ' ' && event.key !== 'Spacebar') return;
      event.preventDefault();
      if (!disabled && !event.repeat) onActivate();
    },
  };
}

export function radioKeyboardProps(index: number, selected: boolean, count: number, onSelect: (index: number) => void) {
  if (Platform.OS !== 'web') return {};
  const activation = selectionKeyboardProps(() => onSelect(index));
  return {
    tabIndex: selected ? 0 as const : -1 as const,
    onKeyDown(event: KeyboardEvent<HTMLElement>) {
      const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
      if (!direction) {
        activation.onKeyDown?.(event);
        return;
      }
      event.preventDefault();
      const nextIndex = (index + direction + count) % count;
      onSelect(nextIndex);
      event.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="radio"]')[nextIndex]?.focus();
    },
  };
}

export function tabKeyboardProps(index: number, selected: boolean, count: number, onSelect: (index: number) => void) {
  if (Platform.OS !== 'web') return {};
  const activation = selectionKeyboardProps(() => onSelect(index));
  return {
    tabIndex: selected ? 0 as const : -1 as const,
    onKeyDown(event: KeyboardEvent<HTMLElement>) {
      const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1
        : event.key === 'ArrowRight' ? (index + 1) % count
        : event.key === 'ArrowLeft' ? (index + count - 1) % count : null;
      if (nextIndex === null) {
        activation.onKeyDown?.(event);
        return;
      }
      event.preventDefault();
      const group = event.currentTarget.parentElement;
      const label = group?.getAttribute('aria-label');
      onSelect(nextIndex);
      group?.querySelectorAll<HTMLElement>('[role="tab"]')[nextIndex]?.focus();
      // Some view switches replace the entire tab group. Restore focus to its
      // selected replacement only if focus was lost with the old layout.
      requestAnimationFrame(() => {
        if (group?.isConnected || !label || document.activeElement !== document.body) return;
        const replacement = Array.from(document.querySelectorAll<HTMLElement>('[role="tablist"]'))
          .find((element) => element.getAttribute('aria-label') === label);
        replacement?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')?.focus();
      });
    },
  };
}
