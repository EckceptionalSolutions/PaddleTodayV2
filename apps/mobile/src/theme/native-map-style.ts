import type { MapStyleElement } from 'react-native-maps';

// Google Maps needs an explicit palette; Apple Maps uses userInterfaceStyle.
export const darkMapStyle: MapStyleElement[] = [
  { elementType: 'geometry', stylers: [{ color: '#1C3028' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#B4C2B6' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#17231D' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#233E31' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#43574A' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#17231D' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#123B48' }] },
];
