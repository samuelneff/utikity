import { countMatching } from './countMatching';
import { hasValue } from './hasValue';

/**
 * Counts the number of items in an array that have values--anything that's not `null`, `undefined`,
 * a blank string, an empty array, an empty object, empty Map, empty Set, or `NaN`.
 *
 * @example
 *
 * const input = [ 1, 2, 'a', null, undefined, '', [], Number.NaN ];
 * const actual = countValues(input);
 * expect(actual).toBe(3);
 *
 * @see {@link countMatching}
 * @see {@link hasValue}
 */
export function countValues(array: unknown[]) {
  return countMatching(array, hasValue);
}
