import { isDate, isSet } from 'lodash';
import { isScalarLike } from './isScalarLike';
import { isRunningLocal } from './runtimeEnvironment';
import { isMap } from './isMap';

/**
 * Wrapper for {@link !JSON.stringify} with improved error handling,
 * custom handling for some types, and automatic pretty formatting
 * for local development. Enhancements include.
 * | Enhancement | Notes |
 * | ----------- | ----- |
 * | `Error` objects | Serialized like regular objects instead of empty objects. |
 * | `Set` | Serialized into arrays. |
 * | `Map` | Serialized as objects. |
 * | Circular references | Ignored instead of throwing an error. |
 *
 * @example
 * // Serialize an error
 * const actual = jsonStringifyBetter(new Error('An error occurred'));
 * const expected = {
 *   name: 'Error',
 *   message: 'An error occurred',
 *   stack: expect.stringContaining('jsonStringifyBetter'),
 * }
 * expect(actual.message).toEqual(expected);
 *
 * @example
 * // Serialize a Set and Map
 * const map = new Map();
 * map.set('a', 'A');
 *
 * const set = new Set();
 * set.add(1);
 *
 * const obj = { map, set };
 * const actual = jsonStringifyBetter(obj);
 * const expected = {
 *   map: {
 *     a: 'A',
 *   },
 *   set: [
 *     1,
 *   ],
 * };
 * expect(actual).toEqual(expected);
 *
 * @example
 * // Ignore a circular reference
 * const o = {
 *   child: {};
 * };
 * o.child.parent = o;
 *
 * const actual = jsonStringifyBetter(o);
 * const expected = {
 *   child: {}
 * };
 *
 * expect(actual).toEqual(expected);
 *
 * @see {@link !JSON.stringify}
 */
export function jsonStringifyBetter(value: unknown): string {

  const found: unknown[] = [];

  return JSON.stringify(
    value,
    betterReplacer,
    isRunningLocal() ? 2 : undefined
  );

  function betterReplacer(key: string, value: unknown) {

    if (isScalarLike(value) || isDate(value)) {
      return value;
    }

    let newValue = value;
    newValue = filterCirculars(key, newValue);
    newValue = convertMaps(key, newValue);
    newValue = convertSets(key, newValue);

    return newValue;
  }

  function filterCirculars(_key: string, value: unknown) {
    if (found.includes(value)) {
      return null;
    }

    found.push(value);
    return value;
  }

  function convertMaps(_key: string, value: unknown) {
    if (!isMap(value)) {
      return value;
    }

    const newValue: Record<PropertyKey, unknown> = {};
    for (const [ key, item ] of value.entries()) {
      newValue[ String(key) ] = item;
    }

    return newValue;
  }

  function convertSets(_key: string, value: unknown) {
    return isSet(value) ? [ ...value.keys() ] : value;
  }
}
