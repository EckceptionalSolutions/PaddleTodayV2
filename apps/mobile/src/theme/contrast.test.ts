import { describe, expect, it, vi } from 'vitest';
vi.mock('react-native', () => ({ Platform: { select: () => ({}) } }));
import { darkColors, lightColors } from './tokens';

function luminance(hex: string) {
  const values = hex.slice(1).match(/../g)!.map(channel => {
    const value = parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}

describe('theme readability', () => {
  for (const [name, colors] of Object.entries({ light: lightColors, dark: darkColors })) {
    it(`${name} text and controls meet normal text contrast`, () => {
      const pairs = [
        ...[colors.canvas, colors.canvasMuted, colors.surface, colors.surfaceStrong].flatMap(background =>
          [colors.text, colors.textMuted, colors.accentDeep].map(foreground => [foreground, background])),
        [colors.onAccent, colors.accent], [colors.onAccent, colors.accentDeep],
        [colors.strong, colors.strongSoft], [colors.good, colors.goodSoft],
        [colors.fair, colors.fairSoft], [colors.noGo, colors.noGoSoft],
      ];
      for (const [foreground, background] of pairs) {
        const a = luminance(foreground), b = luminance(background);
        expect((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), `${foreground} on ${background}`).toBeGreaterThanOrEqual(4.5);
      }
    });
  }
});
