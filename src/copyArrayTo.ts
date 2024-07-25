
/**
 * Copies the values of `source` to `target` for the specified indices inclusive of end. Returns a new array
 * if no target array is provided. The `target` array is modified, if it is provided.
 *
 * @example
 * const source = [ 1, 2, 3, 4, 5 ];
 * const target = [ 'a', 'b', 'c' ];
 * const actual = copyArrayTo(source, 1, 3, target, 2);
 * const expected = [ 'a', 'b', 2, 3, 4 ];
 * expect(actual).toEqual(expected);
 * expect(actual).toBe(target);
 */
export function copyArrayTo<T>(
  source: T[],
  startIndex: number,
  endIndex: number,
  target?: T[],
  targetStartIndex: number = 0,
): T[] {
  var index = startIndex - 1,
      length = Math.min(source.length, endIndex + 1);

  const result = target ?? new Array<T>(length);
  while (++index < length) {
    result[ index + targetStartIndex ] = source[index];
  }
  return result;
}