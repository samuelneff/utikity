import { escapeRegExp } from 'lodash';

const replaceCharsRegexCache = {} as Record<string, RegExp>;

/**
 * Given a source string and string of characters, replace any one of the characters in the source string
 * with the entire replacement string. Useful when the characters to replace are dynamic; it supports
 * escaping any characters that are special characters in {@link !RegExp}.
 *
 * @example
 *
 * const actual = replaceChars('John (James) Doe', '()', '"');
 * expect(actual).toBe('John "James" Doe');
 *
 * @see {@link !RegExp}
 */
export function replaceChars(
  source: string,
  chars: string,
  replacement: string,
) {
  const regex =
    replaceCharsRegexCache[chars] ||
    (replaceCharsRegexCache[chars] = new RegExp(`[${escapeRegExp(chars)}]`, 'g'));
  return source.replaceAll(regex, replacement);
}
