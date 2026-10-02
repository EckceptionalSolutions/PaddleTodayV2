/** Shared store destinations for server-rendered links and platform selection. */
export const appleAppId = import.meta.env.PUBLIC_APPLE_APP_ID || '6769542734';
export const appStoreUrl = import.meta.env.PUBLIC_APP_STORE_URL || (appleAppId ? `https://apps.apple.com/app/id${appleAppId}` : '');
export const playStoreUrl = import.meta.env.PUBLIC_PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=com.paddletoday.mobile';
