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
    corridorId: 'mn-cannon-lower',
    label: 'Lower Cannon River access corridor',
    continuityStatus: 'verified',
    slugs: ['cannon-river-byllesby-highway-61', 'cannon-river-riverside-miesville', 'cannon-river-welch'],
    canonicalSlug: 'cannon-river-byllesby-highway-61',
    segmentEdges: [
      { fromId: 'lake-byllesby-east-cannon', toId: 'cannon-riverside-park', status: 'verified' },
      { fromId: 'cannon-riverside-park', toId: 'cannon-miesville-ravine', status: 'verified' },
      { fromId: 'cannon-miesville-ravine', toId: 'cannon-welch-mill-access', status: 'verified' },
      { fromId: 'cannon-welch-mill-access', toId: 'highway-61-cannon', status: 'verified' },
    ],
  },
  {
    corridorId: 'mn-little-fork-fiedler-lofgren',
    label: 'Little Fork Fiedler-to-Lofgren corridor',
    continuityStatus: 'verified',
    slugs: ['little-fork-river-fiedler-lofgren-park', 'little-fork-river-fiedler-devereaux', 'little-fork-river-devereaux-lofgren-park'],
    canonicalSlug: 'little-fork-river-fiedler-lofgren-park',
    segmentEdges: [
      { fromId: 'fiedler', toId: 'devereaux', status: 'verified' },
      { fromId: 'devereaux', toId: 'lofgren-park', status: 'verified' },
    ],
  },
  {
    corridorId: 'mn-pomme-de-terre-lower',
    label: 'Lower Pomme de Terre access corridor',
    continuityStatus: 'verified',
    slugs: ['pomme-de-terre-river-pomme-1-appleton', 'pomme-de-terre-river-larson-appleton'],
    canonicalSlug: 'pomme-de-terre-river-pomme-1-appleton',
    segmentEdges: [
      { fromId: 'pomme-de-terre-pomme-1', toId: 'pomme-de-terre-larson', status: 'verified' },
      { fromId: 'pomme-de-terre-larson', toId: 'appleton-pomme-de-terre', status: 'verified' },
    ],
  },
  {
    corridorId: 'mn-mississippi-royalton-sartell',
    label: 'Mississippi Royalton-to-Sartell access corridor',
    continuityStatus: 'verified',
    slugs: ['mississippi-river-royalton-sartell', 'mississippi-river-royalton-stearns-county-park'],
    canonicalSlug: 'mississippi-river-royalton-sartell',
    segmentEdges: [
      { fromId: 'royalton-sportsmans-club', toId: 'mississippi-county-park', status: 'verified' },
      { fromId: 'mississippi-county-park', toId: 'walleye-road', status: 'verified' },
      { fromId: 'walleye-road', toId: 'sartell-access', status: 'verified' },
    ],
  },
  {
    corridorId: 'mn-big-fork-lower',
    label: 'Lower Big Fork River condition family',
    continuityStatus: 'condition-family',
    slugs: ['big-fork-river-big-falls-west-kueffners', 'big-fork-river-ben-linn-ivan-crawford', 'big-fork-river-gowdy-reedy-flats'],
  },
  {
    corridorId: 'mn-vermilion-condition-family',
    label: 'Vermilion River condition family',
    continuityStatus: 'condition-family',
    slugs: ['vermilion-river-shively-eightmile', 'vermilion-river-twomile-eightmile'],
  },
  {
    corridorId: 'wi-chippewa-upper',
    label: 'Upper Chippewa County D-to-Highway 8 corridor',
    continuityStatus: 'verified',
    slugs: ['chippewa-river-county-d-highway-8', 'chippewa-river-county-d-imalone', 'chippewa-river-county-a-highway-8'],
    canonicalSlug: 'chippewa-river-county-d-highway-8',
    segmentEdges: [
      { fromId: 'chippewa-county-d', toId: 'chippewa-imalone', status: 'verified' },
      { fromId: 'chippewa-imalone', toId: 'chippewa-highway-8', status: 'verified' },
    ],
  },
  {
    corridorId: 'ia-turkey-elkader-garber',
    label: 'Turkey River Elkader-to-Garber corridor',
    continuityStatus: 'verified',
    slugs: ['turkey-river-elkader-garber', 'turkey-river-elkader-motor-mill', 'turkey-river-motor-mill-garber'],
    canonicalSlug: 'turkey-river-elkader-garber',
    segmentEdges: [
      { fromId: 'turkey-elkader-whitewater', toId: 'turkey-motor-mill', status: 'verified' },
      { fromId: 'turkey-motor-mill', toId: 'turkey-garber', status: 'verified' },
    ],
  },
  {
    corridorId: 'ia-north-fork-maquoketa-cascade-caven',
    label: 'North Fork Maquoketa Cascade-to-Caven corridor',
    continuityStatus: 'verified',
    slugs: [
      'north-fork-maquoketa-river-cascade-caven',
      'north-fork-maquoketa-river-cascade-d61',
      'north-fork-maquoketa-river-d61-ozark',
      'north-fork-maquoketa-river-cascade-ozark',
      'north-fork-maquoketa-river-ozark-caven',
      'north-fork-maquoketa-river-d61-caven',
    ],
    canonicalSlug: 'north-fork-maquoketa-river-cascade-caven',
    segmentEdges: [
      { fromId: 'north-fork-cascade', toId: 'north-fork-d61', status: 'verified' },
      { fromId: 'north-fork-d61', toId: 'north-fork-ozark', status: 'verified' },
      { fromId: 'north-fork-ozark', toId: 'north-fork-caven', status: 'verified' },
    ],
  },
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
    slugs: ['upper-iowa-river-cattle-creek-malanaphy', 'upper-iowa-river-kendallville-bluffton'],
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
    continuityStatus: 'partial',
    slugPrefix: 'crow-wing-river-',
    canonicalSlug: 'crow-wing-river-mary-brown-cottingham',
    segmentEdges: [
      { fromId: 'mary-brown-rest-area', toId: 'andersons-crossing', status: 'verified' },
      { fromId: 'andersons-crossing', toId: 'stigmans-mound', status: 'verified' },
      { fromId: 'stigmans-mound', toId: 'frames-landing', status: 'verified' },
      { fromId: 'frames-landing', toId: 'little-white-dog', status: 'verified' },
      { fromId: 'little-white-dog', toId: 'knob-hill', status: 'verified' },
      { fromId: 'knob-hill', toId: 'cottingham-county-park', status: 'verified' },
    ],
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
