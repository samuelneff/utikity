import { localeIncludes } from './localeIncludes';

/**
 * Case-insensitive base-character check if text starts with a specific substring.
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
