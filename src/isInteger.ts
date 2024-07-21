import { isRealNumber } from './isRealNumber';

/**
 * Tests if the value is a whole number and not {@link !Number.NaN}.
 *
 * @example
 *
 * expect(isIntegerOrNull(0)).toBeTruthy();
 * expect(isIntegerOrNull(1)).toBeTruthy();
 * expect(isIntegerOrNull(100)).toBeTruthy();
 *
 * expect(isIntegerOrNull(0.5)).toBeFalsy();
 * expect(isIntegerOrNull(null)).toBeFalsy();
 * expect(isIntegerOrNull(undefined)).toBeFalsy();
 * expect(isIntegerOrNull(Number.NaN)).toBeFalsy();
 * expect(isIntegerOrNull('0')).toBeFalsy();
 *
 * @see {@link isIntegerOrNull}
 */
export function isInteger(value: unknown): value is number {
  return isRealNumber(value) && value === Math.floor(value);
}
