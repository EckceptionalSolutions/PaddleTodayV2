import { isValidEmailAddress } from './alerts';
import { parseTripTime } from './trip-time';

export type RouteReportValidationField = 'name' | 'email' | 'tripDate' | 'report' | 'waterLevel' | 'completion' | 'verdict' | 'consent' | 'rights';
export type RouteReportValidationError = { field: RouteReportValidationField; message: string };

export function validateRouteReport(input: {
  name: string; email: string; tripDate: string; report: string; photoCount: number;
  waterLevel: string; completion: string; verdict: string; consent: boolean; rights: boolean;
}): RouteReportValidationError | null {
  if (input.name.trim().length < 2) return { field: 'name', message: 'Add your name or paddling handle.' };
  if (!isValidEmailAddress(input.email.trim())) return { field: 'email', message: 'Enter a valid email address for follow-up questions.' };
  if (input.tripDate.trim() && !parseTripTime(`${input.tripDate.trim()} 12:00`)) {
    return { field: 'tripDate', message: 'Enter a valid date as YYYY-MM-DD, use the date picker, or clear this optional field.' };
  }
  if (input.report.trim().length < 12 && input.photoCount === 0) return { field: 'report', message: 'Add at least a sentence or attach route photos.' };
  if (!input.waterLevel) return { field: 'waterLevel', message: 'Choose the water level you observed. Unknown is available if you are unsure.' };
  if (!input.completion) return { field: 'completion', message: 'Choose the trip outcome.' };
  if (!input.verdict) return { field: 'verdict', message: 'Choose an overall verdict.' };
  if (!input.consent) return { field: 'consent', message: "Confirm that it's okay to contact you about this report." };
  if (input.photoCount > 0 && !input.rights) return { field: 'rights', message: 'Confirm that you own or have permission to share the attached photos.' };
  return null;
}
