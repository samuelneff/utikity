import { compareArrays } from './compareArrays';

/**
 * Results of comparison of keys between two objects with {@link compareKeys}.
 *
 * @see {@link compareKeys}
 */
export type ObjectComparisonResult<T> = {
  expected: T;
  actual: T;
  missing: string[];
  extra: string[];
}

/**
 * Compares the keys of two objects and returns arrays of missing and extra keys; useful in validation.
 *
 * @example
 * const source = {
 *   a: 'A',
 *   b: 'B',
 *   c: 'C',
 * };
 * const target = {
 *   b: 'B',
 *   c: 'C',
 *   d: 'D',
 * }
 * const actual = compareKeys(source, target);
 *
 * const expected = {
 *   expected: source,
 *   actual: target,
 *   missing: [ 'a' ],
 *   extra: [ 'd' ],
 * };
 *
 * expect(actual).toEqual(expected);
 *
 * @see {@link assertSameKeys}
 * @see {@link compareArrays}
 */
export function compareKeys<T extends {}>(expected: T, actual: T): ObjectComparisonResult<T> {
  const arrayComparison = compareArrays(Object.keys(expected), Object.keys(actual));
  return {
    ...arrayComparison,
    expected,
    actual,
  };
}
