import { describe, expect, it } from 'vitest';
import {
  semanticColorForRating,
  semanticColors,
  semanticRadii,
  semanticSpacing,
} from './index.js';

describe('@paddletoday/design-tokens', () => {
  it('maps rating and status roles to authoritative semantic colors', () => {
    expect(semanticColorForRating('Strong')).toBe(semanticColors.rating.strong);
    expect(semanticColorForRating('Good')).toBe(semanticColors.rating.good);
    expect(semanticColorForRating('Fair')).toBe(semanticColors.rating.fair);
    expect(semanticColorForRating('No-go')).toBe(semanticColors.rating.noGo);
    expect(semanticColors.status.live).toBe(semanticColors.rating.strong);
    expect(semanticColors.status.degraded).toBe(semanticColors.rating.fair);
    expect(semanticColors.status.offline).toBe(semanticColors.rating.noGo);
  });

  it('shares semantic radius roles while preserving platform values', () => {
    expect(semanticRadii.web).toEqual({
      control: 12,
      card: 18,
      panel: 28,
      pill: 999,
    });
    expect(semanticRadii.native).toEqual({
      control: 8,
      card: 12,
      panel: 16,
      pill: 999,
    });
  });

  it('shares spacing role names while preserving platform scales', () => {
    expect(semanticSpacing.web).toEqual({
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
    });
    expect(semanticSpacing.native).toEqual({
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 22,
    });
  });
});
