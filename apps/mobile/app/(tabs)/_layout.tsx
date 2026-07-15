import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { androidBottomInset } from '../../src/lib/safe-area';
import { colors } from '../../src/theme/tokens';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = androidBottomInset(insets.bottom, 12);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surfaceStrong,
          borderTopColor: colors.border,
          height: 62 + bottomInset,
          paddingTop: 6,
          paddingBottom: bottomInset + 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="kayaking" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="weekend"
        options={{
          title: 'Weekend',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-weekend-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dots-horizontal-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
