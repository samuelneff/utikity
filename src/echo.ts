/**
 * Returns the input value. Sometimes useful in composing lambda functions.
 */
export function echo<T>(input: T): T {
  return input;
}
