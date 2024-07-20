/**
 * Wraps a function with a new function that negates the result of the first. Useful with
 * predicates such as {@link !Array.filter}.
 *
 * @example
 * function isPositive(value: number) {
 *   return value >= 0;
 * }
 * const isNegative = not(positive);
 *
 * const actual = isNegative(-1);
 * expect(actual).toBeTruthy();
 *
 * @see {@link !Array.filter}
 */
export function not<
  TFunc extends (...args: any[]) => boolean,
  TParams extends Parameters<TFunc>
  >(fn: TFunc) {
  return function notImpl(...args: TParams) {
    return !fn(...args);
  }
}
