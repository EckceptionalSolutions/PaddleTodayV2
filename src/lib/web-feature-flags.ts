/// <reference types="astro/client" />

const enabled = (value: string | undefined) => value === '1' || value === 'true';

/** Public build-time rollout flags. Change the matching GitHub repository variable and rebuild the frontend. */
export const webFeatureFlags = Object.freeze({
  tripAppHandoff: enabled(import.meta.env.PUBLIC_FEATURE_TRIP_APP_HANDOFF),
  // Local builds keep this on by default. Production explicitly defaults it off in the deploy workflow.
  webAccountExperience: import.meta.env.PUBLIC_FEATURE_WEB_ACCOUNT_EXPERIENCE === undefined
    ? true
    : enabled(import.meta.env.PUBLIC_FEATURE_WEB_ACCOUNT_EXPERIENCE),
  savedRouteSyncClaim: enabled(import.meta.env.PUBLIC_FEATURE_SAVED_ROUTE_SYNC_CLAIM),
});

export { enabled as isWebFeatureEnabled };
