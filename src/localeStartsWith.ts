import { localeIncludes } from './localeIncludes';

/**
 * Case-insensitive base-character check if text starts with a specific substring.
 *
 * @example
 * const input = "Mañana";
 * const actual = localeStartsWith(input, "man"); // notice n and ñ are considered equal
 * expect(actual).toBeTruthy();
 *
 * @see {@link localeIncludes}
 */
export function localeStartsWith(text: string, substring: string, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions) {
  return localeIncludes(
    text,
    substring,
    0,
    locales,
    options
  );
}
