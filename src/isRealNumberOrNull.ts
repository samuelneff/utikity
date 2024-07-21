import { isRealNumber } from './isRealNumber';

/**
 * Determines if a value is a number, not {@link !Number.NaN}, or it is `null`.
 *
 * @example
 * expect(isRealNumberOrNull(1)).toBeTruthy();
 * expect(isRealNumberOrNull(null)).toBeTruthy();
 * expect(isRealNumberOrNull(Number.NaN)).toBeFalsy();
 * expect(isRealNumberOrNull(undefined)).toBeFalsy();
 * expect(isRealNumberOrNull('1')).toBeFalsy();
 */
export function isRealNumberOrNull(value: unknown) {
  return value === null || isRealNumber(value);
}
