import { isEmpty } from './isEmpty';

/**
 * Counts how many times a substring appears in the test string.
 *
 * @example
 * const input = 'This is a test string.';
 * const actual = countOccurrences(input, 'is');
 * expect(actual).toBe(2); // inside This and the word is
 *
 * @see {@link countMatching}
 */
export function countOccurrences(source: string | undefined | null, countText: string) {
  if (isEmpty(source)) {
    return 0;
  }
  if (isEmpty(countText)) {
    return source.length;
  }

  let count = 0;

  for (let i = -2; i < source.length; i++) {
    i = source.indexOf(countText, i);
    if (i === -1) {
      return count;
    }
    count++;
  }

  return count;
}