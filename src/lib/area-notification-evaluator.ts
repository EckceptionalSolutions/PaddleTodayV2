import {
  distanceMiles,
  estimateTravelMinutes,
  type RiverSummaryApiItem,
  type WeekendSummaryApiItem,
} from '@paddletoday/api-contract';
import {
  appendAreaNotificationEvent,
  isAreaNotificationsEnabled,
  listAreaNotificationSubscriptions,
  updateAreaNotificationSubscription,
  type AreaNotificationSubscription,
} from './area-notifications';
import { listRiverAlertEvents, listRiverAlerts } from './alerts';
import { sendAreaNotificationPush } from './area-notification-push';
import { getStoredRiverSummarySnapshot, getStoredWeekendSummarySnapshot } from './river-snapshots';

export async function evaluateAreaNotifications(args: { now?: Date } = {}) {
  if (!isAreaNotificationsEnabled()) {
    return { enabled: false, evaluated: 0, sent: 0, failures: 0, skipped: 0 };
  }

  const now = args.now ?? new Date();
  const [summary, weekend, routeAlerts, routeAlertEvents] = await Promise.all([
    getStoredRiverSummarySnapshot(),
    getStoredWeekendSummarySnapshot(),
    listRiverAlerts(),
    listRiverAlertEvents(),
  ]);
  const subscriptions = await listAreaNotificationSubscriptions({ activeOnly: true });
  const stats = { enabled: true, evaluated: subscriptions.length, sent: 0, failures: 0, skipped: 0 };
  const todayRoutes = summary?.rivers ?? [];
  const weekendRoutes = weekend?.rivers ?? [];

  for (const subscription of subscriptions) {
    const todayEligible = eligibleTodayRoutes(todayRoutes, subscription);
    const weekendEligible = eligibleWeekendRoutes(weekendRoutes, subscription);
    const todayWindowKey = localDateKey(now, subscription.timeZone);
    const weekendWindowKey = weekendKey(now, subscription.timeZone);
    const localHour = localHourFor(now, subscription.timeZone);
    const todayWindowOpen = localHour >= 7 && localHour < 16;
    const weekendWindowOpen = isWeekendDeliveryWindow(now, subscription.timeZone);

    try {
      const todayTransition = subscription.todayEnabled
        && todayEligible.length > 0
        && todayWindowOpen
        && !hasTodayNotificationForWindow(subscription, todayWindowKey)
        && !hasRecentRouteAlert(subscription, todayEligible, routeAlerts, routeAlertEvents, now);
      if (todayTransition) {
        const message = todayMessage(subscription, todayEligible);
        const delivery = await sendAreaNotificationPush({
          subscription,
          notificationType: 'nearby_today',
          routeSlugs: todayEligible.map((route) => route.river.slug),
          title: message.title,
          body: message.body,
          windowKey: todayWindowKey,
        });
        await appendAreaNotificationEvent({
          subscriptionId: subscription.id,
          notificationType: 'nearby_today',
          routeSlugs: todayEligible.map((route) => route.river.slug),
          title: message.title,
          body: message.body,
          sentAt: now.toISOString(),
          provider: delivery.provider,
          deliveryId: delivery.id,
          deliveryKey: delivery.deliveryKey,
          deliveryStatus: delivery.deliveryStatus,
        });
        await updateAreaNotificationSubscription(subscription.id, {
          lastTodaySentAt: now.toISOString(),
        });
        stats.sent += 1;
      }

      const weekendTransition = subscription.weekendEnabled
        && weekendEligible.length > 0
        && subscription.lastWeekendKey !== weekendWindowKey
        && weekendWindowOpen;
      if (weekendTransition) {
        const message = weekendMessage(subscription, weekendEligible);
        const delivery = await sendAreaNotificationPush({
          subscription,
          notificationType: 'weekend_outlook',
          routeSlugs: weekendEligible.map((route) => route.river.slug),
          title: message.title,
          body: message.body,
          windowKey: weekendWindowKey,
        });
        await appendAreaNotificationEvent({
          subscriptionId: subscription.id,
          notificationType: 'weekend_outlook',
          routeSlugs: weekendEligible.map((route) => route.river.slug),
          title: message.title,
          body: message.body,
          sentAt: now.toISOString(),
          provider: delivery.provider,
          deliveryId: delivery.id,
          deliveryKey: delivery.deliveryKey,
          deliveryStatus: delivery.deliveryStatus,
        });
        await updateAreaNotificationSubscription(subscription.id, {
          lastWeekendSentAt: now.toISOString(),
          lastWeekendKey: weekendWindowKey,
        });
        stats.sent += 1;
      }

      // Eligibility can be observed outside the delivery window. Do not persist
      // that observation as a sent/transition state; the successful send time
      // above is the source of truth for one Today notification per local day.
    } catch (error) {
      stats.failures += 1;
      console.error('[area-notifications] evaluation failed', { subscriptionId: subscription.id, error });
    }
  }

  if (!summary && !weekend) stats.skipped += subscriptions.length;
  return stats;
}

