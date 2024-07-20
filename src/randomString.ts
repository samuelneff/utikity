import { isRealNumber } from './isRealNumber';
import { randomItem } from './randomItem';

/**
 * Default set of characters used by {@link randomString} and {@link createRandomStringGenerator}.
 *
 * @see {@link randomString}
 * @see {@link createRandomStringGenerator}
 */
export const defaultRandomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Returns a random string of the specified length.
 */
export function randomString(length: number, chars?: string): string;

/**
 * Returns a random string matching the provided pattern where `x` is replaced
 * by a random character.
 */
export function randomString(pattern: string, chars?: string): string;

/**
 * Returns a random string composed of letters from the provided characters matching the pattern
 * or provided length. If no character string is provided the default characters are lowercase
 * Latin-26 and numbers.
 *
 * @example
 * // Using length and default characters
 * const actual = randomString(5);
 *
 * expect(actual).toMatch(/^[\w\d]{5}$/);
 *
 * @example
 * // Using pattern and custom characters
 * const actual = randomString('xx-xxx', '123456');
 *
 * expect(actual).toMatch(/^[123456]{2}-[123456]{3}$/);
 *
 * @see {@link createRandomStringGenerator}
 * @see {@link unambiguousString}
 * @see {@link defaultRandomChars}
*/
export function randomString(lengthOrPattern: any, chars: string = defaultRandomChars): string {
  return randomStringImpl(
    isRealNumber(lengthOrPattern)
      ? 'x'.repeat(lengthOrPattern)
      : lengthOrPattern,
    chars
  );
}

function randomStringImpl(pattern: string, chars: string) {
  let s = '';

  for (const c of pattern) {
    s += c === 'x' ? randomItem(chars) : c;
  }

  return s;
}

/**
 * Creates a random string generating function with the specified function and optionally a
 * custom set of characters. See {@link randomString} for more details on how the random
 * string is generated and pattern, where `x` is replaced by a random character.
 *
 * @example
 * const generator = createRandomStringGenerator('x-xx-x', 'abcde');
 * const actual = generator();
 *
 * expect(actual).toMatch(/^[abcde]-[abcde]{2}-[abcde]$/);
 *
 * @see {@link randomString}
 * @see {@link createUnambiguousStringGenerator}
 */
export function createRandomStringGenerator(pattern: string, chars: string = defaultRandomChars) {
  return function generateRandomString() {
    return randomString(pattern, chars);
  }
}
