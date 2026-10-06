import type { PendingTripWork } from '@paddletoday/api-client';
import type { TripPlan } from '@paddletoday/api-contract';

export interface RecoveryFact { label: string; value: string }
export function tripSyncRecovery(work: PendingTripWork) {
  const facts: RecoveryFact[] = [];
  const add = (label: string, value: string | number | null | undefined) => {
    if (value !== undefined && value !== null && value !== '') facts.push({ label, value: String(value) });
  };
  const route = (value: TripPlan['route']) => {
    add('Route', value.name); add('Put-in', value.putInName); add('Take-out', value.takeOutName);
  };
  let title = 'Trip change', detail = 'This change is saved on this device until it can sync.';
  if (work.kind === 'photo') {
    title = 'Photo upload'; detail = 'Your selected photo is kept on this device until it uploads.';
    add('Caption', work.caption);
  } else if (work.kind === 'log') {
    const log = work.input.value;
    title = log ? 'Paddle recap' : 'Delete paddle';
    if (log) {
      route(log.route); add('Date paddled', log.date); add('Launch', log.time); add('Time zone', log.timeZone);
      add('Private notes', log.notes);
      add('Would paddle again', { yes: 'Yes', no: 'No', unsure: 'Unsure', '': '' }[log.paddleAgain]);
      log.water.forEach(w => add('Water observation', [w.gaugeName, [w.value, w.unit].filter(Boolean).join(' '), w.measuredAt, w.source, w.note].filter(Boolean).join(' · ')));
      if (log.track) add('Private GPS track', `${(log.track.distanceMeters / 1609.344).toFixed(1)} mi · ${Math.floor(log.track.elapsedSeconds / 60)} min ${log.track.elapsedSeconds % 60} sec`);
    } else detail = 'The paddle deletion has not synced yet.';
  } else {
    const command = work.input.command;
    if (command.type === 'create' || command.type === 'plan') {
      title = command.type === 'create' ? 'New trip plan' : 'Trip details';
      const plan = command.plan;
      const changed = (key: keyof TripPlan) => command.type === 'create' || JSON.stringify(plan[key]) !== JSON.stringify(command.baseline[key]);
      if (changed('title')) add('Trip name', plan.title);
      if (changed('route')) route(plan.route);
      if (changed('date')) add('Date', plan.date || 'Date removed');
      if (changed('launch')) add('Launch', plan.launch || 'Launch time removed');
      if (changed('expected')) add('Expected return', plan.expected || 'Return time removed');
      if (changed('timeZone')) add('Time zone', plan.timeZone);
      if (changed('itinerary')) add('Meeting stops', plan.itinerary.map(s => [s.location, s.time, s.note].filter(Boolean).join(' · ')).join('\n') || 'Meeting stops removed');
      if (changed('preparation')) {
        const preparation = plan.preparation;
        add('Group check-in', preparation?.checkInLocal); add('Group size', preparation?.groupSize);
        add('Boat or gear', preparation?.boatDescription); add('Shuttle note', preparation?.vehicleDescription); add('Group note', preparation?.note);
        if (!preparation || !Object.values(preparation).some(Boolean)) add('Group notes', 'Group notes removed');
      }
    } else {
      const titles = { status: 'Trip status', rsvp: 'Your RSVP', name: 'Your trip name', vehicle: 'Shuttle vehicle', 'remove-vehicle': 'Remove vehicle', seat: 'Shuttle update', 'remove-member': 'Crew update', transfer: 'Change organizer', delete: 'Delete trip', link: 'Share link', revoke: 'Revoke share links', join: 'Join trip' };
      title = titles[command.type];
      if (command.type === 'status') add('Status', { planned: 'Planned', completed: 'Completed', cancelled: 'Cancelled' }[command.status]);
      if (command.type === 'rsvp') add('RSVP', { going: 'Going', maybe: 'Maybe', 'not-going': 'Not going' }[command.rsvp]);
      if (command.type === 'name') add('Name', command.name);
      if (command.type === 'vehicle') {
        const vehicle = command.vehicle;
        add('Vehicle / driver', vehicle.label); add('Meet at', [vehicle.meeting, vehicle.time].filter(Boolean).join(' · ')); add('Car stays at', vehicle.parkedAt); add('Shuttle notes', vehicle.note);
      }
    }
  }
  const error = work.error === 'Use the trip ID for its personal log.'
    ? 'This recording could not sync with the trip service. Your private track is kept on this device. Try again after the service is updated.'
    : work.error;
  return { title, detail, error, facts, shareText: [title, ...facts.map(f => `${f.label}: ${f.value}`)].join('\n\n') };
}
