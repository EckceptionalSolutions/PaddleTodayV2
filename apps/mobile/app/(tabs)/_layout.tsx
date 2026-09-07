import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/tokens';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom;
  const { fontScale } = useWindowDimensions();

  return (
    <Tabs
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surfaceStrong,
          borderTopColor: colors.border,
          height: 50 + Math.ceil(14 * fontScale) + bottomInset,
          paddingTop: 6,
          paddingBottom: Math.max(bottomInset, 4),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          lineHeight: 14,
          flexShrink: 0,
          fontWeight: '700',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarAccessibilityLabel: 'Today',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="kayaking" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarAccessibilityLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="weekend"
        options={{
          title: 'Weekend',
          tabBarAccessibilityLabel: 'Weekend',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-weekend-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved routes',
          tabBarAccessibilityLabel: 'Saved routes',
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarAccessibilityLabel: 'More',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dots-horizontal-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
