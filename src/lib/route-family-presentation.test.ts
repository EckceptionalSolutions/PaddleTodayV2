import { describe, expect, it } from 'vitest';
import { listRoutePresentationFamiliesForState, routePresentationFamilies } from './route-family-presentation';

describe('route family presentation registry', () => {
  it('keeps presentation families separate from route records', () => {
    const slugs = routePresentationFamilies.flatMap((family) => family.routeSlugs);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(routePresentationFamilies.every((family) => family.routeSlugs.length > 1)).toBe(true);
  });

  it('exposes only complete families for a state', () => {
    const maryland = listRoutePresentationFamiliesForState('Maryland', [
      { slug: 'monocacy-river-rocky-ridge-devilbiss', reach: 'Rocky Ridge to Devilbiss' },
      { slug: 'monocacy-river-devilbiss-gambrill', reach: 'Devilbiss to Gambrill' },
      { slug: 'monocacy-river-gambrill-monocacy-ramp', reach: 'Gambrill to Monocacy ramp' },
    ]);
    expect(maryland).toHaveLength(1);
    expect(maryland[0]).toMatchObject({ id: 'md-monocacy-access-ladder', canonicalSlug: 'monocacy-river-rocky-ridge-devilbiss' });
    expect(maryland[0].routes).toHaveLength(3);
  });

  it('does not expose Maryland or Pennsylvania families for other states', () => {
    expect(listRoutePresentationFamiliesForState('Colorado', [{ slug: 'some-colorado-route', reach: 'A reach' }])).toEqual([]);
  });
});
