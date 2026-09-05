import { describe, expect, it } from 'vitest';
import { getRoutePreviewPhoto } from '../data/route-gallery';
import { publicRivers } from '../data/rivers';
import { idahoRoutes } from '../data/routes/idaho';

const expectedIds = [
  'little-north-fork-clearwater-headwaters-reservoir',
  'slate-creek-franklin-mine-st-joe',
  'marble-creek-camp-3-st-joe',
  'st-joe-river-skookum-canyon',
  'mores-creek-big-gulch-robie',
  'potlatch-river-little-boulder-cedar',
  'boundary-creek-canadian-border-kootenai', 'smith-creek-bridge-smith-falls',
  'st-joe-heller-creek-spruce-tree',
  'little-salmon-smoky-boulder-hazard',
  'little-salmon-hazard-creek-riggins',
  'east-fork-south-fork-salmon-vibika-johnson',
  'east-fork-south-fork-salmon-johnson-indian-point',
  'south-fork-salmon-goat-creek-poverty-flat',
  'south-fork-salmon-poverty-flat-east-fork',
  'south-fork-salmon-secesh-confluence-vinegar',
  'johnson-creek-yellow-pine-airport-gauge',
  'henrys-fork-upper-coffee-pot-mccrea',
  'henrys-fork-box-canyon-last-chance',
  'lightning-creek-east-fork-clark-fork',
  'fall-river-cave-falls-concrete', 'fall-river-concrete-ccc-kirkham',
  'south-fork-snake-palisades-dam-spring-creek', 'south-fork-snake-spring-creek-conant',
  'south-fork-snake-conant-byington', 'south-fork-snake-byington-heise',
  'south-fork-snake-heise-twin-bridges', 'south-fork-snake-twin-bridges-lorenzo',
  'south-fork-snake-lorenzo-menan', 'south-fork-snake-menan-mike-walker',
  'payette-river-banks-beehive-bend', 'payette-river-beehive-bend-horseshoe-dam', 'middle-fork-payette-boiling-springs-trail-creek', 'middle-fork-payette-hardscrabble-lightning-creek', 'south-fork-payette-deer-creek-banks',
  'boise-river-barber-ann-morrison', 'boise-river-barber-willow-lane', 'boise-river-troutdale-badger', 'boise-river-troutdale-willow', 'north-fork-boise-barber-flat-troutdale', 'salmon-river-stanley-sunbeam', 'salmon-river-sunbeam-torreys-hole', 'yankee-fork-pole-flat-salmon', 'salmon-river-bayhorse-challis-bridge',
  'salmon-river-challis-bridge-watts', 'salmon-river-watts-kilpatrick',
  'salmon-river-kilpatrick-salmon-island', 'salmon-river-salmon-island-north-fork', 'salmon-river-north-fork-corn-creek',
  'main-salmon-corn-creek-vinegar-carey', 'salmon-river-carey-creek-riggins',
  'middle-fork-salmon-boundary-cache-bar',
  'lower-salmon-island-bar-shorts-bar', 'lower-salmon-shorts-bar-lucile',
  'lower-salmon-lucile-hammer-creek', 'lower-salmon-hammer-heller-bar', 'north-fork-payette-sheep-smylie-lane', 'north-fork-payette-rotary-sheep-bridge', 'north-fork-payette-smiths-ferry-banks', 'north-fork-payette-cabarton-smiths-ferry',
  'north-fork-payette-kellys-whitewater-park',
  'upper-lochsa-white-pine-wilderness-gateway', 'lower-lochsa-wilderness-gateway-split-creek', 'north-fork-clearwater-washington-quartz', 'north-fork-clearwater-weitas-washington', 'north-fork-clearwater-hidden-kelly', 'kelly-creek-moose-kelly-forks', 'lochsa-split-creek-lowell', 'big-creek-st-joe-end-road-bridge', 'marsh-creek-highway-21-dagger-falls', 'crooked-fork-highway-12-white-sands', 'selway-paradise-selway-falls', 'selway-falls-wild-goose-clearwater',
  'henrys-fork-riverside-hatchery-ford', 'south-fork-boise-anderson-danskin', 'south-fork-boise-danskin-neal',
  'bear-river-black-canyon-grace-powerhouse', 'bear-river-oneida-narrows', 'portneuf-river-lava-hot-springs-pvc', 'north-fork-clearwater-black-canyon', 'north-fork-clearwater-kelly-aquarius',
  'south-fork-clearwater-bully-creek-highway-13', 'south-fork-clearwater-golden-canyon', 'lolo-creek-lolo-road-greer', 'north-fork-owyhee-campground-three-forks', 'owyhee-river-crutchers-three-forks', 'bruneau-indian-hot-springs-bruneau',
  'jarbidge-river-murphy-bruneau', 'priest-river-outlet-dickensheet',
  'north-fork-st-joe-loop-creek-confluence', 'st-joe-spruce-tree-gold-creek', 'st-joe-tumbledown-gold-bluff',
  'south-fork-payette-grandjean-deadwood',
  'deadwood-river-julie-creek-deadwood-campground',
  'south-fork-payette-canyon-deadwood-danskin',
  'south-fork-payette-swirly-danskin-alder',
  'south-fork-payette-staircase-deer-creek-banks',
  'snake-river-hells-canyon-dam-pittsburg',
  'snake-river-pittsburg-heller-bar',
  'snake-river-murtaugh-bridge-twin-falls',
  'st-maries-river-mashburn-st-joe', 'st-joe-river-spruce-tree-turner-flat',
  'st-joe-river-shadowy-st-maries-aqua',
  'clearwater-river-mckays-bend-pink-house', 'snake-river-lower-salmon-falls-bliss', 'snake-river-milner-mile',
  'blackfoot-river-government-dam-cutthroat', 'blackfoot-river-cutthroat-trail-creek', 'blackfoot-river-wolverine-canyon', 'henrys-fork-hatchery-ford-upper-mesa', 'teton-river-dam-site-teton-forks', 'teton-river-lower-canyon', 'teton-river-highway-33-spring-hollow', 'bitch-creek-highway-32-teton', 'big-wood-river-baker-north-fork', 'big-wood-river-chocolate-gulch-lake-creek', 'big-wood-river-rotary-broadway', 'snake-river-auger-falls-park', 'warm-springs-creek-lodge-river-run', 'weiser-river-midvale-galloway', 'moyie-river-copper-twin-bridges', 'moyie-river-twin-bridges-meadow-creek', 'moyie-river-meadow-creek-reservoir', 'camas-creek-blaine-moonstone', 'henrys-lake-south-shore-loop',
];

