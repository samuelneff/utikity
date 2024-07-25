import { isNullOrUndefined } from './isNullOrUndefined';

/**
 * Returns a property of an object or a optionally specified default value if the property is not defined
 * on the object.
 *
 * @example
 *
 * const actual1 = getOrDefault(
 *   { a: 'A' },
 *   'a',
 *   'missing',
 * );
 * expect(actual1).toBe('A');
 *
 * const actual2 = getOrDefault(
 *   { a: 'A' },
 *   'b',
 *   'missing',
 * );
 * expect(actual2).toBe('missing');
 *
 * const actual3 = getOrDefault(
 *   null,
 *   'b',
 *   'missing',
 * );
 * expect(actual3).toBe('missing');
 */
export function getOrDefault<T>(obj: unknown, property: string | number | symbol, defaultValue?: T): T | undefined {
  const value = isNullOrUndefined(obj)
    ? undefined
    : (obj as any)[ property ] ?? undefined;
  return value === undefined ? defaultValue : value as T;
}
