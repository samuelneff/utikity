import { allLatinLetters } from './constants';

const oneWordRegex = new RegExp(`^[${ allLatinLetters }]+$`);

/**
 * Tests that the value consists of only a single word with only extended Latin letters,
 * no spaces or punctuation or other characters. See {@link allLatinLetters } for an
 * explanation and list of allowed characters.
 *
 * @example
 * expect(isOneWord('Word')).toBeTruthy();
 * expect(isOneWord('Mañana')).toBeTruthy();
 *
 * expect(isOneWord('Hello there')).toBeFalsy();
 * expect(isOneWord('Thirty-two')).toBeFalsy();
 * expect(isOneWord('')).toBeFalsy();
*/
export function isOneWord(maybeWord: string) {
  return oneWordRegex.test(maybeWord);
}