const scoredIds = [
  'little-salmon-smoky-boulder-hazard',
  'little-salmon-hazard-creek-riggins',
  'johnson-creek-yellow-pine-airport-gauge',
  'south-fork-salmon-poverty-flat-east-fork',
  'henrys-fork-upper-coffee-pot-mccrea',
  'henrys-fork-box-canyon-last-chance',
  'fall-river-cave-falls-concrete', 'fall-river-concrete-ccc-kirkham',
  'south-fork-snake-palisades-dam-spring-creek',
  'south-fork-snake-spring-creek-conant',
  'south-fork-snake-conant-byington',
  'south-fork-snake-byington-heise',
  'south-fork-snake-heise-twin-bridges',
  'south-fork-snake-twin-bridges-lorenzo',
  'payette-river-banks-beehive-bend',
  'payette-river-beehive-bend-horseshoe-dam',
  'middle-fork-payette-hardscrabble-lightning-creek',
  'boise-river-barber-ann-morrison',
  'boise-river-barber-willow-lane',
  'boise-river-troutdale-badger',
  'salmon-river-stanley-sunbeam',
  'salmon-river-sunbeam-torreys-hole',
  'salmon-river-bayhorse-challis-bridge',
  'salmon-river-challis-bridge-watts',
  'salmon-river-watts-kilpatrick',
  'salmon-river-kilpatrick-salmon-island',
  'salmon-river-salmon-island-north-fork',
  'salmon-river-north-fork-corn-creek',
  'salmon-river-carey-creek-riggins',
  'middle-fork-salmon-boundary-cache-bar',
  'lower-salmon-island-bar-shorts-bar',
  'lower-salmon-shorts-bar-lucile',
  'lower-salmon-lucile-hammer-creek',
  'lower-salmon-hammer-heller-bar',
  'north-fork-payette-sheep-smylie-lane',
  'north-fork-payette-rotary-sheep-bridge',
  'north-fork-payette-cabarton-smiths-ferry',
  'north-fork-payette-kellys-whitewater-park',
  'upper-lochsa-white-pine-wilderness-gateway',
  'lower-lochsa-wilderness-gateway-split-creek',
  'selway-falls-wild-goose-clearwater',
  'henrys-fork-riverside-hatchery-ford',
  'henrys-fork-hatchery-ford-upper-mesa',
  'south-fork-boise-danskin-neal',
  'bear-river-oneida-narrows',
  'north-fork-clearwater-kelly-aquarius',
  'south-fork-clearwater-bully-creek-highway-13',
  'south-fork-clearwater-golden-canyon',
  'bruneau-indian-hot-springs-bruneau',
  'jarbidge-river-murphy-bruneau',
  'priest-river-outlet-dickensheet',
  'north-fork-payette-smiths-ferry-banks',
  'snake-river-hells-canyon-dam-pittsburg',
  'snake-river-milner-mile',
  'snake-river-pittsburg-heller-bar',
  'snake-river-murtaugh-bridge-twin-falls',
  'snake-river-lower-salmon-falls-bliss',
  'st-joe-river-shadowy-st-maries-aqua',
  'south-fork-boise-anderson-danskin',
  'middle-fork-payette-boiling-springs-trail-creek',
  'lolo-creek-lolo-road-greer',
  'teton-river-highway-33-spring-hollow',
  'big-wood-river-baker-north-fork',
  'big-wood-river-chocolate-gulch-lake-creek',
  'weiser-river-midvale-galloway',
  'snake-river-auger-falls-park',
  'warm-springs-creek-lodge-river-run',
  'moyie-river-copper-twin-bridges',
  'moyie-river-twin-bridges-meadow-creek',
  'bear-river-black-canyon-grace-powerhouse',
];

const planningIds = [
  'slate-creek-franklin-mine-st-joe',
  'marble-creek-camp-3-st-joe',
  'east-fork-south-fork-salmon-vibika-johnson',
  'east-fork-south-fork-salmon-johnson-indian-point',
  'south-fork-salmon-goat-creek-poverty-flat',
  'south-fork-salmon-secesh-confluence-vinegar',
  'st-joe-river-skookum-canyon',
  'south-fork-snake-lorenzo-menan',
  'south-fork-snake-menan-mike-walker',
  'south-fork-payette-deer-creek-banks',
  'st-joe-river-spruce-tree-turner-flat', 'st-maries-river-mashburn-st-joe',
  'henrys-lake-south-shore-loop',
  'south-fork-payette-staircase-deer-creek-banks',
  'north-fork-st-joe-loop-creek-confluence', 'st-joe-spruce-tree-gold-creek', 'st-joe-tumbledown-gold-bluff',
  'south-fork-payette-swirly-danskin-alder',
  'main-salmon-corn-creek-vinegar-carey',
  'south-fork-payette-canyon-deadwood-danskin',
  'deadwood-river-julie-creek-deadwood-campground',
  'south-fork-payette-grandjean-deadwood',
  'clearwater-river-mckays-bend-pink-house',
  'north-fork-boise-barber-flat-troutdale',
  'teton-river-lower-canyon',
  'blackfoot-river-wolverine-canyon',
  'blackfoot-river-government-dam-cutthroat',
  'blackfoot-river-cutthroat-trail-creek',
  'portneuf-river-lava-hot-springs-pvc',
  'bitch-creek-highway-32-teton',
  'owyhee-river-crutchers-three-forks',
  'north-fork-owyhee-campground-three-forks',
  'camas-creek-blaine-moonstone',
  'moyie-river-meadow-creek-reservoir',
  'mores-creek-big-gulch-robie',
  'potlatch-river-little-boulder-cedar',
  'boundary-creek-canadian-border-kootenai', 'smith-creek-bridge-smith-falls',
  'st-joe-heller-creek-spruce-tree',
  'lightning-creek-east-fork-clark-fork',
  'north-fork-clearwater-black-canyon', 'north-fork-clearwater-washington-quartz', 'north-fork-clearwater-weitas-washington', 'north-fork-clearwater-hidden-kelly',
  'boise-river-troutdale-willow',
  'kelly-creek-moose-kelly-forks',
  'lochsa-split-creek-lowell',
  'selway-paradise-selway-falls',
  'little-north-fork-clearwater-headwaters-reservoir',
  'yankee-fork-pole-flat-salmon',
  'teton-river-dam-site-teton-forks',
  'big-wood-river-rotary-broadway',
  'crooked-fork-highway-12-white-sands', 'big-creek-st-joe-end-road-bridge',
  'marsh-creek-highway-21-dagger-falls',
];

