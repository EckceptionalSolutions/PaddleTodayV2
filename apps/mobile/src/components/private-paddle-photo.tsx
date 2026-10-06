import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import type { tripSession } from '../lib/trip-session';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';

export function PrivatePaddlePhoto({ repo, logId, id, height = 220 }: { repo: NonNullable<ReturnType<typeof tripSession>>; logId: string; id: string; height?: number }) {
  const [photo, setPhoto] = useState<{ repo: typeof repo; logId: string; id: string; uri?: string; error?: boolean } | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setPhoto(null);
    void repo.client.photo(logId, id).then(blob => new Promise<string>((resolve, reject) => {
      const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(blob);
    })).then(uri => { if (active) setPhoto({ repo, logId, id, uri }); }).catch(() => { if (active) setPhoto({ repo, logId, id, error: true }); });
    return () => { active = false; };
  }, [repo, logId, id, attempt]);
  const current = photo?.repo === repo && photo.logId === logId && photo.id === id ? photo : null;
  return current?.uri ? <Image source={{ uri: current.uri }} style={[styles.image, { height }]} accessibilityLabel="Photo from your paddle" onError={() => setPhoto({ repo, logId, id, error: true })} /> : <View style={[styles.placeholder, { minHeight: height }]}>
    {current?.error ? <><Text style={styles.copy}>This private photo couldn’t load. Try again when connected.</Text><AppButton label="Retry photo" variant="secondary" onPress={() => setAttempt(value => value + 1)} /></> : <><ActivityIndicator color={colors.accent} /><Text style={styles.copy}>Loading your photo…</Text></>}
  </View>;
}
const styles = StyleSheet.create({
  image: { width: '100%', borderRadius: radius.md },
  placeholder: { padding: spacing.md, gap: spacing.sm, justifyContent: 'center', alignItems: 'center', borderRadius: radius.md, backgroundColor: colors.canvasMuted },
  copy: { ...typography.supporting, color: colors.textMuted, textAlign: 'center' },
});
