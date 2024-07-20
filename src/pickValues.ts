export function pickValues<T>(item: T, keys: (keyof T)[]): T[keyof T][];
export function pickValues(item: unknown, keys: string[]): unknown[];
/**
 * Given an object and array of keys returns an array of values matching those keys.
 *
 * @example
 * const item = {
 *  a: 'A',
 *  b: 'B',
 *  c: 'C',
 * };
 * const actual = pickValues(item, ['a', 'b']);
 * expect(actual).toEqual(['A', 'B']);
 */
export function pickValues(item: any, keys: any[]) {
  return keys.map(key => item[key]);
}
