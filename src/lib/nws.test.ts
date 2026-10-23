import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchJson } from './http';
import { fetchNwsWeatherSnapshot } from './nws';

vi.mock('./http', () => ({ fetchJson: vi.fn() }));

const now = new Date('2026-10-23T00:15:00Z');
const hourlyUrl = 'https://api.weather.gov/gridpoints/TEST/1,1/forecast/hourly';
const gridUrl = 'https://api.weather.gov/gridpoints/TEST/1,1';
const stationsUrl = `${gridUrl}/stations`;

describe('NWS weather fallback', () => {
  let observation: Record<string, unknown>;
  let gridFails: boolean;
  let gridAvailable: boolean;
  let forecastOffsetHours: number;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
    observation = {
      timestamp: '2026-10-22T23:55:00Z',
      temperature: { value: 10, unitCode: 'wmoUnit:degC' },
      windSpeed: { value: 0, unitCode: 'wmoUnit:km_h-1' },
      windGust: { value: 16, unitCode: 'wmoUnit:km_h-1' },
      textDescription: 'Clear',
    };
    gridFails = false;
    gridAvailable = true;
    forecastOffsetHours = 0;
    vi.mocked(fetchJson).mockImplementation(async (url) => {
      if (url.includes('/points/')) return { properties: {
        forecastHourly: hourlyUrl,
        forecastGridData: gridAvailable ? gridUrl : undefined,
        observationStations: stationsUrl,
        timeZone: 'America/Chicago',
      } };
      if (url === hourlyUrl) return { properties: { periods: [-1, 0, 1, 2].map((hour) => ({
        startTime: new Date(Date.parse('2026-10-23T00:00:00Z') + (hour + forecastOffsetHours) * 3_600_000).toISOString(),
        endTime: new Date(Date.parse('2026-10-23T00:00:00Z') + (hour + forecastOffsetHours + 1) * 3_600_000).toISOString(),
        temperature: hour === -1 ? 99 : 68,
        temperatureUnit: 'F',
        windSpeed: '5 mph',
        shortForecast: hour === 2 ? 'Rain' : 'Cloudy',
        probabilityOfPrecipitation: { value: hour === 2 ? 70 : 0 },
      })) } };
      if (url === gridUrl) {
        if (gridFails) throw new Error('HTTP 403');
        return { properties: { windGust: { values: [{ validTime: '2026-10-23T00:00:00Z/PT12H', value: 20 }] } } };
      }
      if (url === stationsUrl) return { features: [{ properties: { stationIdentifier: 'TEST' } }] };
      if (url.includes('/observations/latest')) return { properties: observation };
      throw new Error(`Unexpected URL: ${url}`);
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('keeps recent station observations, including calm wind', async () => {
    const result = await fetchNwsWeatherSnapshot(44, -90);
    expect(result).toMatchObject({
      observedAt: '2026-10-22T23:55:00Z', temperatureF: 50, windMph: 0,
      conditionLabel: 'Clear', weatherSource: 'NWS forecast + station observation',
    });
  });

  it.each([
    '2026-10-22T13:15:00Z', // The production incident: an 11-hour-old observation.
    '2026-10-22T21:14:59Z', // Older than the three-hour freshness limit.
    'invalid',
    undefined,
    '2026-10-23T01:15:00Z', // A bad future timestamp must not look fresh.
  ])('uses current forecast values when the station timestamp is %s', async (timestamp) => {
    observation.timestamp = timestamp;
    const result = await fetchNwsWeatherSnapshot(44, -90);
    expect(result).toMatchObject({
      observedAt: '2026-10-23T00:00:00.000Z', temperatureF: 68, windMph: 5,
      conditionLabel: 'Cloudy', weatherSource: 'NWS forecast',
      next12hPrecipStartsInHours: 2,
    });
    expect(result?.gustMph).toBeCloseTo(20 * 0.621371);
    expect(result?.todayHourly[0]?.time).toBe('2026-10-23T00:00:00.000Z');
  });

  it('accepts a station observation at the freshness limit', async () => {
    observation.timestamp = '2026-10-22T21:15:00Z';
    expect(await fetchNwsWeatherSnapshot(44, -90)).toMatchObject({ temperatureF: 50, weatherSource: 'NWS forecast + station observation' });
  });

  it('measures upcoming rain from now instead of the station observation time', async () => {
    observation.timestamp = '2026-10-22T22:00:00Z';
    expect(await fetchNwsWeatherSnapshot(44, -90)).toMatchObject({ next12hPrecipStartsInHours: 2 });
  });

  it.each(['missing', 'failed'])('keeps hourly weather when supplemental grid data is %s', async (state) => {
    observation.timestamp = '2026-10-22T13:15:00Z';
    gridAvailable = state !== 'missing';
    gridFails = state === 'failed';
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(await fetchNwsWeatherSnapshot(44, -90)).toMatchObject({
      temperatureF: 68, windMph: 5, gustMph: null,
      next12hPrecipitationIn: null, next12hPrecipProbabilityMax: 70,
    });
  });

  it('preserves the old forecast timestamp when neither source is current', async () => {
    observation = {};
    forecastOffsetHours = -12;
    const result = await fetchNwsWeatherSnapshot(44, -90);
    expect(Date.parse(result!.observedAt!)).toBeLessThan(now.getTime() - 3 * 3_600_000);
    expect(result?.weatherSource).toBe('NWS forecast');
  });
});