export function hasTodayNotificationForWindow(
  subscription: Pick<AreaNotificationSubscription, 'lastTodaySentAt' | 'timeZone'>,
  windowKey: string,
) {
  if (!subscription.lastTodaySentAt) return false;
  const sentAt = Date.parse(subscription.lastTodaySentAt);
  return Number.isFinite(sentAt) && localDateKey(new Date(sentAt), subscription.timeZone) === windowKey;
}

function hasRecentRouteAlert(
  subscription: AreaNotificationSubscription,
  routes: RiverSummaryApiItem[],
  alerts: Awaited<ReturnType<typeof listRiverAlerts>>,
  events: Awaited<ReturnType<typeof listRiverAlertEvents>>,
  now: Date,
) {
  const recentEventIds = new Set(events
    .filter((event) => event.deliveryMethod === 'push' && Date.parse(event.sentAt) >= now.getTime() - 2 * 60 * 60 * 1000)
    .map((event) => event.alertId));
  return alerts.some((alert) =>
    alert.isActive
    && alert.expoPushToken === subscription.expoPushToken
    && recentEventIds.has(alert.id)
    && routes.some((route) => route.river.slug === alert.riverSlug)
  );
}

export function eligibleTodayRoutes(rivers: RiverSummaryApiItem[], subscription: Pick<AreaNotificationSubscription, 'latitude' | 'longitude' | 'maxTravelMinutes'>) {
  return rivers
    .filter((river) => river.river.scoreEligibility !== 'planning')
    .filter((river) => river.rating === 'Strong' || river.rating === 'Good')
    .filter((river) => river.readiness.status === 'ready')
    .filter((river) => river.confidence.label === 'High' || river.confidence.label === 'Medium')
    .filter((river) => river.liveData.overall === 'live')
    .map((river) => ({ river, travelMinutes: travelMinutesFor(subscription, river.river.latitude, river.river.longitude) }))
    .filter((item) => item.travelMinutes <= subscription.maxTravelMinutes)
    .sort((left, right) => left.river.score === right.river.score
      ? left.travelMinutes - right.travelMinutes
      : right.river.score - left.river.score)
    .map((item) => item.river);
}

export function eligibleWeekendRoutes(rivers: WeekendSummaryApiItem[], subscription: Pick<AreaNotificationSubscription, 'latitude' | 'longitude' | 'maxTravelMinutes'>) {
  return rivers
    .filter((river) => river.river.scoreEligibility !== 'planning')
    .filter((river) => river.weekend.rating === 'Strong' || river.weekend.rating === 'Good')
    .filter((river) => river.weekend.confidence === 'High' || river.weekend.confidence === 'Medium')
    .filter((river) => river.liveData.overall === 'live')
    .map((river) => ({ river, travelMinutes: travelMinutesFor(subscription, river.river.latitude, river.river.longitude) }))
    .filter((item) => item.travelMinutes <= subscription.maxTravelMinutes)
    .sort((left, right) => left.river.weekend.score === right.river.weekend.score
      ? left.travelMinutes - right.travelMinutes
      : right.river.weekend.score - left.river.weekend.score)
    .map((item) => item.river);
}

function travelMinutesFor(subscription: Pick<AreaNotificationSubscription, 'latitude' | 'longitude'>, latitude: number, longitude: number) {
  return estimateTravelMinutes(distanceMiles(subscription.latitude, subscription.longitude, latitude, longitude));
}

function todayMessage(subscription: AreaNotificationSubscription, routes: RiverSummaryApiItem[]) {
  const count = routes.length;
  return count === 1
    ? { title: `${routes[0].river.name} looks good today`, body: `Conditions are lining up near ${subscription.locationLabel}.` }
    : { title: `${count} paddle-ready routes near ${subscription.locationLabel}`, body: `${routes[0].river.name} leads today’s nearby picks.` };
}

function weekendMessage(subscription: AreaNotificationSubscription, routes: WeekendSummaryApiItem[]) {
  const count = routes.length;
  return count === 1
    ? { title: `${routes[0].river.name} is shaping up for the weekend`, body: `See the latest outlook near ${subscription.locationLabel}.` }
    : { title: `${count} routes near ${subscription.locationLabel} look good this weekend`, body: `${routes[0].river.name} leads the weekend outlook.` };
}

function localDateKey(now: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

function localHourFor(now: Date, timeZone: string) {
  const hour = new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', hour12: false }).format(now);
  return Number(hour === '24' ? '0' : hour);
}

function localWeekday(now: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short' }).format(now);
}

function weekendKey(now: Date, timeZone: string) {
  const date = localDateKey(now, timeZone);
  const weekday = localWeekday(now, timeZone);
  const offsetToSaturday = ({ Sun: 6, Mon: 5, Tue: 4, Wed: 3, Thu: 2, Fri: 1, Sat: 0 } as Record<string, number>)[weekday] ?? 0;
  const [year, month, day] = date.split('-').map(Number);
  const saturday = new Date(Date.UTC(year, month - 1, day + offsetToSaturday));
  return saturday.toISOString().slice(0, 10);
}

function isWeekendDeliveryWindow(now: Date, timeZone: string) {
  const weekday = localWeekday(now, timeZone);
  const hour = localHourFor(now, timeZone);
  return (weekday === 'Thu' && hour >= 15) || (weekday === 'Fri' && hour < 12);
}
