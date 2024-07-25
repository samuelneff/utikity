/**
 * Throws an error if the value passed in is not an array, optionally with a custom message.
 *
 * @example
 *
 * expect(() => assertArray({})).toThrow();
 *
 * @see {@link assertNotEmpty}
 * @see {@link assertNotNull}
 */
export function assertArray<T>(actual: T, message?: string): T {
  if (Array.isArray(actual)) {
    return actual;
  }

  throw new Error(message ?? `Array was expected but found ${ typeof actual }.`);
}
