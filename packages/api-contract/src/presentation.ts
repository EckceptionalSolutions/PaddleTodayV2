import type { ScoreRating } from './index';

export interface ColdWeatherCallInput {
  temperatureF?: number | null;
  next12hWindMphMax?: number | null;
  windMph?: number | null;
  next12hPrecipProbabilityMax?: number | null;
  next12hStormRisk?: boolean | null;
}

export function isColdWeatherDrivenCall(
  weather: ColdWeatherCallInput | null | undefined,
  gaugeBand: string | null | undefined
) {
  const temperature = weather?.temperatureF;
  const wind = weather?.next12hWindMphMax ?? weather?.windMph ?? 0;
  const rainChance = weather?.next12hPrecipProbabilityMax ?? 0;

  return (
    typeof temperature === 'number'
    && temperature <= 40
    && ['ideal', 'minimum-met', 'low-shoulder'].includes(String(gaugeBand || ''))
    && !weather?.next12hStormRisk
    && (rainChance < 70 || wind < 20)
  );
}

export function ratingToneKey(rating: ScoreRating | string | null | undefined) {
  if (rating === 'Strong') return 'great';
  if (rating === 'Fair') return 'marginal';
  return String(rating || 'pending').toLowerCase().replace(/[^a-z]+/g, '-');
}

export function signedPoints(value: number) {
  if (!Number.isFinite(value)) return 'Unavailable';
  return value > 0 ? `+${value}` : String(value);
}

export function friendlyCapReason(reason: string | null | undefined) {
  const normalized = String(reason || '').trim();
  if (!normalized) return '';

  if (/Near-freezing air caps today at 70\.|Cold air limits today's score to 70 or lower\./i.test(normalized)) {
    return 'Cold air keeps today from scoring higher, even if the river itself looks good.';
  }
  if (/High wind caps today at 75\.|Strong wind limits today's score to 75 or lower\./i.test(normalized)) {
    return 'Strong wind puts a ceiling on today, even if the gauge is in range.';
  }
  if (/Imminent heavy rain caps today at 65\.|Heavy rain or storms likely soon limit the score to 65\.|Heavy rain or storms likely soon limit today's score to 65 or lower\./i.test(normalized)) {
    return 'Heavy rain or storms likely within 3 hours limit the score to 65.';
  }
  if (/Minimum-only guidance caps the trip score at 74\.|This route has minimum-only gauge guidance, so today's score is limited to 74 or lower\./i.test(normalized)) {
    return 'This route only has a reliable low-water floor, so the score stops short of the top range.';
  }
  return normalized;
}
