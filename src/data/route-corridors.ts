import type { RouteSegmentEdge } from '@paddletoday/api-contract';

export interface RouteCorridorDefinition {
  corridorId: string;
  label: string;
  continuityStatus: 'verified' | 'partial' | 'condition-family';
  canonicalSlug?: string;
  slugs?: string[];
  slugPrefix?: string;
  segmentEdges?: RouteSegmentEdge[];
}

export const routeCorridorDefinitions: RouteCorridorDefinition[] = [
  {
    corridorId: 'mn-sauk-water-trail',
    label: 'Sauk River water-trail corridor',
    continuityStatus: 'condition-family',
    slugPrefix: 'sauk-river-',
  },
  {
    corridorId: 'wi-turtle-creek-upper',
    label: 'Turtle Creek upper wildlife-area corridor',
    continuityStatus: 'verified',
    slugs: ['turtle-creek-school-section-east-creek', 'turtle-creek-east-creek-road-highway-140'],
    canonicalSlug: 'turtle-creek-school-section-east-creek',
    segmentEdges: [
      { fromId: 'school-section-road-turtle-creek', toId: 'highway-14-turtle-creek-bridge', status: 'verified' },
      { fromId: 'highway-14-turtle-creek-bridge', toId: 'highway-c-turtle-creek-bridge', status: 'verified' },
      { fromId: 'highway-c-turtle-creek-bridge', toId: 'east-creek-road-public-pull-off', status: 'verified' },
    ],
  },
  {
    corridorId: 'ia-middle-river-water-trail',
    label: 'Middle River water-trail corridor',
    continuityStatus: 'partial',
    slugs: [
      'middle-river-forest-park-schildberg',
      'middle-river-schildberg-roseman',
      'middle-river-roseman-pammel',
      'middle-river-pammel-holliwell',
    ],
    canonicalSlug: 'middle-river-pammel-holliwell',
    segmentEdges: [
      { fromId: 'pammel-park-ford-access', toId: 'middle-river-county-park-access', status: 'verified' },
      { fromId: 'middle-river-county-park-access', toId: 'holliwell-covered-bridge-access', status: 'verified' },
    ],
  },
  {
    corridorId: 'ia-upper-iowa-cattle-malanaphy',
    label: 'Upper Iowa Cattle Creek-Malanaphy corridor',
    continuityStatus: 'verified',
    slugs: ['upper-iowa-river-cattle-creek-malanaphy'],
    canonicalSlug: 'upper-iowa-river-cattle-creek-malanaphy',
    segmentEdges: [
      { fromId: 'cattle-creek-road-daley-bridge', toId: 'chimney-rock-park-access', status: 'verified' },
      { fromId: 'chimney-rock-park-access', toId: 'bluffton-fir-stand-access', status: 'verified' },
      { fromId: 'bluffton-fir-stand-access', toId: 'malanaphy-springs-access', status: 'verified' },
    ],
  },
  {
    corridorId: 'ia-cedar-river-condition-family',
    label: 'Cedar River condition family',
    continuityStatus: 'condition-family',
    slugPrefix: 'cedar-river-',
  },
  {
    corridorId: 'mn-crow-wing-condition-family',
    label: 'Crow Wing River condition family',
    continuityStatus: 'condition-family',
    slugPrefix: 'crow-wing-river-',
  },
  {
    corridorId: 'ia-des-moines-condition-family',
    label: 'Des Moines River condition family',
    continuityStatus: 'condition-family',
    slugPrefix: 'des-moines-river-',
  },
  {
    corridorId: 'mn-minnesota-river-condition-family',
    label: 'Minnesota River condition family',
    continuityStatus: 'condition-family',
    slugPrefix: 'minnesota-river-',
  },
  {
    corridorId: 'wi-wisconsin-river-condition-family',
    label: 'Wisconsin River condition family',
    continuityStatus: 'condition-family',
    slugPrefix: 'wisconsin-river-',
  },
  {
    corridorId: 'ia-north-raccoon-condition-family',
    label: 'North Raccoon River condition family',
    continuityStatus: 'condition-family',
    slugPrefix: 'north-raccoon-river-',
  },
];

export function corridorForSlug(slug: string) {
  return routeCorridorDefinitions.find((definition) => definition.slugs?.includes(slug) || definition.slugPrefix && slug.startsWith(definition.slugPrefix));
}
