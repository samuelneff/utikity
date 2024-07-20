import { replaceChars } from './replaceChars';

/**
 * Given a source string and string of characters, remove any of the characters in the source string,
 * supporting characters that would otherwise need to be escaped in a {@link !RegExp}.
 *
 * Alias for `replaceChars(source, chars, '')`.
 *
 * @example
 *
 * const actual = removeChars('John (James) Doe', '()');
 * expect(actual).toBe('John James Doe');
 *
 * @see {@link !RegExp}
 */
export function removeChars(source: string, chars: string): string {
  return replaceChars(source, chars, '');
}
