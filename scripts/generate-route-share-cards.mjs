import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', 'share', 'routes');
const WIDTH = 1200;
const HEIGHT = 630;

const cards = [
  {
    slug: 'minnehaha-creek-grays-bay-longfellow-lagoon',
    title: 'Minnehaha Creek',
    reach: "Gray's Bay to Longfellow Lagoon",
    source: 'public/gallery/minnehaha-creek-grays-bay-longfellow-lagoon/minnehaha-creek-oct-2017.jpg',
  },
  {
    slug: 'st-croix-river-interstate-osceola',
    title: 'St. Croix River',
    reach: 'Interstate State Park to Osceola',
    source: 'public/gallery/st-croix-river-fox-highway-70/bluffs-with-branches.jpg',
  },
  {
    slug: 'cannon-river-welch',
    title: 'Cannon River',
    reach: 'Cannon Falls to Welch',
    source: 'public/gallery/cannon-river-welch/cannon-welch.jpg',
  },
  {
    slug: 'rice-creek-peltier-to-long-lake',
    title: 'Rice Creek',
    reach: 'Peltier Lake to Long Lake',
    source: 'public/gallery/rice-creek-peltier-to-long-lake/rice-creek-1.jpg',
  },
  {
    slug: 'root-river-lanesboro-peterson',
    title: 'Root River',
    reach: 'Lanesboro to Peterson',
    source: 'public/gallery/root-river-lanesboro-peterson/root-near-peterson.jpg',
  },
  {
    slug: 'wisconsin-river-muscoda-blue-river',
    title: 'Wisconsin River',
    reach: 'Muscoda to Blue River Landing',
    source: 'public/gallery/wisconsin-river-muscoda-blue-river/wisconsin-river-muscoda-nara.jpg',
  },
  {
    slug: 'kickapoo-river-ontario-rockton',
    title: 'Kickapoo River',
    reach: 'Ontario to Rockton',
    source: 'public/gallery/kickapoo-river-ontario-rockton/kickapoo-river-valley.jpg',
  },
  {
    slug: 'namekagon-river-big-bend-trego',
    title: 'Namekagon River',
    reach: 'Big Bend Landing to Trego Town Park',
    source: 'public/gallery/namekagon-river-big-bend-trego/namekagon-mirror.jpg',
  },
  {
    slug: 'milwaukee-river-newburg-fredonia',
    title: 'Milwaukee River',
    reach: "Fireman's Park to Waubedonia Park",
    source: 'public/gallery/milwaukee-river-newburg-fredonia/milwaukee-river-january-2026.jpg',
  },
  {
    slug: 'kettle-river-lower-kettle-5-to-6',
    title: 'Kettle River',
    reach: '#5 trailer access to #6 trailer access',
    source: 'public/gallery/kettle-river-lower-kettle-5-to-6/kettle-banning-state-park.jpg',
  },
];

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function wrapText(value, maxChars) {
  const words = value.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function textLines(lines, x, y, size, weight, fill, lineHeight) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" font-family="Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${escapeXml(line)}</text>`
    )
    .join('\n');
}

function overlaySvg(card) {
  const titleLines = wrapText(card.title, 24).slice(0, 2);
  const reachLines = wrapText(card.reach, 42).slice(0, 2);

  return Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#071b25" stop-opacity="0.92"/>
      <stop offset="0.58" stop-color="#071b25" stop-opacity="0.54"/>
      <stop offset="1" stop-color="#071b25" stop-opacity="0.18"/>
    </linearGradient>
    <linearGradient id="bottom" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#071b25" stop-opacity="0"/>
      <stop offset="1" stop-color="#071b25" stop-opacity="0.48"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#shade)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bottom)"/>
  <text x="76" y="94" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="#bfe8f4" letter-spacing="1.4">PADDLE TODAY</text>
  ${textLines(titleLines, 76, 260, 76, 800, '#ffffff', 82)}
  ${textLines(reachLines, 80, 400, 38, 650, '#e7f6f9', 48)}
  <text x="80" y="548" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="650" fill="#ffffff">Live gauge, weather, access, and today's paddle call</text>
  <text x="80" y="588" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="600" fill="#bfe8f4">paddletoday.com</text>
</svg>`);
}

await fs.mkdir(OUT_DIR, { recursive: true });

for (const card of cards) {
  const input = path.join(ROOT, card.source);
  const output = path.join(OUT_DIR, `${card.slug}.jpg`);

  await fs.access(input);
  await sharp(input)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 86, mozjpeg: true })
    .composite([{ input: overlaySvg(card), blend: 'over' }])
    .toFile(output);

  console.log(`wrote ${path.relative(ROOT, output)}`);
}
