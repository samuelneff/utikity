import { isNumber } from 'lodash';

/**
 * Determines if a value is a number between 0.0 and 1.0 or it is `null`.
 *
 * @example
 *
 * expect(isPercentOrNull(0)).toBeTruthy();
 * expect(isPercentOrNull(0.5)).toBeTruthy();
 * expect(isPercentOrNull(1)).toBeTruthy();
 * expect(isPercentOrNull(null)).toBeTruthy();
 *
 * expect(isPercentOrNull(75).toBeFalsy();
 * expect(isPercentOrNull(undefined)).toBeFalsy();
 * expect(isPercentOrNull('75%')).toBeFalsy();
 */
export function isPercentOrNull(value: unknown): value is number | null {
  return value === null || (isNumber(value) && value >= 0 && value <= 1.0);
}
