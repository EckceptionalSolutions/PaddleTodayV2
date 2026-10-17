import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Easing, Platform, type ViewProps } from 'react-native';

// Stable route keys keep refreshes and save toggles from replaying entrances.
// Animate only the first four recommendations, and never wrap native maps.
export function MotionReveal({ children, reducedMotion, index = 0, replayKey, style, ...viewProps }: ViewProps & {
  children: ReactNode;
  reducedMotion: boolean;
  index?: number;
  replayKey?: string;
}) {
  const skip = reducedMotion || index >= 4;
  const progress = useRef(new Animated.Value(skip ? 1 : 0)).current;
  const played = useRef(false);
  const previousKey = useRef(replayKey);
  useEffect(() => {
    const changed = replayKey !== previousKey.current;
    previousKey.current = replayKey;
    if (skip) {
      played.current = true;
      progress.stopAnimation();
      progress.setValue(1);
      return;
    }
    if (played.current && !changed) return;
    played.current = true;
    // Message changes can replay without remounting their focused controls.
    if (changed) progress.setValue(0);
    const animation = Animated.timing(progress, {
      toValue: 1, duration: 280, delay: Math.max(0, Math.min(index, 3)) * 35,
      easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web', isInteraction: false,
    });
    animation.start();
    return () => { animation.stop(); progress.setValue(1); };
  }, [index, progress, replayKey, skip]);
  return <Animated.View {...viewProps} style={[style, {
    opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }),
    transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
  }]}>{children}</Animated.View>;
}
