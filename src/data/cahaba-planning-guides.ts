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
    title: 'Use the Moon River minimum for this trip only',
    reviewedOn: '2026-10-20',
    introduction: 'Choose the named trip before interpreting the Mountain Brook reading.',
    decisions: [
      { heading: 'Treat 100 cfs as a floor', text: 'The manager publishes a minimum, not an ideal range or high-water limit. The capped minimum-only score keeps that distinction.', source: cahabaSources.moon },
      { heading: 'Plan the approach and shoals', text: 'Allow for the carry and stepped entry at Moon River. Review the drops and shoals before committing to the 5.1-mile trip.', source: cahabaSources.moon },
      { heading: 'Finish at the improved landing', text: 'Use the documented Grants Mill access. Extending downstream changes the itinerary and needs a separate plan.', source: cahabaSources.moon },
    ],
  },
  'cahaba-river-grants-mill-old-overton': {
    title: 'Plan the shoals between Grants Mill and Old Overton',
    reviewedOn: '2026-10-20',
    introduction: 'This downstream trip has its own landing and low-water limitations.',
    decisions: [
      { heading: 'Expect a different low-water commitment', text: 'The 6.9-mile trip can become slow and shallow in summer. Seasonal guidance does not establish a numeric scoring range.', source: cahabaSources.grants },
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
      { heading: 'Keep the export hold in the plan', text: 'The old line passed the designated endpoint. The guide remains available with facility pins; a replacement trace needs review before GPX returns.', source: cahabaSources.map },
    ],
  },
};

export const cahabaHubGuide: PaddlePlanningGuide = {
  title: 'Choose a Cahaba trip before using the gauge',
  reviewedOn: '2026-10-20',
  introduction: 'Three adjacent trips have different shoal and landing decisions. Only Moon River has a documented minimum used for a capped score; the downstream choices remain unscored plans.',
  decisions: [
    { heading: 'Moon River–Grants Mill: minimum-only guidance', text: 'Use the trip-specific minimum and review the carry, shoals and improved finish.', source: cahabaSources.moon, route: { label: 'Read the Moon River guide', slug: 'cahaba-river-moon-grants-mill' } },
    { heading: 'Grants Mill–Old Overton: a separate shoal trip', text: 'Compare the shallow-water commitment and take-out. It does not inherit the upstream minimum.', source: cahabaSources.grants, route: { label: 'Read the Grants Mill guide', slug: 'cahaba-river-grants-mill-old-overton' } },
    { heading: 'Old Overton–280: changing current and a dam boundary', text: 'Identify the upstream landing and keep the route-line and GPX hold in mind.', source: cahabaSources.riverwalk, route: { label: 'Read the Highway 280 guide', slug: 'cahaba-river-old-overton-highway-280' } },
  ],
};
