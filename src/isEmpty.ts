import {
  isArrayBuffer,
  isArrayLike,
  isDate,
  isFunction,
  isMap,
  isNumber,
  isSet,
} from 'lodash';
import { isNullOrUndefined } from './isNullOrUndefined';

/**
 * Tests whether an object is null, undefined, or "empty". Strings, arrays, maps, and sets and similar built-in
 * objects are empty when they have zero length. Objects are empty when they don't have any keys.
 *
 * @example
 *
 * expect(isEmpty(null)).toBeTruthy();
 * expect(isEmpty(undefined)).toBeTruthy();
 * expect(isEmpty('')).toBeTruthy();
 * expect(isEmpty([])).toBeTruthy();
 * expect(isEmpty({})).toBeTruthy();
 * expect(isEmpty(new Map())).toBeTruthy();
 * expect(isEmpty(new Set())).toBeTruthy();
 * expect(isEmpty(new WeakMap())).toBeTruthy();
 * expect(isEmpty(new WeakSet())).toBeTruthy();
 * expect(isEmpty(new ArrayBuffer())).toBeTruthy();
 * expect(isEmpty(new Int32Array())).toBeTruthy();
 *
 * expect(isEmpty('s')).toBeFalsy();
 * expect(isEmpty(new Date())).toBeFalsy();
 * expect(isEmpty(() => {})).toBeFalsy();
 * expect(isEmpty([ 1 ])).toBeFalsy();
 * expect(isEmpty(new Map([ ['a', 'A' ]]))).toBeFalsy();
 * expect(isEmpty(new Set([ 'a' ]))).toBeFalsy();
 * expect(isEmpty({a: 'A'})).toBeFalsy();
 * expect(isEmpty(1)).toBeFalsy();
 * expect(isEmpty(true)).toBeFalsy();
 *
 * @see {@link isNullOrUndefined}
 */
export function isEmpty(value: unknown): value is undefined | null {
  if (isNullOrUndefined(value)) {
    return true;
  }

  if (isDate(value) || isFunction(value)) {
    return false;
  }

  if (isArrayLike(value)) {
    return value.length === 0;
  }

  if (isMap(value) || isSet(value)) {
    return value.size === 0;
  }

  if (isArrayBuffer(value)) {
    return value.byteLength === 0;
  }

  if (isNumber(value)) {
    return Number.isNaN(value);
  }

  if (typeof value === 'object') {
    return Object.keys(value as object).length === 0;
  }

  // Everything else cannot be empty
  return false;
}
