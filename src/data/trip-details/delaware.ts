import type { RiverTripDetails } from '../../lib/types';
import { delawareRoutes } from '../routes/delaware';

const corridorByRouteId: Record<string, { id: string; label: string; continuityStatus: 'verified' | 'partial' | 'condition-family' }> = {
  'brandywine-creek-smith-bridge-thompsons-bridge': {
    id: 'de-brandywine-smith-thompsons',
    label: 'Brandywine Creek Smith Bridge to Thompson’s Bridge',
    continuityStatus: 'verified',
  },
  'blackbird-creek-reserve-the-rocks': {
    id: 'de-blackbird-reserve-rocks',
    label: 'Blackbird Creek Reserve to The Rocks boat launch',
    continuityStatus: 'partial',
  },
  'st-jones-river-lebanon-scotton': {
    id: 'de-st-jones-lebanon-scotton',
    label: 'St. Jones River Lebanon Landing to Scotton Landing',
    continuityStatus: 'partial',
  },
  'christina-river-newport-7th-street': {
    id: 'de-christina-newport-7th-street',
    label: 'Christina River Newport Boat Ramp to 7th Street Wilmington',
    continuityStatus: 'partial',
  },
  'broad-creek-fisher-phillips': {
    id: 'de-broad-creek-fisher-phillips',
    label: 'Broad Creek Roger C. Fisher Laurel River Park to Phillips Landing',
    continuityStatus: 'partial',
  },
  'mispillion-river-front-street-cedar-creek': {
    id: 'de-mispillion-front-street-cedar-creek',
    label: 'Mispillion River Front Street Milford to Cedar Creek public ramp',
    continuityStatus: 'partial',
  },
  'christina-river-churchmans-newport': {
    id: 'de-christina-churchmans-newport',
    label: 'Christina River Churchmans Road to Newport Boat Ramp',
    continuityStatus: 'partial',
  },
  'broadkill-river-milton-mccabe': {
    id: 'de-broadkill-milton-mccabe',
    label: 'Broadkill River Milton Memorial Park to McCabe Preserve canoe dock',
    continuityStatus: 'partial',
  },
  'nanticoke-river-seaford-woodland-wharf': {
    id: 'de-nanticoke-seaford-woodland-wharf',
    label: 'Nanticoke River Seaford public ramp to Woodland Wharf kayak launch',
    continuityStatus: 'partial',
  },
  'lewes-rehoboth-canal-lewes-grove-park': {
    id: 'de-lewes-rehoboth-canal-lewes-grove',
    label: 'Lewes & Rehoboth Canal Lewes Canalfront Park to Grove Park Canal Dock',
    continuityStatus: 'partial',
  },
  'prime-hook-creek-foords-waples': {
    id: 'de-prime-hook-creek-foord-waples',
    label: 'Prime Hook Creek Foord’s Landing to Waples Mill Pond / Brumbley launch',
    continuityStatus: 'partial',
  },
  'delaware-river-fort-dupont-augustine-beach': {
    id: 'de-delaware-river-shoreline-frontier',
    label: 'Delaware River Fort DuPont Branch Canal to Augustine Beach',
    continuityStatus: 'partial',
  },
  'little-river-delaware-wildlife-town': {
    id: 'de-little-river-little-creek',
    label: 'Little River Little Creek Wildlife Area to town boating access',
    continuityStatus: 'partial',
  },
  'rehoboth-bay-new-road-savages-ditch': {
    id: 'de-indian-river-masseys-rosedale',
    label: 'Rehoboth Bay Savages Ditch Road to New Road water trail',
    continuityStatus: 'partial',
  },
  'murderkill-river-bowers-beach-loop': {
    id: 'de-murderkill-bowers-beach-loop',
    label: 'Murderkill River Bowers Beach same-launch tidal exploration',
    continuityStatus: 'partial',
  },
  'miller-creek-strawberry-sassafras': {
    id: 'de-miller-creek-strawberry-sassafras',
    label: 'Miller Creek Strawberry Landing to Sassafras Landing',
    continuityStatus: 'partial',
  },
  'duck-creek-woodland-beach-loop': {
    id: 'de-duck-creek-woodland-beach',
    label: 'Duck Creek Woodland Beach same-launch tidal exploration',
    continuityStatus: 'partial',
  },
};

export const delawareRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  delawareRoutes.map((route) => [
    route.id,
    (() => {
      const corridor = corridorByRouteId[route.id];
      if (!corridor) throw new Error(`Missing Delaware corridor mapping for ${route.id}.`);
      return {
        putIn: route.putIn!,
        takeOut: route.takeOut!,
        logistics: route.logistics!,
        accessPoints: route.accessPoints,
        corridorId: corridor.id,
        corridorLabel: corridor.label,
        continuityStatus: corridor.continuityStatus,
      };
    })(),
  ]),
);
