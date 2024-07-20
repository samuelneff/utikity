import { isBoolean } from './isBoolean';
import { isNullOrUndefined } from './isNullOrUndefined';
import { isRealNumber } from './isRealNumber';
import { isString } from './isString';

/**
 * Record of lenient string values that can typically converted to a boolean value. Includes
 * variations of the words true and false and the numbers 0 and 1 as strings.
 */
export const booleanStrings: Record<string, boolean | undefined> = {
  true: true,
  True: true,
  TRUE: true,
  t: true,
  T: true,
  '1': true,

  false: false,
  False: false,
  FALSE: false,
  f: false,
  F: false,
  '': false,
  '0': false,
};

/**
 * Lenient conversion of a string to boolean that supports many variants of the words
 * true or false in various casing as well as numbers stored as strings. Also supports
 * standard conversion of numbers, undefined, null, and passthrough of booleans. Anything
 * else is returned as false, so objects return false.
 *
 * @example
 *
 * expect(toBoolean('true')).toBeTruthy();
 * expect(toBoolean('TRUE')).toBeTruthy();
 * expect(toBoolean('T')).toBeTruthy();
 * expect(toBoolean('1.23')).toBeTruthy();
 * expect(toBoolean(1)).toBeTruthy();
 * expect(toBoolean(true)).toBeTruthy();
 *
 * expect(toBoolean('false')).toBeFalsy();
 * expect(toBoolean('FALSE')).toBeFalsy();
 * expect(toBoolean('f')).toBeFalsy();
 * expect(toBoolean('F')).toBeFalsy();
 * expect(toBoolean('0')).toBeFalsy();
 * expect(toBoolean(undefined)).toBeFalsy();
 * expect(toBoolean(null)).toBeFalsy();
 * expect(toBoolean({})).toBeFalsy();
 * expect(toBoolean([])).toBeFalsy();
 *
 * // For comparison, these results using the built-in Boolean conversion have different results
 * expect(Boolean('false')).toBeTruthy();
 * expect(Boolean('FALSE')).toBeTruthy();
 * expect(Boolean('f')).toBeTruthy();
 * expect(Boolean('F')).toBeTruthy();
 * expect(Boolean('0')).toBeTruthy();
 * expect(Boolean({})).toBeTruthy();
 * expect(Boolean([])).toBeTruthy();
 *
 * @see {@link booleanStrings}
 */
export function toBoolean(value: unknown): boolean {
  if (isBoolean(value)) {
    return value;
  }

  if (isRealNumber(value)) {
    return Boolean(value);
  }

  if (isNullOrUndefined(value)) {
    return false;
  }

  if (isString(value)) {
    const maybeBoolean = booleanStrings[ value ];
    if (maybeBoolean !== undefined) {
      return maybeBoolean;
    }

    return /-?\d+(\.\d+)/.test(value);
  }

  return false;
}
