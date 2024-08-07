/**
 * Ensures the passed in error is actually an error, and wraps it in an error if it isn't.
 * @example
 * // Wrapping a non-error
 *
 * function throwsNonError() {
 *   try {
 *     throw 'This is a string as an error';
 *   } catch(error) {
 *     throw wrapInErrorIfNeeded(error);
 *   }
 * }
 *
 * expect(throwsNonError).toThrowErrorMatchingInlineSnapshot('');
 *
 */
export function wrapInErrorIfNeeded(ex: unknown): Error {
  return ex instanceof Error
    ? ex
    : new Error(String(ex));
}
