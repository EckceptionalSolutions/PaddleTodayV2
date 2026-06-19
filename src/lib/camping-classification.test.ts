import { describe, expect, it } from 'vitest';
import { classifyCamping, hasCampingSupport, hasOvernightCampingSupport } from './camping-classification';

describe('classifyCamping', () => {
  it('keeps no-camping and unknown prose out of camping filters', () => {
    expect(classifyCamping('No established camping documented for this segment.')).toBe('none');
    expect(classifyCamping('Treat this as a day trip. Do not plan to camp at either endpoint.')).toBe('none');
    expect(classifyCamping('Treat this as a day route unless camping is separately confirmed.')).toBe('unknown');
    expect(classifyCamping('')).toBe('unknown');
  });

  it('separates overnight route support from nearby base-camp support', () => {
    expect(classifyCamping('Watercraft campsites are listed along this reach.')).toBe('on_route_campsite');
    expect(classifyCamping('Sandbar camping can work at low to moderate flows.')).toBe('sandbar_or_gravel_bar');
    expect(classifyCamping('This is a natural overnight-capable reach at suitable flows.')).toBe('overnight_capable');
    expect(classifyCamping('The nearby county park has campground facilities by reservation.')).toBe('nearby_basecamp');
    expect(classifyCamping('Bois Brule Campground is at the put-in.')).toBe('endpoint_campground');
  });

  it('only treats route-scale camping as overnight support', () => {
    expect(hasCampingSupport('nearby_basecamp')).toBe(true);
    expect(hasCampingSupport('endpoint_campground')).toBe(true);
    expect(hasOvernightCampingSupport('nearby_basecamp')).toBe(false);
    expect(hasOvernightCampingSupport('endpoint_campground')).toBe(false);
    expect(hasOvernightCampingSupport('on_route_campsite')).toBe(true);
    expect(hasOvernightCampingSupport('sandbar_or_gravel_bar')).toBe(true);
    expect(hasOvernightCampingSupport('overnight_capable')).toBe(true);
  });
});
