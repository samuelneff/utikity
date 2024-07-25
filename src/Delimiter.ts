/**
 * Indicator for {@link substringStart} and {@link substringEnd} for whether the delimiter should be
 * included in the result.
 *
 * @example
 * // include the delimiter
 *
 * const actual = substringStart('This is a test', 'a', Delimiter.include);
 * expect(actual).toBe('This is a');
 *
 * @example
 * // exclude the delimiter
 *
 * const actual = substringStart('This is a test', 'a', Delimiter.exclude);
 * expect(actual).toBe('This is ');
 *
 * @see {@link substringStart}
 * @see {@link substringEnd}
 */
export enum Delimiter {
  include = 'include',
  exclude = 'exclude,'
}
