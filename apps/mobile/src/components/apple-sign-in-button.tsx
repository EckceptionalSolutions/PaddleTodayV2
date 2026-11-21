import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export function AppleSignInButton({ busy = false, onPress, style }: { busy?: boolean; onPress: () => void; style?: StyleProp<ViewStyle> }) {
  if (Platform.OS !== 'ios') return null;
  return <View pointerEvents={busy ? 'none' : 'auto'} accessibilityState={{ disabled: busy, busy }} style={style}>
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={22}
      style={styles.button}
      onPress={() => { if (!busy) onPress(); }}
    />
  </View>;
}

const styles = StyleSheet.create({ button: { width: '100%', height: 52 } });
