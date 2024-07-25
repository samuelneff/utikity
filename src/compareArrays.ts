export type ArrayComparisonResult<T> = {
  expected: T[];
  actual: T[];
  missing: T[];
  extra: T[];
};

/**
 * Compares that two arrays have the same contents by object equality of the
 * individual items, but irrespective of position within the array. When there is
 * a mismatch, full details of missing and/or extra are returned.
 *
 * @param expected The array of expected items.
 * @param actual The array of items we're testing
 * @returns Object with results including original arrays as well as missing and extra elements.
 *
 * @example
 *
 * const source = [ 1, 2, 3 ];
 * const target = [ 3, 4, 5 ];
 * const actual = compareArrays(source, target);
 * const expected = {
 *   expected: source,
 *   actual: target,
 *   missing: [ 1, 2 ],
 *   extra: [ 4, 5 ],
 * };
 * expect(actual).toEqual(expected);
 *
 * @see {@link compareKeys}
 */
export function compareArrays<T>(
  expected: T[],
  actual: T[],
): ArrayComparisonResult<T> {
  return {
    expected,
    actual,
    missing: expected.filter(item => !actual.includes(item)),
    extra: actual.filter(param => !expected.includes(param)),
  };
}
