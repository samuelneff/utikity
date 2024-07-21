/**
 * Creates an array with the specified number of items where each is created by calling
 * the callback with the appropriate index.
 *
 * @example
 *
 * const actual = mapCount(
 *   4,
 *   i => i * i,
 * );
 *
 * expect(actual).toEqual([0, 1, 4, 9]); // squares zero through three
 */
export function mapCount<T>(length: number, callback: (index: number) => T): T[] {
  const array = new Array(length) as T[];
  for (let i = 0; i < length; i++) {
    array[ i ] = callback(i);
  }
  return array;
}
