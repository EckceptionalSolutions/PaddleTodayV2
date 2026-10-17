import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Platform } from 'react-native';
import { useReducedMotion } from '../hooks/use-reduced-motion';

export function MotionChevron({ expanded, color, size = 20 }: {
  expanded: boolean;
  color: string;
  size?: number;
}) {
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(expanded ? 1 : 0)).current;
  useEffect(() => {
    progress.stopAnimation();
    const target = expanded ? 1 : 0;
    if (reducedMotion) { progress.setValue(target); return; }
    const animation = Animated.timing(progress, {
      toValue: target, duration: 180, easing: Easing.out(Easing.cubic),
      useNativeDriver: Platform.OS !== 'web', isInteraction: false,
    });
    animation.start();
    return () => animation.stop();
  }, [expanded, progress, reducedMotion]);
  return <Animated.View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants"
    style={{ transform: [{ rotate: progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>
    <MaterialCommunityIcons name="chevron-down" color={color} size={size} accessible={false} />
  </Animated.View>;
}
