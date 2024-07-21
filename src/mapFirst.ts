/**
 * Calls the mapper for each item in a list sequentiall and until the first non-null response
 * is returned by the mapper. Returns `null` if the array is empty or the mapper returns a `null`
 * response for every element in the array.
 *
 * @example
 *
 * function evenOrNull(value: number) {
 *   return value & 1
 *     ? null
 *     : 0
 * }
 *
 * const actual = mapFirst(
 *   [ 1, 2, 3, 4 ],
 *   evenOrNull
 * );
 *
 * expect(actual).toBe(2);
 */
export function mapFirst<TSource, TMapped>(
  array: TSource[],
  mapper: (item: TSource, index: number) => TMapped | null
): TMapped | null {
  let index = 0;
  for (const item of array) {
    const mapped = mapper(item, index++);
    if (mapped !== null) {
      return mapped;
    }
  }
  return null;
}
