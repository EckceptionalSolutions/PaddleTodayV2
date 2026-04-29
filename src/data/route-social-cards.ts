export interface RouteSocialCard {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const routeSocialCardsBySlug: Record<string, RouteSocialCard> = {
  'minnehaha-creek-grays-bay-longfellow-lagoon': {
    src: '/share/routes/minnehaha-creek-grays-bay-longfellow-lagoon.jpg',
    alt: 'Paddle Today share card for Minnehaha Creek from Gray\'s Bay to Longfellow Lagoon.',
    width: 1200,
    height: 630,
  },
  'st-croix-river-interstate-osceola': {
    src: '/share/routes/st-croix-river-interstate-osceola.jpg',
    alt: 'Paddle Today share card for the St. Croix River from Interstate State Park to Osceola.',
    width: 1200,
    height: 630,
  },
  'cannon-river-welch': {
    src: '/share/routes/cannon-river-welch.jpg',
    alt: 'Paddle Today share card for the Cannon River from Cannon Falls to Welch.',
    width: 1200,
    height: 630,
  },
  'rice-creek-peltier-to-long-lake': {
    src: '/share/routes/rice-creek-peltier-to-long-lake.jpg',
    alt: 'Paddle Today share card for Rice Creek from Peltier Lake to Long Lake.',
    width: 1200,
    height: 630,
  },
  'root-river-lanesboro-peterson': {
    src: '/share/routes/root-river-lanesboro-peterson.jpg',
    alt: 'Paddle Today share card for the Root River from Lanesboro to Peterson.',
    width: 1200,
    height: 630,
  },
  'wisconsin-river-muscoda-blue-river': {
    src: '/share/routes/wisconsin-river-muscoda-blue-river.jpg',
    alt: 'Paddle Today share card for the Wisconsin River from Muscoda to Blue River Landing.',
    width: 1200,
    height: 630,
  },
  'kickapoo-river-ontario-rockton': {
    src: '/share/routes/kickapoo-river-ontario-rockton.jpg',
    alt: 'Paddle Today share card for the Kickapoo River from Ontario to Rockton.',
    width: 1200,
    height: 630,
  },
  'namekagon-river-big-bend-trego': {
    src: '/share/routes/namekagon-river-big-bend-trego.jpg',
    alt: 'Paddle Today share card for the Namekagon River from Big Bend Landing to Trego Town Park.',
    width: 1200,
    height: 630,
  },
  'milwaukee-river-newburg-fredonia': {
    src: '/share/routes/milwaukee-river-newburg-fredonia.jpg',
    alt: 'Paddle Today share card for the Milwaukee River from Fireman\'s Park to Waubedonia Park.',
    width: 1200,
    height: 630,
  },
  'kettle-river-lower-kettle-5-to-6': {
    src: '/share/routes/kettle-river-lower-kettle-5-to-6.jpg',
    alt: 'Paddle Today share card for the Kettle River from access #5 to access #6.',
    width: 1200,
    height: 630,
  },
};

export function getRouteSocialCard(slug: string): RouteSocialCard | undefined {
  return routeSocialCardsBySlug[slug];
}
