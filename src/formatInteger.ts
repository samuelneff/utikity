import { isNullOrUndefined } from './isNullOrUndefined';

/**
 * Returns the rounded value as a string and empty string for undefined or null.
 *
 * @example
 * expect(formatInteger(1.2)).toBe('1');
 * expect(formatInteger(1.5)).toBe('2');
 * expect(formatInteger(undefined)).toBe('');
 * expect(formatInteger(null)).toBe('');
 *
 * @see {@link formatOrdinal}
 * @see {@link formatPercent}
 * @see {@link formatThousands}
 */
export function formatInteger(value: number | null): string {
  if (isNullOrUndefined(value)) {
    return '';
  }

  return Math.round(value).toString();
}
