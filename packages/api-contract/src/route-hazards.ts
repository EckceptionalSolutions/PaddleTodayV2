export type RouteHazard =
  | 'dam'
  | 'low_head_dam'
  | 'mandatory_takeout'
  | 'strainers'
  | 'whitewater'
  | 'fast_rise'
  | 'low_water'
  | 'flash_flood'
  | 'cold_water'
  | 'remote'
  | 'urban_water_quality'
  | 'dam_release'
  | 'access_uncertain'
  | 'private_banks'
  | 'wind'
  | 'portage'
  | 'waterfall'
  | 'wildlife';

export const routeHazardLabels: Record<RouteHazard, string> = {
  dam: 'Dam',
  low_head_dam: 'Low-head dam',
  mandatory_takeout: 'Mandatory takeout',
  strainers: 'Strainers',
  whitewater: 'Whitewater',
  fast_rise: 'Fast rise',
  low_water: 'Low water',
  flash_flood: 'Flash flood',
  cold_water: 'Cold water',
  remote: 'Remote',
  urban_water_quality: 'Water quality',
  dam_release: 'Dam release',
  access_uncertain: 'Access uncertain',
  private_banks: 'Private banks',
  wind: 'Wind exposure',
  portage: 'Portage',
  waterfall: 'Waterfall',
  wildlife: 'Wildlife',
};
