import { nonLatinLettersRegex } from './constants';

/**
 * Given a string with characters including punctuation, removes all non-extended-Latin characters
 * and converts the string to lowercase, useful for creating a search-appropriate string from
 * a punctuated string. This differs from using `[^\w]` replacement in that it supports
 * accented characters. Does not convert extended-Latin characters to Latin-26—it leaves accents
 * in place.
 *
 * @example
 *
 * const actual = standardizeSearchText('¡Vamos mañana');
 * expect(actual).toBe('vamosmañana');
 */
export function standardizeSearchText(...text: string[]) {
  return text.join('').replace(nonLatinLettersRegex, '').toLocaleLowerCase();
}
