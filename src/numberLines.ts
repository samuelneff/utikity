/**
 * Given an array of strings, return a new array with each string prefixed by the one-based
 * index of that string in the array, unless there is only one line in which no prefix
 * is applied.
 *
 * @example
 * // Number lines
 * const input = trimIndent`
 *   This is the first line.
 *   This is the second line.
 * `.split('\n');
 *
 * const actual = numberLines(input);
 *
 * expect(actual[0]).toBe('1> This is the first line.');
 * expect(actual[1]).toBe('2> This is the second line.');
 *
 * @example
 * // Only one line
 * const input = ['This is the only line.'];
 * const actual = numberLines(input);
 * expect(actual[0]).toBe('This is the only line.');
 *
 * @see {@link trimIndent}
 */
export function numberLines(strings: string[]) {
  return strings.length <= 1
    ? strings
    : strings.map((s, i) => `${i + 1}> ${s}`);
}
