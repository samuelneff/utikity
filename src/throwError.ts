
export function throwError(error: Error): never;
export function throwError(message: string): never;
/**
 * Throws an error with the provided error or an {@link !Error} with the provided message.
 * Useful in places where the `throw` statement cannot be used, such as in a ternary.
 *
 * @example
 *
 * function addValues(x: number, y: number) {
 *   // contrived example, an `if` could be used here...
 *   return Number.isNan(x) || Number.isNan(y)
 *     ? throwError('Values must be numbers')
 *     : x + y;
 * }
 *
 * expect(() => addValues(1, Number.NaN)).toThrow();
 */
export function throwError(messageOrError: string | Error): never {
  throw typeof messageOrError === 'string'
    ? new Error(messageOrError)
    : messageOrError;
}
