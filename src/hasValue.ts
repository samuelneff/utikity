import { isEmpty } from 'lodash';

/**
 * Determines if a value is defined and is not empty. Specifically it is not `undefined`, `null`,
 * an empty string, an empty array, an empty Map, an empty Set, or other similar empty object.
 * See {@link isEmpty} for a more complete description
 *
 * @example
 *
 * expect(hasValue('String')).toBeTruthy();
 * expect(hasValue(0)).toBeTruthy();
 * expect(hasValue(false)).toBeTruthy();
 * expect(hasValue({ a: 'A' })).toBeTruthy();
 * expect(hasValue([ 'a' ])).toBeTruthy();
 *
 * expect(hasValue('')).toBeFalsy();
 * expect(hasValue(Number.NaN)).toBeFalsy();
 * expect(hasValue({})).toBeFalsy();
 * expect(hasValue([])).toBeFalsy();
 *
 * @see {@link isEmpty}
 */
export function hasValue<T>(value: T): value is NonNullable<T> {
  return !isEmpty(value);
}
