import './telemetry';
import { startTripMaintenance } from './trip-maintenance';

await import('./api-server');
startTripMaintenance();
