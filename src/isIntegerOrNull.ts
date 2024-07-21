import { isInteger } from './isInteger';

/**
 * Tests if the value is a whole number, not {@link !Number.NaN}, or it is `null`.
 *
 * @example
 *
 * expect(isIntegerOrNull(0)).toBeTruthy();
 * expect(isIntegerOrNull(1)).toBeTruthy();
 * expect(isIntegerOrNull(100)).toBeTruthy();
 * expect(isIntegerOrNull(null)).toBeTruthy();
 *
 * expect(isIntegerOrNull(0.5)).toBeFalsy();
 * expect(isIntegerOrNull(undefined)).toBeFalsy();
 * expect(isIntegerOrNull(Number.NaN)).toBeFalsy();
 * expect(isIntegerOrNull('0')).toBeFalsy();
 *
 * @see {@link isInteger}
 */
export function isIntegerOrNull(value: unknown): value is (number | null) {
  return value === null || isInteger(value);
}
