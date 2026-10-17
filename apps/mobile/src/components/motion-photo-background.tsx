import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Platform, StyleSheet, View, type ImageStyle, type StyleProp, type ViewStyle } from 'react-native';
import { useReducedMotion } from '../hooks/use-reduced-motion';

// Fade the loaded image alone: captions, fallbacks, and actions remain usable.
export function MotionPhotoBackground({ uri, onError, style, imageStyle, children }: {
  uri?: string;
  onError?: () => void;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  children?: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const opacity = useRef(new Animated.Value(1)).current;
  const loadedUri = useRef<string | undefined>(undefined);
  const activeUri = useRef(uri);
  useEffect(() => {
    activeUri.current = uri;
    opacity.stopAnimation();
    opacity.setValue(reducedMotion || loadedUri.current === uri ? 1 : 0);
    return () => opacity.stopAnimation();
  }, [opacity, reducedMotion, uri]);
  function onLoad() {
    if (activeUri.current !== uri) return;
    loadedUri.current = uri;
    opacity.stopAnimation();
    if (reducedMotion) { opacity.setValue(1); return; }
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1, duration: 240, useNativeDriver: Platform.OS !== 'web', isInteraction: false,
    }).start();
  }
  return <View style={style}>
    {uri ? <Animated.Image key={uri} source={{ uri }} resizeMode="cover" onLoad={onLoad} onError={onError}
      accessible={false} style={[StyleSheet.absoluteFill, imageStyle, { opacity }]} /> : null}
    {children}
  </View>;
}
