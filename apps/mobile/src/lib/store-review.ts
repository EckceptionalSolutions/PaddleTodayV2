import Constants from 'expo-constants';
import * as StoreReview from 'expo-store-review';
import { Linking, Platform } from 'react-native';

const IOS_STORE_URL = 'https://apps.apple.com/app/id6769542734?action=write-review';
const ANDROID_STORE_WEB_URL =
  'https://play.google.com/store/apps/details?id=com.paddletoday.mobile&showAllReviews=true';
const ANDROID_STORE_APP_URL =
  'market://details?id=com.paddletoday.mobile&showAllReviews=true';

export type WebStoreDestination = 'apple' | 'google' | 'choose';

export function currentAppVersion() {
  return Constants.expoConfig?.version ?? '0.0.0';
}

export async function requestAutomaticStoreReview() {
  if (!(await StoreReview.isAvailableAsync())) {
    return false;
  }

  await StoreReview.requestReview();
  return true;
}

export async function openStoreReviewPage() {
  if (Platform.OS === 'android') {
    try {
      if (await Linking.canOpenURL(ANDROID_STORE_APP_URL)) {
        await Linking.openURL(ANDROID_STORE_APP_URL);
        return true;
      }
    } catch {
      // Fall through to the web Play Store URL.
    }

    await Linking.openURL(ANDROID_STORE_WEB_URL);
    return true;
  }

  const configuredUrl =
    Platform.OS === 'ios'
      ? StoreReview.storeUrl() || process.env.EXPO_PUBLIC_APP_STORE_URL?.trim()
      : null;
  const url = configuredUrl || IOS_STORE_URL;

  await Linking.openURL(reviewUrl(url));
  return true;
}

export function webStoreDestination(): WebStoreDestination {
  if (Platform.OS !== 'web' || typeof navigator === 'undefined') {
    return 'choose';
  }

  const userAgent = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const maxTouchPoints = navigator.maxTouchPoints || 0;

  if (/android/i.test(userAgent)) {
    return 'google';
  }

  if (
    /iPhone|iPad|iPod/i.test(userAgent) ||
    (/Mac/i.test(platform) && maxTouchPoints > 1)
  ) {
    return 'apple';
  }

  return 'choose';
}

export async function openWebStoreReviewPage(store: Exclude<WebStoreDestination, 'choose'>) {
  await Linking.openURL(store === 'google' ? ANDROID_STORE_WEB_URL : IOS_STORE_URL);
  return true;
}

function reviewUrl(url: string) {
  if (Platform.OS === 'ios' && !url.includes('action=write-review')) {
    return `${url}${url.includes('?') ? '&' : '?'}action=write-review`;
  }
  if (Platform.OS === 'android' && !url.includes('showAllReviews=true')) {
    return `${url}${url.includes('?') ? '&' : '?'}showAllReviews=true`;
  }
  return url;
}
