import { countMatching } from './countMatching';
import { hasValue } from './hasValue';

/**
 * Counts the number of items in an array that have values--anything non-null, not undefined, not blank, not an empty array, and not NaN.
 */
export function countValues(array: unknown[]) {
  return countMatching(array, hasValue);
}
