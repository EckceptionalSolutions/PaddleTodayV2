import type { TripTimePickerProps } from './trip-time-picker.types';
import { colors } from '../theme/tokens';

export function TripTimePicker({ label, value, onChange, disabled, dateOnly = false }: TripTimePickerProps) {
  return <input type={dateOnly ? "date" : "datetime-local"} aria-label={dateOnly ? label : `${label} date and time`} disabled={disabled}
    value={value.replace(' ', 'T')} onChange={event => onChange(event.target.value.replace('T', ' '))}
    style={{ width: '100%', minWidth: 0, boxSizing: 'border-box', minHeight: 48, padding: 10, borderRadius: 10,
      border: `1px solid ${colors.border}`, background: colors.surfaceStrong, color: colors.text, font: 'inherit', fontSize: 16 }} />;
}
