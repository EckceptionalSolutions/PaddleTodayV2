import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { useWindowDimensions, type View } from 'react-native';

export function useNearViewport(viewportCheck: MutableRefObject<(() => void) | null>) {
  const anchor = useRef<View>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const { height } = useWindowDimensions();
  const checkViewport = useCallback(() => {
    if (nearViewport) return;
    anchor.current?.measureInWindow((_x, y, _width, measuredHeight) => {
      if (y + measuredHeight >= -300 && y < height + 300) setNearViewport(true);
    });
  }, [height, nearViewport]);
  useEffect(() => {
    viewportCheck.current = checkViewport;
    checkViewport();
    return () => { viewportCheck.current = null; };
  }, [checkViewport, viewportCheck]);
  return { anchor, nearViewport, checkViewport };
}
