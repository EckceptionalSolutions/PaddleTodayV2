import { fetchJson } from './http';

type MrmsSampleResponse = {
  samples?: Array<{
    value?: string;
  }>;
};

const MRMS_IMAGE_SERVER =
  'https://mapservices.weather.noaa.gov/raster/rest/services/obs/mrms_qpe/ImageServer/getSamples';
const MILLIMETERS_PER_INCH = 25.4;

export async function fetchRecentRainTotals(latitude: number, longitude: number): Promise<{
  recentRain24hIn: number | null;
  recentRain72hIn: number | null;
  rainfallSource: string | null;
}> {
  const [recentRain24hIn, recentRain72hIn] = await Promise.all([
    sampleMrmsTotal(latitude, longitude, 'conus_QPE_24H'),
    sampleMrmsTotal(latitude, longitude, 'conus_QPE_72H'),
  ]);

  const hasRainData =
    typeof recentRain24hIn === 'number' || typeof recentRain72hIn === 'number';

  return {
    recentRain24hIn,
    recentRain72hIn,
    rainfallSource: hasRainData ? 'NOAA MRMS QPE' : null,
  };
}

async function sampleMrmsTotal(
  latitude: number,
  longitude: number,
  layerName: string
): Promise<number | null> {
  const url = new URL(MRMS_IMAGE_SERVER);
  url.searchParams.set('f', 'json');
  url.searchParams.set(
    'geometry',
    JSON.stringify({
      x: longitude,
      y: latitude,
      spatialReference: { wkid: 4326 },
    })
  );
  url.searchParams.set('geometryType', 'esriGeometryPoint');
  url.searchParams.set('returnFirstValueOnly', 'true');
  url.searchParams.set(
    'mosaicRule',
    JSON.stringify({
      where: `name = '${layerName}'`,
    })
  );

  const data = await fetchJson<MrmsSampleResponse>(url.toString(), {
    timeoutMs: 10_000,
    retries: 2,
  });

  const rawValue = Number(data.samples?.[0]?.value);
  if (!Number.isFinite(rawValue)) {
    return null;
  }

  return convertMrmsSampleToInches(rawValue);
}

export function convertMrmsSampleToInches(rawValue: number): number {
  // NOAA's MRMS QPE image service description is written in inches, but the
  // sampled pixel values behave like native MRMS millimeters when queried
  // directly from getSamples. Convert here so downstream code stays in inches.
  return rawValue / MILLIMETERS_PER_INCH;
}