describe('Idaho statewide paddling expansion', () => {
  it('keeps the researched Idaho batch and identifiers stable', () => {
    expect(idahoRoutes).toHaveLength(125);
    expect(idahoRoutes.map((route) => route.id)).toEqual(expectedIds);
    expect(new Set(idahoRoutes.map((route) => route.id)).size).toBe(125);
    expect(new Set(idahoRoutes.map((route) => route.slug)).size).toBe(125);
  });

  it('publishes every reviewed route with evidence-based scoring eligibility', () => {
    const publicIds = new Set(publicRivers.filter((route) => route.state === 'Idaho').map((route) => route.id));
    expect([...publicIds].sort()).toEqual(expectedIds.sort());
    expect(idahoRoutes.filter((route) => route.scoreEligibility === 'scored').map((route) => route.id).sort()).toEqual([...scoredIds].sort());
    expect(idahoRoutes.filter((route) => route.scoreEligibility === 'planning').map((route) => route.id).sort()).toEqual([...planningIds].sort());
  });

  it('has complete access, gauge, safety, camping, evidence, and image records', () => {
    for (const route of idahoRoutes) {
      expect(route.putIn?.name).toBeTruthy();
      expect(route.takeOut?.name).toBeTruthy();
      expect(route.accessPoints?.length).toBeGreaterThanOrEqual(2);
      expect(route.accessPoints?.[0].name).toBe(route.putIn?.name);
      expect(route.accessPoints?.at(-1)?.name).toBe(route.takeOut?.name);
      expect(route.gaugeSource.provider).toBe('usgs');
      expect(route.gaugeSource.siteId).toMatch(/^\d{8}$/);
      expect(route.gaugeSource.kind).toMatch(/^(direct|proxy)$/);
      expect(route.profile.thresholdModel).toMatch(/^(minimum-only|two-sided)$/);
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.safetyProfile?.hazards.length).toBeGreaterThanOrEqual(3);
      expect(route.logistics?.campingClassification).toBeTruthy();
      expect(route.evidenceNotes.length).toBeGreaterThanOrEqual(8);
      expect(route.evidenceNotes.some((note) => note.label === 'Public access control')).toBe(true);
      expect(route.evidenceNotes.some((note) => note.label === 'Overlap decision')).toBe(true);
      expect(route.sourceLinks.length).toBeGreaterThanOrEqual(6);
      const preview = getRoutePreviewPhoto(route);
      expect(preview.isPlaceholder).toBe(false);
      expect(preview.src).toMatch(/^https?:\/\//);
    }
  });

  it('preserves Idaho-specific operational controls and gauge posture', () => {
    expect(idahoRoutes.filter((route) => route.gaugeSource.kind === 'direct')).toHaveLength(91);
    expect(idahoRoutes.filter((route) => route.routeType === 'recreational')).toHaveLength(26);
    expect(idahoRoutes.filter((route) => route.routeType === 'whitewater')).toHaveLength(99);
    expect(idahoRoutes.filter((route) => route.gaugeSource.kind === 'proxy')).toHaveLength(34);
    expect(idahoRoutes.filter((route) => route.gaugeSource.kind === 'proxy').every((route) => route.scoreEligibilityReason === 'proxy_gauge')).toBe(true);
    expect(idahoRoutes.filter((route) => route.profile.thresholdModel === 'two-sided')).toHaveLength(74);
    expect(idahoRoutes.find((route) => route.id === 'boise-river-troutdale-willow')?.profile).toMatchObject({ tooLow: 500, idealMin: 1200, idealMax: 1800, tooHigh: 5000 });
    expect(idahoRoutes.find((route) => route.id === 'boise-river-troutdale-willow')?.gaugeSource.siteId).toBe('13185000');
    expect(idahoRoutes.find((route) => route.id === 'boise-river-troutdale-willow')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'deadwood-river-julie-creek-deadwood-campground')?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 645, idealMin: 645 });
    expect(idahoRoutes.find((route) => route.id === 'deadwood-river-julie-creek-deadwood-campground')?.gaugeSource).toMatchObject({ siteId: '13236500', kind: 'direct' });
    expect(idahoRoutes.find((route) => route.id === 'deadwood-river-julie-creek-deadwood-campground')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'selway-paradise-selway-falls')?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 700, idealMin: 700, idealMax: 35000, tooHigh: 35000 });
    expect(idahoRoutes.find((route) => route.id === 'selway-paradise-selway-falls')?.gaugeSource).toMatchObject({ siteId: '13336500', kind: 'direct' });
    expect(idahoRoutes.find((route) => route.id === 'selway-paradise-selway-falls')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'lochsa-split-creek-lowell')?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 2000, idealMin: 2000, idealMax: 4000, tooHigh: 4000 });
    expect(idahoRoutes.find((route) => route.id === 'lochsa-split-creek-lowell')?.gaugeSource).toMatchObject({ siteId: '13337000', kind: 'direct' });
    expect(idahoRoutes.find((route) => route.id === 'lochsa-split-creek-lowell')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'kelly-creek-moose-kelly-forks')?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 3000, idealMin: 3000 });
    expect(idahoRoutes.find((route) => route.id === 'kelly-creek-moose-kelly-forks')?.gaugeSource).toMatchObject({ siteId: '13340600', kind: 'proxy' });
    expect(idahoRoutes.find((route) => route.id === 'kelly-creek-moose-kelly-forks')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-hidden-kelly')?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 3800, idealMin: 4100, idealMax: 4500 });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-hidden-kelly')?.gaugeSource).toMatchObject({ siteId: '13340600', kind: 'proxy' });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-hidden-kelly')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-weitas-washington')?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 2500, idealMin: 2500, idealMax: 16000, tooHigh: 16000 });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-weitas-washington')?.gaugeSource).toMatchObject({ siteId: '13340600', kind: 'proxy' });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-weitas-washington')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-washington-quartz')?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 2500, idealMin: 2500, idealMax: 16000, tooHigh: 16000 });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-washington-quartz')?.gaugeSource).toMatchObject({ siteId: '13340600', kind: 'proxy' });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-washington-quartz')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'salmon-river-sunbeam-torreys-hole')?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 600, idealMin: 1800, idealMax: 3200, tooHigh: 6000 });
    expect(idahoRoutes.find((route) => route.id === 'salmon-river-sunbeam-torreys-hole')?.gaugeSource).toMatchObject({ siteId: '13296500', kind: 'direct' });
    expect(idahoRoutes.find((route) => route.id === 'salmon-river-sunbeam-torreys-hole')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'teton-river-dam-site-teton-forks')?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 500, idealMin: 500 });
    expect(idahoRoutes.find((route) => route.id === 'teton-river-dam-site-teton-forks')?.gaugeSource).toMatchObject({ siteId: '13055000', kind: 'proxy' });
    expect(idahoRoutes.find((route) => route.id === 'teton-river-dam-site-teton-forks')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'big-wood-river-rotary-broadway')?.gaugeSource).toMatchObject({ siteId: '13135500', kind: 'direct' });
    expect(idahoRoutes.find((route) => route.id === 'big-wood-river-rotary-broadway')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'crooked-fork-highway-12-white-sands')?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 5500, idealMin: 8000, idealMax: 15000 });
    expect(idahoRoutes.find((route) => route.id === 'crooked-fork-highway-12-white-sands')?.gaugeSource).toMatchObject({ siteId: '13337000', kind: 'proxy' });
    expect(idahoRoutes.find((route) => route.id === 'crooked-fork-highway-12-white-sands')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'big-creek-st-joe-end-road-bridge')?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 5000, idealMin: 5000 });
    expect(idahoRoutes.find((route) => route.id === 'big-creek-st-joe-end-road-bridge')?.gaugeSource).toMatchObject({ siteId: '12414500', kind: 'proxy' });
    expect(idahoRoutes.find((route) => route.id === 'big-creek-st-joe-end-road-bridge')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'marsh-creek-highway-21-dagger-falls')?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 2.5, idealMin: 2.5, idealMax: 3.5, tooHigh: 4.5 });
    expect(idahoRoutes.find((route) => route.id === 'marsh-creek-highway-21-dagger-falls')?.gaugeSource).toMatchObject({ siteId: '13309220', kind: 'proxy', metric: 'gage_height_ft', unit: 'ft' });
    expect(idahoRoutes.find((route) => route.id === 'marsh-creek-highway-21-dagger-falls')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'little-north-fork-clearwater-headwaters-reservoir')?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 600, idealMin: 600 });
    expect(idahoRoutes.find((route) => route.id === 'little-north-fork-clearwater-headwaters-reservoir')?.gaugeSource).toMatchObject({ siteId: '13340600', kind: 'proxy' });
    expect(idahoRoutes.find((route) => route.id === 'little-north-fork-clearwater-headwaters-reservoir')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'little-salmon-smoky-boulder-hazard')?.profile).toMatchObject({ tooLow: 500, idealMin: 1100, idealMax: 1300, tooHigh: 3000 });
    expect(idahoRoutes.find((route) => route.id === 'little-salmon-smoky-boulder-hazard')?.gaugeSource.siteId).toBe('13316500');
    expect(idahoRoutes.find((route) => route.id === 'little-salmon-smoky-boulder-hazard')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'little-salmon-hazard-creek-riggins')?.profile).toMatchObject({ tooLow: 500, idealMin: 1100, idealMax: 1300, tooHigh: 3000 });
    expect(idahoRoutes.find((route) => route.id === 'little-salmon-hazard-creek-riggins')?.gaugeSource.siteId).toBe('13316500');
    expect(idahoRoutes.find((route) => route.id === 'little-salmon-hazard-creek-riggins')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'johnson-creek-yellow-pine-airport-gauge')?.profile).toMatchObject({ tooLow: 450, idealMin: 550, idealMax: 650, tooHigh: 1500 });
    expect(idahoRoutes.find((route) => route.id === 'johnson-creek-yellow-pine-airport-gauge')?.gaugeSource.siteId).toBe('13313000');
    expect(idahoRoutes.find((route) => route.id === 'johnson-creek-yellow-pine-airport-gauge')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'east-fork-south-fork-salmon-vibika-johnson')?.profile).toMatchObject({ tooLow: 250, idealMin: 250, idealMax: 1500, tooHigh: 1500 });
    expect(idahoRoutes.find((route) => route.id === 'east-fork-south-fork-salmon-vibika-johnson')?.gaugeSource.siteId).toBe('13313000');
    expect(idahoRoutes.find((route) => route.id === 'east-fork-south-fork-salmon-vibika-johnson')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'east-fork-south-fork-salmon-johnson-indian-point')?.profile).toMatchObject({ tooLow: 300, idealMin: 300, idealMax: 1000, tooHigh: 1000 });
    expect(idahoRoutes.find((route) => route.id === 'east-fork-south-fork-salmon-johnson-indian-point')?.gaugeSource.siteId).toBe('13313000');
    expect(idahoRoutes.find((route) => route.id === 'east-fork-south-fork-salmon-johnson-indian-point')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'teton-river-highway-33-spring-hollow')?.profile).toMatchObject({ tooLow: 300, idealMin: 300, idealMax: 2000, tooHigh: 2000 });
    expect(idahoRoutes.find((route) => route.id === 'teton-river-highway-33-spring-hollow')?.gaugeSource.siteId).toBe('13052200');
    expect(idahoRoutes.find((route) => route.id === 'teton-river-highway-33-spring-hollow')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'henrys-fork-upper-coffee-pot-mccrea')?.profile).toMatchObject({ tooLow: 1000, idealMin: 1000, idealMax: 2000, tooHigh: 2000 });
    expect(idahoRoutes.find((route) => route.id === 'henrys-fork-upper-coffee-pot-mccrea')?.gaugeSource.siteId).toBe('13042500');
    expect(idahoRoutes.find((route) => route.id === 'henrys-fork-upper-coffee-pot-mccrea')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'henrys-fork-box-canyon-last-chance')?.profile).toMatchObject({ tooLow: 1000, idealMin: 1000, idealMax: 2000, tooHigh: 2000 });
    expect(idahoRoutes.find((route) => route.id === 'henrys-fork-box-canyon-last-chance')?.gaugeSource.siteId).toBe('13042500');
    expect(idahoRoutes.find((route) => route.id === 'henrys-fork-box-canyon-last-chance')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'middle-fork-payette-boiling-springs-trail-creek')?.profile).toMatchObject({ tooLow: 450, idealMin: 750, idealMax: 1330 });
    expect(idahoRoutes.find((route) => route.id === 'middle-fork-payette-boiling-springs-trail-creek')?.gaugeSource.siteId).toBe('13237920');
    expect(idahoRoutes.find((route) => route.id === 'middle-fork-payette-boiling-springs-trail-creek')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'middle-fork-payette-hardscrabble-lightning-creek')?.profile).toMatchObject({ tooLow: 400, idealMin: 800, idealMax: 1500 });
    expect(idahoRoutes.find((route) => route.id === 'middle-fork-payette-hardscrabble-lightning-creek')?.gaugeSource.siteId).toBe('13237920');
    expect(idahoRoutes.find((route) => route.id === 'middle-fork-payette-hardscrabble-lightning-creek')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'north-fork-payette-rotary-sheep-bridge')?.profile).toMatchObject({ tooLow: 800, idealMin: 1000, idealMax: 3500 });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-payette-rotary-sheep-bridge')?.gaugeSource.siteId).toBe('13239000');
    expect(idahoRoutes.find((route) => route.id === 'north-fork-payette-rotary-sheep-bridge')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'north-fork-payette-sheep-smylie-lane')?.profile).toMatchObject({ tooLow: 200, idealMin: 200 });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-payette-sheep-smylie-lane')?.gaugeSource.siteId).toBe('13239000');
    expect(idahoRoutes.find((route) => route.id === 'north-fork-payette-sheep-smylie-lane')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'upper-lochsa-white-pine-wilderness-gateway')?.profile).toMatchObject({ tooLow: 2000, idealMin: 3000, idealMax: 5000, tooHigh: 8000 });
    expect(idahoRoutes.find((route) => route.id === 'upper-lochsa-white-pine-wilderness-gateway')?.gaugeSource.siteId).toBe('13337000');
    expect(idahoRoutes.find((route) => route.id === 'upper-lochsa-white-pine-wilderness-gateway')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'payette-river-banks-beehive-bend')?.profile).toMatchObject({ tooLow: 800, idealMin: 2000, idealMax: 10000, tooHigh: 12000 });
    expect(idahoRoutes.find((route) => route.id === 'payette-river-beehive-bend-horseshoe-dam')?.profile).toMatchObject({ tooLow: 1200, idealMin: 2000, idealMax: 10000, tooHigh: 15000 });
    expect(idahoRoutes.find((route) => route.id === 'payette-river-beehive-bend-horseshoe-dam')?.gaugeSource.siteId).toBe('13247500');
    expect(idahoRoutes.find((route) => route.id === 'payette-river-beehive-bend-horseshoe-dam')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'boise-river-barber-willow-lane')?.profile).toMatchObject({ tooLow: 1500, idealMin: 1500, idealMax: 3000, tooHigh: 3000 });
    expect(idahoRoutes.find((route) => route.id === 'boise-river-barber-willow-lane')?.gaugeSource.siteId).toBe('13206000');
    expect(idahoRoutes.find((route) => route.id === 'boise-river-barber-willow-lane')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'boise-river-barber-ann-morrison')?.profile).toMatchObject({ tooLow: 500, idealMin: 500, idealMax: 1500, tooHigh: 1500 });
    expect(idahoRoutes.find((route) => route.id === 'salmon-river-bayhorse-challis-bridge')?.gaugeSource.siteId).toBe('13302500');
    expect(idahoRoutes.find((route) => route.id === 'salmon-river-north-fork-corn-creek')?.profile).toMatchObject({ tooLow: 600, idealMin: 1500, idealMax: 4000, tooHigh: 8000 });
    expect(idahoRoutes.find((route) => route.id === 'salmon-river-north-fork-corn-creek')?.gaugeSource.siteId).toBe('13302500');
    expect(idahoRoutes.find((route) => route.id === 'salmon-river-north-fork-corn-creek')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'salmon-river-carey-creek-riggins')?.profile).toMatchObject({ tooLow: 1000, idealMin: 3000, idealMax: 30000, tooHigh: 100000 });
    expect(idahoRoutes.find((route) => route.id === 'salmon-river-carey-creek-riggins')?.gaugeSource.siteId).toBe('13317000');
    expect(idahoRoutes.find((route) => route.id === 'salmon-river-carey-creek-riggins')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'lower-salmon-lucile-hammer-creek')?.profile).toMatchObject({ tooLow: 3000, idealMin: 8000, idealMax: 12000, tooHigh: 20000 });
    expect(idahoRoutes.find((route) => route.id === 'lower-salmon-hammer-heller-bar')?.profile).toMatchObject({ tooLow: 3000, idealMin: 8000, idealMax: 12000, tooHigh: 20000 });
    expect(idahoRoutes.find((route) => route.id === 'south-fork-snake-conant-byington')?.logistics?.campingClassification).toBe('on_route_campsite');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-snake-byington-heise')?.safetyProfile?.hazards).toContain('dam');
    expect(idahoRoutes.find((route) => route.id === 'boise-river-barber-ann-morrison')?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(idahoRoutes.find((route) => route.id === 'st-joe-river-spruce-tree-turner-flat')?.routeType).toBe('whitewater');
    expect(idahoRoutes.find((route) => route.id === 'st-joe-river-skookum-canyon')?.profile).toMatchObject({ tooLow: 500, idealMin: 500, idealMax: 1500 });
    expect(idahoRoutes.find((route) => route.id === 'st-joe-river-skookum-canyon')?.gaugeSource.siteId).toBe('12414500');
    expect(idahoRoutes.find((route) => route.id === 'st-joe-river-skookum-canyon')?.gaugeSource.kind).toBe('proxy');
    expect(idahoRoutes.find((route) => route.id === 'st-joe-river-skookum-canyon')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'slate-creek-franklin-mine-st-joe')?.profile).toMatchObject({ tooLow: 4000, idealMin: 4000 });
    expect(idahoRoutes.find((route) => route.id === 'slate-creek-franklin-mine-st-joe')?.gaugeSource.siteId).toBe('12414500');
    expect(idahoRoutes.find((route) => route.id === 'slate-creek-franklin-mine-st-joe')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-goat-creek-poverty-flat')?.profile).toMatchObject({ tooLow: 3, idealMin: 3, idealMax: 4, tooHigh: 5 });
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-goat-creek-poverty-flat')?.gaugeSource.siteId).toBe('13310700');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-goat-creek-poverty-flat')?.gaugeSource.metric).toBe('gage_height_ft');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-goat-creek-poverty-flat')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-poverty-flat-east-fork')?.profile).toMatchObject({ tooLow: 200, idealMin: 200, idealMax: 6000, tooHigh: 6000 });
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-poverty-flat-east-fork')?.gaugeSource.siteId).toBe('13310700');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-poverty-flat-east-fork')?.gaugeSource.kind).toBe('direct');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-poverty-flat-east-fork')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-secesh-confluence-vinegar')?.profile).toMatchObject({ tooLow: 2, idealMin: 3.2 });
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-secesh-confluence-vinegar')?.gaugeSource.siteId).toBe('13310700');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-secesh-confluence-vinegar')?.gaugeSource.metric).toBe('gage_height_ft');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-salmon-secesh-confluence-vinegar')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-boise-anderson-danskin')?.profile).toMatchObject({ tooLow: 600, idealMin: 600, idealMax: 2000, tooHigh: 2000 });
    expect(idahoRoutes.find((route) => route.id === 'south-fork-boise-anderson-danskin')?.gaugeSource.siteId).toBe('13190500');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-boise-anderson-danskin')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'lolo-creek-lolo-road-greer')?.profile).toMatchObject({ tooLow: 400, idealMin: 800, idealMax: 1000 });
    expect(idahoRoutes.find((route) => route.id === 'lolo-creek-lolo-road-greer')?.gaugeSource.siteId).toBe('13339500');
    expect(idahoRoutes.find((route) => route.id === 'lolo-creek-lolo-road-greer')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-clearwater-golden-canyon')?.profile).toMatchObject({ tooLow: 600, idealMin: 1000, idealMax: 2000 });
    expect(idahoRoutes.find((route) => route.id === 'south-fork-clearwater-golden-canyon')?.gaugeSource.siteId).toBe('13338500');
    expect(idahoRoutes.find((route) => route.id === 'south-fork-clearwater-golden-canyon')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'moyie-river-meadow-creek-reservoir')?.profile).toMatchObject({ tooLow: 500, idealMin: 3000, idealMax: 5000, tooHigh: 5000 });
    expect(idahoRoutes.find((route) => route.id === 'moyie-river-meadow-creek-reservoir')?.gaugeSource.siteId).toBe('12306500');
    expect(idahoRoutes.find((route) => route.id === 'moyie-river-meadow-creek-reservoir')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'camas-creek-blaine-moonstone')?.profile).toMatchObject({ tooLow: 500, idealMin: 500, idealMax: 1800 });
    expect(idahoRoutes.find((route) => route.id === 'camas-creek-blaine-moonstone')?.gaugeSource.siteId).toBe('13141500');
    expect(idahoRoutes.find((route) => route.id === 'camas-creek-blaine-moonstone')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'mores-creek-big-gulch-robie')?.profile).toMatchObject({ tooLow: 600, idealMin: 600, idealMax: 1000 });
    expect(idahoRoutes.find((route) => route.id === 'mores-creek-big-gulch-robie')?.gaugeSource.siteId).toBe('13200000');
    expect(idahoRoutes.find((route) => route.id === 'mores-creek-big-gulch-robie')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'potlatch-river-little-boulder-cedar')?.profile).toMatchObject({ tooLow: 300, idealMin: 325, idealMax: 1000 });
    expect(idahoRoutes.find((route) => route.id === 'potlatch-river-little-boulder-cedar')?.gaugeSource.siteId).toBe('13341570');
    expect(idahoRoutes.find((route) => route.id === 'potlatch-river-little-boulder-cedar')?.gaugeSource.kind).toBe('proxy');
    expect(idahoRoutes.find((route) => route.id === 'potlatch-river-little-boulder-cedar')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'boundary-creek-canadian-border-kootenai')?.profile).toMatchObject({ tooLow: 400, idealMin: 400, idealMax: 600, tooHigh: 600 });
    expect(idahoRoutes.find((route) => route.id === 'boundary-creek-canadian-border-kootenai')?.gaugeSource.siteId).toBe('12321500');
    expect(idahoRoutes.find((route) => route.id === 'boundary-creek-canadian-border-kootenai')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'smith-creek-bridge-smith-falls')?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 100, idealMin: 200, idealMax: 300 });
    expect(idahoRoutes.find((route) => route.id === 'smith-creek-bridge-smith-falls')?.gaugeSource).toMatchObject({ siteId: '12321500', kind: 'proxy' });
    expect(idahoRoutes.find((route) => route.id === 'smith-creek-bridge-smith-falls')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'st-maries-river-mashburn-st-joe')?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 600, idealMin: 1000, idealMax: 2000, tooHigh: 3000 });
    expect(idahoRoutes.find((route) => route.id === 'st-maries-river-mashburn-st-joe')?.gaugeSource).toMatchObject({ siteId: '12414900', kind: 'direct' });
    expect(idahoRoutes.find((route) => route.id === 'st-maries-river-mashburn-st-joe')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'north-fork-st-joe-loop-creek-confluence')?.profile).toMatchObject({ tooLow: 2500, idealMin: 4000, idealMax: 10000 });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-st-joe-loop-creek-confluence')?.sourceLinks.some((link) => link.url === 'https://www.northidahorivers.com/St_Joe_North_Fork.htm')).toBe(true);
    expect(idahoRoutes.find((route) => route.id === 'st-joe-spruce-tree-gold-creek')?.profile).toMatchObject({ tooLow: 1500, idealMin: 1500, idealMax: 4000, tooHigh: 25000 });
    expect(idahoRoutes.find((route) => route.id === 'st-joe-spruce-tree-gold-creek')?.gaugeSource.siteId).toBe('12414500');
    expect(idahoRoutes.find((route) => route.id === 'st-joe-spruce-tree-gold-creek')?.gaugeSource.kind).toBe('proxy');
    expect(idahoRoutes.find((route) => route.id === 'st-joe-spruce-tree-gold-creek')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'marble-creek-camp-3-st-joe')?.profile).toMatchObject({ tooLow: 3500, idealMin: 4000 });
    expect(idahoRoutes.find((route) => route.id === 'marble-creek-camp-3-st-joe')?.gaugeSource.siteId).toBe('12414500');
    expect(idahoRoutes.find((route) => route.id === 'marble-creek-camp-3-st-joe')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'st-joe-heller-creek-spruce-tree')?.profile).toMatchObject({ tooLow: 2.5, idealMin: 3, idealMax: 3.5, tooHigh: 4 });
    expect(idahoRoutes.find((route) => route.id === 'st-joe-heller-creek-spruce-tree')?.gaugeSource.siteId).toBe('12413875');
    expect(idahoRoutes.find((route) => route.id === 'st-joe-heller-creek-spruce-tree')?.gaugeSource.metric).toBe('gage_height_ft');
    expect(idahoRoutes.find((route) => route.id === 'st-joe-heller-creek-spruce-tree')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'lightning-creek-east-fork-clark-fork')?.profile).toMatchObject({ tooLow: 900, idealMin: 900 });
    expect(idahoRoutes.find((route) => route.id === 'lightning-creek-east-fork-clark-fork')?.gaugeSource.siteId).toBe('12392155');
    expect(idahoRoutes.find((route) => route.id === 'lightning-creek-east-fork-clark-fork')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-black-canyon')?.profile).toMatchObject({ tooLow: 3800, idealMin: 4100, idealMax: 4500 });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-black-canyon')?.gaugeSource.siteId).toBe('13340600');
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-black-canyon')?.gaugeSource.kind).toBe('proxy');
    expect(idahoRoutes.find((route) => route.id === 'north-fork-clearwater-black-canyon')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'henrys-lake-south-shore-loop')?.gaugeSource.metric).toBe('gage_height_ft');
    expect(idahoRoutes.find((route) => route.id === 'bruneau-indian-hot-springs-bruneau')?.profile).toMatchObject({ tooLow: 700, idealMin: 700, idealMax: 2500, tooHigh: 2500 });
    expect(idahoRoutes.find((route) => route.id === 'jarbidge-river-murphy-bruneau')?.profile).toMatchObject({ tooLow: 700, idealMin: 900, idealMax: 1300, tooHigh: 2600 });
    expect(idahoRoutes.find((route) => route.id === 'snake-river-hells-canyon-dam-pittsburg')?.profile).toMatchObject({ tooLow: 7000, idealMin: 7000, idealMax: 80000, tooHigh: 80000 });
    expect(idahoRoutes.find((route) => route.id === 'snake-river-pittsburg-heller-bar')?.profile).toMatchObject({ tooLow: 6000, idealMin: 20000, idealMax: 40000, tooHigh: 80000 });
    expect(idahoRoutes.find((route) => route.id === 'priest-river-outlet-dickensheet')?.profile).toMatchObject({ tooLow: 900, idealMin: 1200, idealMax: 1600, tooHigh: 4500 });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-payette-smiths-ferry-banks')?.profile).toMatchObject({ tooLow: 750, idealMin: 1400, idealMax: 1600, tooHigh: 3000 });
    expect(idahoRoutes.find((route) => route.id === 'boise-river-troutdale-badger')?.profile).toMatchObject({ tooLow: 500, idealMin: 1200, idealMax: 1800, tooHigh: 5000 });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-boise-barber-flat-troutdale')?.profile).toMatchObject({ tooLow: 600, idealMin: 1000, idealMax: 2000 });
    expect(idahoRoutes.find((route) => route.id === 'north-fork-boise-barber-flat-troutdale')?.gaugeSource.kind).toBe('proxy');
    expect(idahoRoutes.find((route) => route.id === 'snake-river-milner-mile')?.profile).toMatchObject({ tooLow: 8000, idealMin: 11000, idealMax: 15000, tooHigh: 15000 });
    expect(idahoRoutes.find((route) => route.id === 'snake-river-milner-mile')?.gaugeSource.siteId).toBe('13087995');
    expect(idahoRoutes.find((route) => route.id === 'snake-river-lower-salmon-falls-bliss')?.profile).toMatchObject({ tooLow: 4000 });
    expect(idahoRoutes.find((route) => route.id === 'snake-river-lower-salmon-falls-bliss')?.gaugeSource.siteId).toBe('13135000');
    expect(idahoRoutes.find((route) => route.id === 'snake-river-auger-falls-park')?.profile).toMatchObject({ tooLow: 400, idealMin: 400, idealMax: 1000, tooHigh: 4000 });
    expect(idahoRoutes.find((route) => route.id === 'snake-river-auger-falls-park')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'teton-river-highway-33-spring-hollow')?.profile).toMatchObject({ tooLow: 300, idealMin: 300, idealMax: 2000, tooHigh: 2000 });
    expect(idahoRoutes.find((route) => route.id === 'teton-river-highway-33-spring-hollow')?.gaugeSource.siteId).toBe('13052200');
    expect(idahoRoutes.find((route) => route.id === 'teton-river-highway-33-spring-hollow')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'teton-river-lower-canyon')?.profile).toMatchObject({ tooLow: 500, idealMin: 500, idealMax: 2000 });
    expect(idahoRoutes.find((route) => route.id === 'teton-river-lower-canyon')?.gaugeSource.siteId).toBe('13055000');
    expect(idahoRoutes.find((route) => route.id === 'teton-river-lower-canyon')?.gaugeSource.kind).toBe('proxy');
    expect(idahoRoutes.find((route) => route.id === 'henrys-fork-hatchery-ford-upper-mesa')?.profile).toMatchObject({ tooLow: 600, idealMin: 1000, idealMax: 2200, tooHigh: 3000 });
    expect(idahoRoutes.find((route) => route.id === 'henrys-fork-hatchery-ford-upper-mesa')?.gaugeSource.siteId).toBe('13046000');
    expect(idahoRoutes.find((route) => route.id === 'henrys-fork-hatchery-ford-upper-mesa')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'blackfoot-river-wolverine-canyon')?.profile).toMatchObject({ tooLow: 450, idealMin: 450, idealMax: 900 });
    expect(idahoRoutes.find((route) => route.id === 'blackfoot-river-wolverine-canyon')?.gaugeSource.siteId).toBe('13066000');
    expect(idahoRoutes.find((route) => route.id === 'blackfoot-river-wolverine-canyon')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'blackfoot-river-government-dam-cutthroat')?.profile).toMatchObject({ tooLow: 100, idealMin: 200, idealMax: 800 });
    expect(idahoRoutes.find((route) => route.id === 'blackfoot-river-government-dam-cutthroat')?.gaugeSource.siteId).toBe('13066000');
    expect(idahoRoutes.find((route) => route.id === 'blackfoot-river-government-dam-cutthroat')?.gaugeSource.kind).toBe('proxy');
    expect(idahoRoutes.find((route) => route.id === 'blackfoot-river-cutthroat-trail-creek')?.profile).toMatchObject({ tooLow: 100, idealMin: 200, idealMax: 800 });
    expect(idahoRoutes.find((route) => route.id === 'blackfoot-river-cutthroat-trail-creek')?.gaugeSource.siteId).toBe('13066000');
    expect(idahoRoutes.find((route) => route.id === 'blackfoot-river-cutthroat-trail-creek')?.gaugeSource.kind).toBe('proxy');
    expect(idahoRoutes.find((route) => route.id === 'portneuf-river-lava-hot-springs-pvc')?.profile).toMatchObject({ tooLow: 300, idealMin: 400, idealMax: 700, tooHigh: 1000 });
    expect(idahoRoutes.find((route) => route.id === 'portneuf-river-lava-hot-springs-pvc')?.gaugeSource.siteId).toBe('13073000');
    expect(idahoRoutes.find((route) => route.id === 'portneuf-river-lava-hot-springs-pvc')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'bitch-creek-highway-32-teton')?.profile).toMatchObject({ tooLow: 1200, idealMin: 1500, idealMax: 2500, tooHigh: 4000 });
    expect(idahoRoutes.find((route) => route.id === 'bitch-creek-highway-32-teton')?.gaugeSource.siteId).toBe('13055000');
    expect(idahoRoutes.find((route) => route.id === 'bitch-creek-highway-32-teton')?.gaugeSource.kind).toBe('proxy');
    expect(idahoRoutes.find((route) => route.id === 'bitch-creek-highway-32-teton')?.scoreEligibility).toBe('planning');
    expect(idahoRoutes.find((route) => route.id === 'big-wood-river-chocolate-gulch-lake-creek')?.profile).toMatchObject({ tooLow: 400, idealMin: 400, idealMax: 800, tooHigh: 800 });
    expect(idahoRoutes.find((route) => route.id === 'big-wood-river-chocolate-gulch-lake-creek')?.gaugeSource.siteId).toBe('13135500');
    expect(idahoRoutes.find((route) => route.id === 'big-wood-river-chocolate-gulch-lake-creek')?.gaugeSource.kind).toBe('direct');
    expect(idahoRoutes.find((route) => route.id === 'big-wood-river-chocolate-gulch-lake-creek')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'big-wood-river-baker-north-fork')?.profile).toMatchObject({ tooLow: 400, idealMin: 400, idealMax: 800, tooHigh: 800 });
    expect(idahoRoutes.find((route) => route.id === 'big-wood-river-baker-north-fork')?.gaugeSource.siteId).toBe('13135500');
    expect(idahoRoutes.find((route) => route.id === 'big-wood-river-baker-north-fork')?.gaugeSource.kind).toBe('direct');
    expect(idahoRoutes.find((route) => route.id === 'big-wood-river-baker-north-fork')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'weiser-river-midvale-galloway')?.profile).toMatchObject({ tooLow: 1500, idealMin: 1500, idealMax: 2500, tooHigh: 5000 });
    expect(idahoRoutes.find((route) => route.id === 'weiser-river-midvale-galloway')?.gaugeSource.siteId).toBe('13266000');
    expect(idahoRoutes.find((route) => route.id === 'weiser-river-midvale-galloway')?.gaugeSource.kind).toBe('direct');
    expect(idahoRoutes.find((route) => route.id === 'weiser-river-midvale-galloway')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'warm-springs-creek-lodge-river-run')?.profile).toMatchObject({ tooLow: 300, idealMin: 300, idealMax: 400, tooHigh: 600 });
    expect(idahoRoutes.find((route) => route.id === 'warm-springs-creek-lodge-river-run')?.gaugeSource.siteId).toBe('13137000');
    expect(idahoRoutes.find((route) => route.id === 'warm-springs-creek-lodge-river-run')?.gaugeSource.kind).toBe('direct');
    expect(idahoRoutes.find((route) => route.id === 'warm-springs-creek-lodge-river-run')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'fall-river-concrete-ccc-kirkham')?.profile).toMatchObject({ tooLow: 650, idealMin: 750, idealMax: 1450 });
    expect(idahoRoutes.find((route) => route.id === 'fall-river-concrete-ccc-kirkham')?.gaugeSource.siteId).toBe('13047500');
    expect(idahoRoutes.find((route) => route.id === 'fall-river-cave-falls-concrete')?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 1500, idealMin: 1500 });
    expect(idahoRoutes.find((route) => route.id === 'fall-river-cave-falls-concrete')?.gaugeSource).toMatchObject({ siteId: '13047500', kind: 'direct' });
    expect(idahoRoutes.find((route) => route.id === 'fall-river-cave-falls-concrete')?.scoreEligibility).toBe('scored');
    expect(idahoRoutes.find((route) => route.id === 'salmon-river-stanley-sunbeam')?.profile).toMatchObject({ tooLow: 600, idealMin: 1800, idealMax: 3200, tooHigh: 6000 });
    expect(idahoRoutes.find((route) => route.id === 'middle-fork-salmon-boundary-cache-bar')?.profile).toMatchObject({ tooLow: 1000, idealMin: 3500, idealMax: 5500, tooHigh: 12000 });
    expect(idahoRoutes.find((route) => route.id === 'main-salmon-corn-creek-vinegar-carey')?.profile).toMatchObject({ tooLow: 4000, idealMin: 12000, idealMax: 28000, tooHigh: 35000 });
    expect(idahoRoutes.find((route) => route.id === 'south-fork-payette-staircase-deer-creek-banks')?.scoreEligibility).toBe('planning');
  });
});
