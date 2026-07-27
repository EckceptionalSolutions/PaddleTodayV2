export const semanticColors = Object.freeze({
  rating: Object.freeze({
    strong: '#2F6B59',
    good: '#567B46',
    fair: '#8A6A2A',
    noGo: '#8C4A36',
  }),
  status: Object.freeze({
    live: '#2F6B59',
    degraded: '#8A6A2A',
    offline: '#8C4A36',
  }),
});

export const semanticRadii = Object.freeze({
  web: Object.freeze({
    control: 12,
    card: 18,
    panel: 28,
    pill: 999,
  }),
  native: Object.freeze({
    control: 8,
    card: 12,
    panel: 16,
    pill: 999,
  }),
});

export const semanticSpacing = Object.freeze({
  web: Object.freeze({
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  }),
  native: Object.freeze({
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 22,
  }),
});

export function semanticColorForRating(rating) {
  if (rating === 'Strong') return semanticColors.rating.strong;
  if (rating === 'Good') return semanticColors.rating.good;
  if (rating === 'Fair') return semanticColors.rating.fair;
  return semanticColors.rating.noGo;
}
