import type { RiverCamera } from '@paddletoday/api-contract';
import { useQuery } from '@tanstack/react-query';
import { useState, type MutableRefObject } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNearViewport } from '../hooks/use-near-viewport';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { apiClient } from '../api/client';
import { useFreshnessClock } from '../hooks/use-freshness-clock';
import { useOnlineStatus } from '../hooks/use-online-status';
import { openExternalUrl } from '../lib/external-links';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';
import { SectionCard } from './section-card';

// The detail ScrollView calls this without rerendering the entire screen on every scroll.
export function RiverCameraCard({ slug, siteName, viewportCheck }: {
  slug: string;
  siteName: string;
  viewportCheck: MutableRefObject<(() => void) | null>;
}) {
  const { anchor, nearViewport, checkViewport } = useNearViewport(viewportCheck);
  const online = useOnlineStatus();
  const query = useQuery({
    queryKey: ['river-cameras', slug],
    queryFn: ({ signal }) => apiClient.getRiverCameras(slug, { signal }),
    enabled: nearViewport && online,
    retry: false,
    staleTime: 5 * 60_000,
    refetchInterval: nearViewport && online ? 5 * 60_000 : false,
  });
  const cameras = query.data?.cameras ?? [];
  return <View ref={anchor} collapsable={false} onLayout={checkViewport}>
    {cameras.length ? <SectionCard title="River camera · USGS"
      subtitle={`${siteName}. This gauge view may be outside your paddling reach. Periodic images do not establish safe conditions.`}>
      {cameras.map(camera => <CameraFrame key={camera.imageUrl} camera={camera} online={online} />)}
    </SectionCard> : null}
  </View>;
}

function CameraFrame({ camera, online }: { camera: RiverCamera; online: boolean }) {
  const insets = useSafeAreaInsets();
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const now = useFreshnessClock();
  const older = now - Date.parse(camera.capturedAt) > 2 * 60 * 60_000;
  return <View style={styles.frame}>
    <Text style={styles.name}>{camera.name}</Text>
    {failed ? <Text style={styles.caption}>Image unavailable. Open USGS for the latest view.</Text> :
      <Pressable accessibilityRole="button" accessibilityLabel={`Enlarge river camera at ${camera.name}`}
        onPress={() => setExpanded(true)}>
        <Image source={{ uri: camera.imageUrl }} style={styles.image} resizeMode="contain"
          accessibilityLabel={`USGS camera at ${camera.name}`} onError={() => setFailed(true)} />
        <Text style={styles.caption}>Tap image to enlarge</Text>
      </Pressable>}
    <Text style={styles.caption}>{!online ? 'Offline · ' : ''}{older ? 'Older image · ' : ''}Captured {new Date(camera.capturedAt).toLocaleString()}</Text>
    <AppButton label="USGS images & timelapse" variant="secondary" onPress={() => void openExternalUrl(camera.sourceUrl)} />
    <Modal visible={expanded} onRequestClose={() => setExpanded(false)} animationType="fade">
      <View style={[styles.expanded, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.md }]}>
        <AppButton label="Close image" variant="secondary" onPress={() => setExpanded(false)} />
        <Image source={{ uri: camera.imageUrl }} style={styles.expandedImage} resizeMode="contain"
          accessibilityLabel={`Enlarged USGS camera at ${camera.name}`} />
        <Text style={styles.caption}>Captured {new Date(camera.capturedAt).toLocaleString()} · USGS</Text>
      </View>
    </Modal>
  </View>;
}

const styles = StyleSheet.create({
  frame: { gap: spacing.sm },
  name: { ...typography.label, color: colors.text },
  caption: { ...typography.supporting, color: colors.textMuted },
  image: { width: '100%', aspectRatio: 1.5, borderRadius: radius.md, backgroundColor: colors.canvasMuted },
  expanded: { flex: 1, paddingHorizontal: spacing.md, gap: spacing.md, backgroundColor: colors.surfaceStrong },
  expandedImage: { flex: 1, width: '100%' },
});
