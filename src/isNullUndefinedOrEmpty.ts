import {
  isArrayBuffer,
  isArrayLike,
  isDate,
  isFunction,
  isMap,
  isSet,
} from 'lodash';
import { isNullOrUndefined } from './isNullOrUndefined';

/**
 * Tests whether an object is null, undefined, or "empty". Strings, arrays, maps, and sets and similar built-in
 * objects are empty when they have zero length. Objects are empty when they don't have any keys.
 *
 * @example
 *
 * expect(isNullUndefinedOrEmpty(null)).toBeTruthy();
 * expect(isNullUndefinedOrEmpty(undefined)).toBeTruthy();
 * expect(isNullUndefinedOrEmpty('')).toBeTruthy();
 * expect(isNullUndefinedOrEmpty([])).toBeTruthy();
 * expect(isNullUndefinedOrEmpty({})).toBeTruthy();
 * expect(isNullUndefinedOrEmpty(new Map())).toBeTruthy();
 * expect(isNullUndefinedOrEmpty(new Set())).toBeTruthy();
 * expect(isNullUndefinedOrEmpty(new WeakMap())).toBeTruthy();
 * expect(isNullUndefinedOrEmpty(new WeakSet())).toBeTruthy();
 * expect(isNullUndefinedOrEmpty(new ArrayBuffer())).toBeTruthy();
 * expect(isNullUndefinedOrEmpty(new Int32Array())).toBeTruthy();
 *
 * expect(isNullUndefinedOrEmpty('s')).toBeFalsy();
 * expect(isNullUndefinedOrEmpty(new Date())).toBeFalsy();
 * expect(isNullUndefinedOrEmpty(() => {})).toBeFalsy();
 * expect(isNullUndefinedOrEmpty([ 1 ])).toBeFalsy();
 * expect(isNullUndefinedOrEmpty(new Map([ ['a', 'A' ]]))).toBeFalsy();
 * expect(isNullUndefinedOrEmpty(new Set([ 'a' ]))).toBeFalsy();
 * expect(isNullUndefinedOrEmpty({a: 'A'})).toBeFalsy();
 * expect(isNullUndefinedOrEmpty(1)).toBeFalsy();
 * expect(isNullUndefinedOrEmpty(true)).toBeFalsy();
 *
 * @see {@link isNullOrUndefined}
 */
export function isNullUndefinedOrEmpty(value: unknown): value is undefined | null {
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

  if (typeof value === 'object') {
    return Object.keys(value as object).length === 0;
  }

  return false;
}
