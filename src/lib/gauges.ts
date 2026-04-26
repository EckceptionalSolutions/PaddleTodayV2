import { fetchMnDnrGaugeReading } from './mn-dnr';
import { fetchUsgsGaugeReading } from './usgs';
import type { GaugeReading, RiverGaugeSource } from './types';

export async function fetchGaugeReading(source: RiverGaugeSource): Promise<GaugeReading | null> {
  switch (source.provider) {
    case 'usgs':
      return fetchUsgsGaugeReading(source);
    case 'mn_dnr':
      return fetchMnDnrGaugeReading(source);
    default:
      return assertNever(source.provider);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unsupported gauge provider: ${value}`);
}
