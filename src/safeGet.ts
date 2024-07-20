/**
 * Runs the getter and returns the value or returns `null` in case of any error. All `safeXyz` functions
 * are written such that they will never throw an error and instead return `null` in case of error.
 *
 * @example
 * // Successful
 * function addOne(value: number) {
 *   return value + 1;
 * }
 * const actual = safeGet(2, addOne);
 *
 * expect(actual).toBe(3);
 *
 * @example
 * // Suppress an error
 * function throwSomething() {
 *   throw Error('I get ignored.');
 * }
 * const actual = safeGet(throwSomething);
 * expect(actual).toBeNull();
 *
 * @see {@link safe}
 * @see {@link safeObjectEntries}
 */
export function safeGet<TObj, TOut>(
  obj: TObj | undefined | null,
  getter: (obj: TObj) => TOut,
): TOut | null {
  try {
    return obj === undefined || obj === null
      ? null
      : getter(obj);
  } catch {
    return null;
  }
}
