import { safeObjectEntries } from './safeObjectEntries';

/**
 * Recurisvely loops through an object structure and calls [iteratee] on each item found. Supports
 * iterating objects, arrays, Set, and Map.
 *
 * @example
 * const obj = {
 *   a: 'A',
 *   b: 'B',
 *   c: {
 *     d: 'D',
 *     e: 'E',
 *     f: {
 *       g: 'G',
 *     },
 *   },
 * };
 *
 * let keys: string[] = [];
 * let values: string[] = [];
 *
 * recurseObject(
 *   obj,
 *   (value, key) => {
 *     if (typeof value === 'string') {
 *       keys.push(key);
 *       values.push(value);
 *     }
 *   }
 * );
 *
 * expect(keys).toEqual(['a', 'b', 'd', 'e', 'g']);
 * expect(values).toEqual(['A', 'B', 'D', 'E', 'G']);
 */
export function recurseObject<T>(
  obj: T,
  iteratee: (value: unknown, key: unknown, parent: unknown, root: T) => void
): T {
  const root = obj;

  recurseObjectImpl(obj);

  return obj;

  function recurseObjectImpl(item: unknown) {
    for (const entry of safeObjectEntries(item as Record<PropertyKey, unknown>)) {
      const [ key, value ] = entry;
      iteratee(value, key, item, root);
      recurseObjectImpl(value);
    }
  }
}
