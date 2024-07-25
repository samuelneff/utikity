
/**
 * Creates an array with the specified value the specified number of times.
 *
 * @example
 *
 * const actual = arrayOf('a', 3);
 * expect(actual).toEqual([ 'a', 'a', 'a' ]);
 */
export function arrayOf<T>(value: T, count: number): T[] {
  if (count <= 0) {
    return [];
  }

  const array = new Array<T>(count);
  for (let i = 0; i < count; i++) {
    array[ i ] = value;
  }

  return array;
}
