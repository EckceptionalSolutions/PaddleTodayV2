import type { River } from '../../lib/types';
import { buildStarterPlanningRoute } from './starter-planning';

const trailGuide = { label: 'Connecticut River Paddlers Trail access points', url: 'https://connecticutriverpaddlerstrail.org/?page_id=418', provider: 'local' as const };
const safetyGuide = { label: 'Connecticut River Paddlers Trail safety and etiquette', url: 'https://connecticutriverpaddlerstrail.org/?page_id=19', provider: 'local' as const };
const stateAccess = { label: 'New Hampshire public boat access rules', url: 'https://gc.nh.gov/rules/state_agencies/fis1600.html', provider: 'local' as const };
const gauge = { id: 'usgs-01144500', provider: 'usgs' as const, siteId: '01144500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Connecticut River at West Lebanon, NH', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-01144500/' };

const bedell = { name: 'Bedell Bridge State Park public boat ramp (water-entry edge)', latitude: 44.044893, longitude: -72.073982 };
const orford = { name: 'Orford Boat Landing public ramp (water-entry edge)', latitude: 43.902842, longitude: -72.146318 };
const wilson = { name: 'Wilson Landing public boat ramp (water-entry edge)', latitude: 43.741894, longitude: -72.244127 };
const ledyard = { name: 'Ledyard Canoe Club public launch (water-entry edge)', latitude: 43.706093, longitude: -72.297351 };
const eastWilder = { name: 'East Wilder public boat launch (water-entry edge)', latitude: 43.678626, longitude: -72.300998 };

const hazards = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'dam', 'private_banks'] as const;
const safetyNotes = [
  'Wear a properly fitted PFD and carry a whistle, spare paddle, communication, offline navigation and weather protection.',
  'The Connecticut River is broad and generally quiet in these reaches, but wind, cold water, fast rises, strainers and bridge or dam currents can change the risk quickly.',
  'Check the direct West Lebanon gauge, weather and any hydroelectric or access notices before launching. Stop and portage at every dam; never run an unscouted structure.',
  'Use only the named public ramps, respect the New Hampshire/Vermont boundary and private shoreline, and follow posted parking and overnight rules.'
];

function route(spec: { id: string; start: typeof bedell; end: typeof orford; miles: number; reach: string; summary: string; notes: string; }): River {
  return buildStarterPlanningRoute({
    id: spec.id, name: 'Connecticut River', riverId: 'connecticut-river-new-hampshire', state: 'New Hampshire', region: 'Upper Valley / Connecticut River',
    putIn: spec.start, takeOut: spec.end, miles: spec.miles, summary: spec.summary, difficulty: 'easy',
    difficultyNotes: 'The Paddlers Trail describes these access-bounded reaches as broad, quiet-water paddling with wind exposure and occasional dam or bridge-current hazards. This card remains planning-only until a route-specific flow band is established.',
    seasonMonths: [5, 6, 7, 8, 9, 10], seasonNotes: 'Late spring through fall is the practical paddling season; cold water, wind, thunderstorms and changing hydro operations require a launch-day check.',
    gauge, conditionsNote: `Planning only: ${spec.reach}. The Connecticut River Paddlers Trail documents the public ramps, river-mile sequence and camping network, but this pass does not transfer a numeric recreational cutoff to USGS ${gauge.siteId}.`,
    hazards: [...hazards], safetyNotes,
    logistics: { estimatedPaddleTime: `Allow ${spec.miles > 20 ? 'a full day' : '4–7 hours'} with wind, scouting and shuttle margin`, shuttle: 'Stage the downstream public ramp first, then drive to the upstream launch. Confirm parking, carry paths and any seasonal gate or fee before unloading.', permits: 'Confirm New Hampshire boating rules, town or state access rules and any hydroelectric or park notices before departure.', camping: 'The Paddlers Trail includes primitive camps and established campgrounds along the Connecticut River. Use only a current designated site or nearby campground; do not camp on an unapproved shoreline.', campingClassification: 'nearby_basecamp', accessCaveats: [spec.notes, 'The river forms the New Hampshire/Vermont boundary in this corridor; stay in the channel except for emergencies and respect private shoreline.', 'Verify current ramp, parking, overnight and road conditions before staging.'], watchFor: ['Direct USGS 01144500 discharge and wind', 'Cold water, strainers, bridges and fast rises', 'Dams, private banks and limited alternate exits'] },
    guide: trailGuide, sources: [safetyGuide, stateAccess], coordinateNote: 'Coordinates are taken from the Connecticut River Paddlers Trail Google Maps links for the named public ramps.', coordinateSourceUrl: trailGuide.url, reviewDate: '2026-09-13',
  });
}

export const newHampshireConnecticutRiverRoutes: River[] = [
  route({ id: 'connecticut-river-bedell-orford', start: bedell, end: orford, miles: 15, reach: 'Bedell Bridge State Park to Orford Boat Landing', summary: 'A quiet Upper Valley Connecticut River reach from the Bedell Bridge State Park ramp to the Orford public landing beside the Pastures campground.', notes: 'The Paddlers Trail lists both public ramps with ample or designated parking and identifies Orford as adjacent to a campground; verify current access and wind before departure.' }),
  route({ id: 'connecticut-river-orford-wilson', start: orford, end: wilson, miles: 14, reach: 'Orford Boat Landing to Wilson Landing', summary: 'A scenic Connecticut River day reach from Orford’s improved ramp to the Hanover Wilson Landing dock and ramp.', notes: 'The Paddlers Trail lists Orford and Wilson as public improved ramps with overnight parking allowances; confirm the long shuttle, wind exposure and current landing condition.' }),
  route({ id: 'connecticut-river-bedell-wilson', start: bedell, end: wilson, miles: 29, reach: 'Bedell Bridge State Park to Wilson Landing', summary: 'A longer staged Connecticut River itinerary joining Bedell Bridge, Orford and Wilson public access in the Upper Valley.', notes: 'Orford is the documented intermediate bailout and campground-adjacent access. Treat this as a long day itinerary, confirm daylight and wind margin, and do not assume informal shoreline camping.' }),
  route({ id: 'connecticut-river-wilson-ledyard', start: wilson, end: ledyard, miles: 4, reach: 'Wilson Landing to Ledyard Canoe Club', summary: 'A short Hanover-area Connecticut River reach from Wilson Landing to the public Ledyard Canoe Club launch below the Ledyard Bridge.', notes: 'The Paddlers Trail identifies both as public launches, but Ledyard has only two parking spaces and no overnight parking; arrange a precise shuttle and pay campus parking where required.' }),
  route({ id: 'connecticut-river-ledyard-east-wilder', start: ledyard, end: eastWilder, miles: 2, reach: 'Ledyard Canoe Club to East Wilder Boat Launch', summary: 'A compact Upper Valley Connecticut River reach from the public Ledyard launch to Lebanon’s East Wilder ramp.', notes: 'The Paddlers Trail lists Ledyard as public launch access with limited paid parking and East Wilder as a city-managed unimproved ramp. Confirm the carry, parking and downstream hydroelectric boundaries.' }),
];
