import { useCallback, useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';
import { useReducedMotion } from './use-reduced-motion';

export function usePressMotion(disabled = false) {
  const reducedMotion = useReducedMotion();
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (disabled || reducedMotion) { scale.stopAnimation(); scale.setValue(1); }
    return () => scale.stopAnimation();
  }, [disabled, reducedMotion, scale]);
  const onPressIn = useCallback(() => {
    if (disabled || reducedMotion) return;
    scale.stopAnimation();
    Animated.timing(scale, {
      toValue: 0.97, duration: 90, useNativeDriver: Platform.OS !== 'web', isInteraction: false,
    }).start();
  }, [disabled, reducedMotion, scale]);
  const onPressOut = useCallback(() => {
    scale.stopAnimation();
    if (disabled || reducedMotion) { scale.setValue(1); return; }
    Animated.spring(scale, {
      toValue: 1, stiffness: 360, damping: 22, mass: 0.6, overshootClamping: true,
      useNativeDriver: Platform.OS !== 'web', isInteraction: false,
    }).start();
  }, [disabled, reducedMotion, scale]);
  return { style: { transform: [{ scale }] }, onPressIn, onPressOut, reducedMotion };
}
