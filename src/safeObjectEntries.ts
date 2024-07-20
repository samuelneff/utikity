import { isMap } from './isMap';
import { isNullOrUndefined } from './isNullOrUndefined';
import { isSet } from './isSet';

/**
 * Returns an array of entries of an object supporting objects, Map<,>, Set<,>, null, and undefined. For
 * null and undefined an empty array is returned. An array is always returned, even in the case of
 * an error, which returns an empty array.
 *
 * @example
 * // Usage on objects is identical to Object.entries()
 * const actual1 = safeObjectEntries({ a: 'A' });
 * expect(actual1).toEqual([ ['a', 'A' ]]);
 *
 * // Consistent api for use on Map<,> where Object.entries() would return an empty array
 * const actual2 = safeObjectEntries(new Map([ ['a', 'A' ] ]);
 * expect(actual2).toEqual([ ['a', 'A' ]]);
 *
 * // Usage on arrays is identical to Object.entries()
 * const actual3 = safeObjectEntries(['a']);
 * expect(actual3).toEqual([ ['0', 'a' ]]);
 *
 * // Consisent usage on a Set<> where Object.entries() would return an empty array
 * const actual4 = safeObjectEntries(new Set(['a']));
 * expect(actual4).toEqual([ ['0', 'a' ]]);
 *
 * // Consistent usage on undefined returns an empty array were Object.entries() would error
 * const actual5 = safeObjectEntries(undefined);
 * expect(actual5).toEqual([]);
 *
 * // Consistent usage on null returns an empty array were Object.entries() would error
 * const actual6 = safeObjectEntries(null);
 * expect(actual6).toEqual([]);
 *
 * // Consistent usage on non-objects returns an empty array
 * const actual7 = safeObjectEntries(1);
 * expect(actual7).toEqual([]);
 *
 *
 */
export function safeObjectEntries<T>(obj: { [s: string]: T } | ArrayLike<T> | undefined | null): [string, T][] {
  if (isNullOrUndefined(obj)) {
    return [];
  }

  if (isMap(obj) || isSet(obj)) {
    return [ ...obj.entries() ] as [ string, T ][];
  }

  try {
    return Object.entries(obj);
  } catch {
    return [];
  }
}
