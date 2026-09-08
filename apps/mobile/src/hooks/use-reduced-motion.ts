import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

export function useReducedMotion() {
  // Avoid starting motion before the device preference has been read.
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    if (Platform.OS === 'web') {
      const query = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => setReduced(query.matches);
      update();
      query.addEventListener('change', update);
      return () => query.removeEventListener('change', update);
    }
    let active = true;
    let changed = false;
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', value => {
      changed = true;
      setReduced(value);
    });
    void AccessibilityInfo.isReduceMotionEnabled().then(value => {
      if (active && !changed) setReduced(value);
    }).catch(() => { /* Keep the conservative no-motion default. */ });
    return () => { active = false; subscription.remove(); };
  }, []);
  return reduced;
}
