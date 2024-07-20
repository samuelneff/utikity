import { unambiguousLettersAndNumbers } from './constants';
import { createRandomStringGenerator, randomString } from './randomString';

/**
 * Returns an unambiguous string of the specified length.
 */
export function unambiguousString(length: number): string;

/**
 * Returns an unambiguous string of the specified pattern, replacing the letter `x`
 * with an unamiguous character, such as `xxx-xxxx` becoming `je3-7pex`.
 */
export function unambiguousString(pattern: string): string;

/**
 * Returns a string consisting of only unambiguous characters—letters and numbers that are
 * unlikely to be confused with a different letter or number. The characters used are
 * in the constant {@link unambiguousLettersAndNumbers }, `acdefhjkmnpqrtuvxy3479`.
 *
 * @example
 *
 * const errorCode = unambiguousString('xxx-xxxx');
 * const message = `An error occurred. Please contact support with error code ${ errorCode }.`;
 *
 * expect(message).toMatch(/^[acdefhjkmnpqrtuvxy3479]{3}-[acdefhjkmnpqrtuvxy3479]{4}$/);
 *
 * @see {@link unambiguousLetters}
 * @see {@link unambiguousNumbers}
 * @see {@link unambiguousLettersAndNumbers}
 * @see {@link createUnambiguousStringGenerator}
 * @see {@link randomString}
 */
export function unambiguousString(lengthOrPattern: any) {
  return randomString(lengthOrPattern, unambiguousLettersAndNumbers);
}

/**
 * Creates a function that generates unambiguous strings matchign the specified pattern. See
 * {@link unambiguousString} for details of how the unambiguous strings are generated and
 * the expected format of `pattern`.
 *
 * @example
 *
 * const createErrorCode = createUnambiguousStringGenerator('xxx-xxxx');
 *
 * const errorCode = createErrorCode();
 * const message = `An error occurred. Please contact support with error code ${ errorCode }.`;
 *
 * expect(message).toMatch(/^[acdefhjkmnpqrtuvxy3479]{3}-[acdefhjkmnpqrtuvxy3479]{4}$/);
 *
 * @see {@link unambiguousLetters}
 * @see {@link unambiguousNumbers}
 * @see {@link unambiguousLettersAndNumbers}
 * @see {@link createRandomStringGenerator}
 */
export function createUnambiguousStringGenerator(pattern: string) {
  return createRandomStringGenerator(pattern, unambiguousLettersAndNumbers);
}
