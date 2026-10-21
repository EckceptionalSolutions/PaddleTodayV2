import type { PaddlePlanningGuide } from './priority-paddle-guides';

export const cahabaSources = {
  moon: { label: 'Cahaba Blueway Moon River trip', url: 'https://www.cahabablueway.org/moon-river/' },
  grants: { label: 'Cahaba Blueway Grants Mill trip', url: 'https://www.cahabablueway.org/grants-mill/' },
  riverwalk: { label: 'Cahaba Blueway Riverwalk–280 trip', url: 'https://www.cahabablueway.org/mountain-brook-cahaba-river-walk/' },
  highway: { label: 'Cahaba Blueway Highway 280 access', url: 'https://www.cahabablueway.org/hwy-280/' },
  map: { label: 'Cahaba Blueway access sequence and dam boundary', url: 'https://www.cahabablueway.org/resource_documents/pdf_maps/Grants-Mill-to-280.pdf' },
};

export const cahabaRouteGuides: Record<string, PaddlePlanningGuide> = {
  'cahaba-river-moon-grants-mill': {
    title: 'Water levels for Moon River to Grants Mill',
    reviewedOn: '2026-10-20',
    introduction: 'The Mountain Brook gauge helps plan this trip, but a reading above the minimum does not guarantee suitable conditions.',
    decisions: [
      { heading: '100 cfs is a minimum, not an ideal level', text: 'Cahaba Blueway lists 100 cfs as the minimum for this trip. It does not give a preferred range or an upper limit. Check current conditions even when the gauge is above 100 cfs.', source: cahabaSources.moon },
      { heading: 'Plan the approach and shoals', text: 'Allow for the carry and stepped entry at Moon River. Review the drops and shoals before committing to the 5.1-mile trip.', source: cahabaSources.moon },
      { heading: 'Finish at the improved landing', text: 'Use the documented Grants Mill access. Extending downstream changes the itinerary and needs a separate plan.', source: cahabaSources.moon },
    ],
  },
  'cahaba-river-grants-mill-old-overton': {
    title: 'Plan the shoals between Grants Mill and Old Overton',
    reviewedOn: '2026-10-20',
    introduction: 'This downstream trip has its own landing and low-water limitations.',
    decisions: [
      { heading: 'Expect shallow water in summer', text: 'This 6.9-mile trip can become slow and shallow in summer. The guide does not give a minimum or preferred water level for it.', source: cahabaSources.grants },
      { heading: 'Check the narrow shoal section', text: 'The guide identifies a significant shoal near the finish and warns about trees and submerged rocks. Review those conditions locally.', source: cahabaSources.grants },
      { heading: 'Choose the finish before staging', text: 'Old Overton is the planned take-out. Riverwalk is another 0.8 miles downstream; choosing it changes the shuttle and trip.', source: cahabaSources.grants },
    ],
  },
  'cahaba-river-old-overton-highway-280': {
    title: 'Keep the Highway 280 landing ahead of the dam',
    reviewedOn: '2026-10-20',
    introduction: 'Prepare for changing current and a take-out that cannot be missed.',
    decisions: [
      { heading: 'Separate the shoals from the slower water', text: 'The Riverwalk–280 description moves from shoals into water slowed by the dam. One gauge reading cannot establish local depth throughout.', source: cahabaSources.riverwalk },
      { heading: 'Identify the upstream landing', text: 'Use the manager’s Highway 280 access reference and inspect the actual landing. Vehicle access beneath a bridge is not a paddling route.', source: cahabaSources.highway },
      { heading: 'Use the landing markers; GPX is unavailable', text: 'The old map line went beyond the take-out toward the dam. We have removed the line and GPX download while we correct it. Use the access markers and the manager’s map to identify the landing upstream of the dam.', source: cahabaSources.map },
    ],
  },
};

export const cahabaHubGuide: PaddlePlanningGuide = {
  title: 'Choose your Cahaba trip',
  reviewedOn: '2026-10-20',
  introduction: 'These three trips have different shallow-water sections and take-outs. Moon River to Grants Mill has a published minimum water level and a daily score. The two downstream trips have planning information but no daily score.',
  decisions: [
    { heading: 'Moon River to Grants Mill', text: 'A 5.1-mile trip with a carry and stepped entry at Moon River. Cahaba Blueway lists a 100 cfs minimum at the Mountain Brook gauge, but no upper limit.', source: cahabaSources.moon, route: { label: 'Read the Moon River guide', slug: 'cahaba-river-moon-grants-mill' } },
    { heading: 'Grants Mill to Old Overton', text: 'A 6.9-mile trip that can become slow and shallow in summer. The Moon River minimum does not apply here; check local water levels and the shoal near the finish.', source: cahabaSources.grants, route: { label: 'Read the Grants Mill guide', slug: 'cahaba-river-grants-mill-old-overton' } },
    { heading: 'Old Overton to Highway 280', text: 'Identify the Highway 280 landing upstream of the dangerous dam before launch. Access markers are available; the route line and GPX download are being corrected.', source: cahabaSources.riverwalk, route: { label: 'Read the Highway 280 guide', slug: 'cahaba-river-old-overton-highway-280' } },
  ],
};
