import { tripStorage } from '../src/lib/trip-storage';
await tripStorage().maintenance();
console.log('Trip index repair, deletion, and photo cleanup completed.');
