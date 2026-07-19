import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { routePhotoForRiver } from '../lib/route-photos';
import { colors, radius, spacing } from '../theme/tokens';

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
  const photo = routePhotoForRiver(river);

  return (
    <ImageBackground
      source={{ uri: photo.uri }}
      style={[styles.photo, { height }, compact ? styles.photoCompact : null]}
      imageStyle={styles.photoImage}
    >
      <View style={styles.scrim} />
      {photo.isPlaceholder ? (
        <View style={[styles.placeholderBadge, compact ? styles.placeholderBadgeCompact : null]}>
          <MaterialCommunityIcons name="image-plus" color={colors.surfaceStrong} size={compact ? 13 : 14} />
          <Text style={[styles.placeholderBadgeText, compact ? styles.placeholderBadgeTextCompact : null]}>
            Needs route photo
          </Text>
        </View>
      ) : null}
      {!compact && showCaption ? (
        <View style={styles.caption}>
          <Text style={styles.captionKicker}>Route photos</Text>
          <Text style={styles.captionTitle} numberOfLines={2}>
            {river.reach ?? river.name ?? 'Route photo'}
          </Text>
        </View>
      ) : null}
      <Pressable
        style={[styles.contributeButton, compact ? styles.contributeButtonCompact : null]}
        onPress={onContributePhotos}
        accessibilityRole="button"
        accessibilityLabel={`Contribute photos for ${river.reach ?? river.name ?? 'this route'}`}
      >
        <MaterialCommunityIcons name="camera-plus" color={colors.surfaceStrong} size={compact ? 17 : 18} />
        <Text style={[styles.contributeText, compact ? styles.contributeTextCompact : null]}>
          Contribute Photos
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
    minHeight: 38,
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
    minHeight: 34,
    paddingHorizontal: 10,
  },
  contributeText: {
    color: colors.surfaceStrong,
    fontSize: 12,
    fontWeight: '900',
  },
  contributeTextCompact: {
    fontSize: 11,
  },
});
