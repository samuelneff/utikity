import { isNumber } from 'lodash';

/**
 * Determines if a value is a number and not {@link !Number.NaN}.
 *
 * @example
 * expect(isRealNumber(1)).toBeTruthy();
 * expect(isRealNumber(Number.NaN)).toBeFalsy();
 * expect(isRealNumber(undefined)).toBeFalsy();
 * expect(isRealNumber('1')).toBeFalsy();
 */
export function isRealNumber(value: unknown): value is number {
  return isNumber(value) && !Number.isNaN(value);
};
