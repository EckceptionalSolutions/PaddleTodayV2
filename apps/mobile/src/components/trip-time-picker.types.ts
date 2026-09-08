export interface TripTimePickerProps {
  label: string;
  dateOnly?: boolean;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}
