import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { routePhotoForRiver } from '../lib/route-photos';
import { colors, radius, spacing } from '../theme/tokens';
import { RoutePhotoFallback } from './route-photo-fallback';

interface RoutePhotoCardProps {
  river: {
    slug: string;
    riverId?: string;
    name?: string;
    reach?: string;
  };
  height?: number;
  compact?: boolean;
  showCaption?: boolean;
  onContributePhotos: () => void;
}

export function RoutePhotoCard({
  river,
  height = 170,
  compact = false,
  showCaption = true,
  onContributePhotos,
}: RoutePhotoCardProps) {
  const { width: windowWidth } = useWindowDimensions();
  const narrowLayout = windowWidth < 360;
  const photo = routePhotoForRiver(river);
  const [failedUri, setFailedUri] = useState<string | null>(null);
  const unavailable = failedUri === photo.uri;
  const showFallback = photo.isPlaceholder || unavailable;

  return (
    <ImageBackground
      source={showFallback ? undefined : { uri: photo.uri }}
      onError={() => setFailedUri(photo.uri)}
      style={[styles.photo, showFallback ? { minHeight: height } : { height }, compact ? styles.photoCompact : null, showFallback ? styles.photoFallback : null]}
      imageStyle={styles.photoImage}
    >
      {showFallback ? <RoutePhotoFallback compact={compact} label={unavailable ? 'Photo unavailable' : 'No photo yet'} /> : <View style={styles.scrim} />}
      {!showFallback && photo.sourceKind === 'river' ? (
        <View style={[styles.placeholderBadge, compact ? styles.placeholderBadgeCompact : null]}>
          <MaterialCommunityIcons
            name="image"
            color={colors.surfaceStrong}
            size={compact ? 13 : 14}
          />
          <Text style={[styles.placeholderBadgeText, compact ? styles.placeholderBadgeTextCompact : null]}>
            River photo
          </Text>
        </View>
      ) : null}
      {!showFallback && !compact && showCaption ? (
        <View style={[styles.caption, narrowLayout ? styles.captionNarrow : null]}>
          <Text style={styles.captionKicker}>Route photos</Text>
          <Text style={styles.captionTitle} numberOfLines={narrowLayout ? 3 : 2}>
            {river.reach ?? river.name ?? 'Route photo'}
          </Text>
        </View>
      ) : null}
      <Pressable
        style={[styles.contributeButton, compact ? styles.contributeButtonCompact : null, showFallback ? styles.contributeButtonPlaceholder : null]}
        onPress={onContributePhotos}
        accessibilityRole="button"
        accessibilityLabel={`Add a photo of ${river.reach ?? river.name ?? 'this route'}`}
      >
        <MaterialCommunityIcons name="camera-plus" color={showFallback ? colors.accentDeep : colors.surfaceStrong} size={compact ? 17 : 18} />
        <Text style={[styles.contributeText, compact ? styles.contributeTextCompact : null, showFallback ? styles.contributeTextPlaceholder : null]}>
          Add a photo
        </Text>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  photo: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.canvasMuted,
    justifyContent: 'space-between',
  },
  photoCompact: {
    borderRadius: radius.md,
  },
  photoFallback: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  photoImage: {
    borderRadius: radius.lg,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 24, 29, 0.18)',
  },
  caption: {
    padding: spacing.md,
    paddingRight: 126,
  },
  captionNarrow: {
    paddingRight: spacing.md,
  },
  captionKicker: {
    color: colors.surfaceStrong,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  captionTitle: {
    color: colors.surfaceStrong,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.28)',
    textShadowRadius: 5,
  },
  placeholderBadge: {
    position: 'absolute',
    left: spacing.sm,
    bottom: spacing.sm,
    minHeight: 32,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(10, 24, 29, 0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.48)',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  placeholderBadgeCompact: {
    minHeight: 28,
    paddingHorizontal: 9,
  },
  placeholderBadgeText: {
    color: colors.surfaceStrong,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  placeholderBadgeTextCompact: {
    fontSize: 10,
  },
  contributeButton: {
    position: 'absolute',
    right: spacing.sm,
    bottom: spacing.sm,
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(10, 24, 29, 0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.48)',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contributeButtonCompact: {
    minHeight: 44,
    paddingHorizontal: 10,
  },
  contributeText: {
    flexShrink: 1,
    color: colors.surfaceStrong,
    fontSize: 12,
    fontWeight: '900',
  },
  contributeTextCompact: {
    fontSize: 11,
  },
  contributeButtonPlaceholder: { position: 'relative', right: 0, bottom: 0, marginRight: spacing.sm, marginVertical: spacing.sm, maxWidth: '55%', backgroundColor: colors.surfaceStrong, borderColor: colors.border },
  contributeTextPlaceholder: { color: colors.accentDeep, fontWeight: '600' },
});
