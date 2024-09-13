import { isNullOrUndefined } from './isNullOrUndefined';

/**
 * Counts the number of items in the array that match the predicate function.
 *
 * @example
 * function isOdd(value: number) {
 *   return value & 1 === 1;
 * }
 *
 * const input = [ 1, 2, 3, 4, 5 ];
 * const actual = countMatching(input, isOdd);
 * expect(actual).toBe(3);
 *
 * @see {@link countValues}
 */
export function countMatching<T>(array: T[] | null | undefined, predicate: (item: T) => boolean) {

  if (isNullOrUndefined(array)) {
    return 0;
  }

  let count = 0;
  if (Array.isArray(array)) {
    array.forEach(item => {
      if (predicate(item)) {
        count++;
      }
    });
  }
  return count;
}