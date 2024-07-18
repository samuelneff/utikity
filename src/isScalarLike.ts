import { isBoolean, isNumber, isString } from 'lodash';
import { isSymbol } from './isSymbol';

/**
 * Identifies if the argument is generally considered scalar: `string`, `number`, `boolean`, or `Date`.
 * Excludes `undefined`, `null`, `NaN`, and `Symbol`. See {@link isTrueScalar} for more
 * specific use cases.
 *
 * @example
 * expect(isScalarLike('')).toBeTruthy();
 * expect(isScalarLike(123)).toBeTruthy();
 * expect(isScalarLike(true)).toBeTruthy();
 * expect(isScalarLike(new Date())).toBeTruthy();
 *
 * expect(isScalarLike(undefined)).toBeFalsy();
 * expect(isScalarLike(null)).toBeFalsy();
 * expect(isScalarLike(Number.NaN)).toBeFalsy();
 * expect(isScalarLike(Symbol())).toBeFalsy();
 * expect(isScalarLike({})).toBeFalsy();
 * expect(isScalarLike([])).toBeFalsy();
 *
 * @see {isTrueScalar}
 */
export function isScalarLike(value: unknown): value is string | number | boolean | Date {
  return isString(value) ||
    isBoolean(value) ||
    isNumber(value) ||
    isSymbol(value) ||
    (value instanceof Date);
}


