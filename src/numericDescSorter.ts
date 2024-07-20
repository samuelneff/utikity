/**
 * Function for use with {@link !Array.sort} that sorts values numerically in descending order.
 *
 * @example
 * const a = [1, 3, 2, 4];
 * a.sort(numericDescSorter);
 * expect(a).toEqual([4, 3, 2, 1]);
 *
 * @see {@link !Array.sort}
 */
export function numericDescSorter(x: number, y: number) {
  return y - x;
}
