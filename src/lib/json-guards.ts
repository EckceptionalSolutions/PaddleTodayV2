export type JsonGuard<T> = (value: unknown) => value is T;

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isArrayOf<T>(value: unknown, guard: JsonGuard<T>): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNullableString(value: unknown): value is string | null {
  return value === null || isString(value);
}

export function isNullableNumber(value: unknown): value is number | null {
  return value === null || isNumber(value);
}

export function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || isString(value);
}

export function isOptionalNumber(value: unknown): value is number | undefined {
  return value === undefined || isNumber(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isOneOf<T extends string>(value: unknown, options: readonly T[]): value is T {
  return isString(value) && options.includes(value as T);
}

export function safeParseJson<T>(payload: string, guard: JsonGuard<T>): T | null {
  try {
    const value: unknown = JSON.parse(payload);
    return guard(value) ? value : null;
  } catch {
    return null;
  }
}

export function parseJson<T>(payload: string, guard: JsonGuard<T>, errorMessage: string): T {
  const value: unknown = JSON.parse(payload);
  if (guard(value)) {
    return value;
  }

  throw new Error(errorMessage);
}
