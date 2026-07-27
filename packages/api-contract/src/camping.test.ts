import { describe, expect, it } from 'vitest';
import {
  campingClassificationLabel,
  classifyCamping,
  hasCampingSupport,
  hasOvernightCampingSupport,
} from './camping';

describe('camping policy', () => {
  it('classifies route, endpoint, nearby, and no-camping prose', () => {
    expect(classifyCamping('No established camping documented for this segment.')).toBe('none');
    expect(classifyCamping('Watercraft campsites are listed along this reach.')).toBe('on_route_campsite');
    expect(classifyCamping('Bois Brule Campground is at the put-in.')).toBe('endpoint_campground');
    expect(classifyCamping('The nearby county park has campground facilities.')).toBe('nearby_basecamp');
    expect(classifyCamping('')).toBe('unknown');
  });

  it('separates any camping support from route-scale overnight support', () => {
    expect(hasCampingSupport('nearby_basecamp')).toBe(true);
    expect(hasOvernightCampingSupport('nearby_basecamp')).toBe(false);
    expect(hasOvernightCampingSupport('sandbar_or_gravel_bar')).toBe(true);
  });

  it('provides one compact display taxonomy', () => {
    expect(campingClassificationLabel('nearby_basecamp')).toBe('Camp nearby');
    expect(campingClassificationLabel('endpoint_campground')).toBe('Campground access');
    expect(campingClassificationLabel('sandbar_or_gravel_bar')).toBe('Sandbar camping');
    expect(campingClassificationLabel('on_route_campsite')).toBe('Overnight-friendly');
    expect(campingClassificationLabel('unknown')).toBe('No camping');
  });
});
