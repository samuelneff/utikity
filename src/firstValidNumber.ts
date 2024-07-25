
/**
 * Given an array of numbers returns the first one that is a valid number or null if none
 * are valid numbers. Valid in this case is not `undefined`, `null`, `NaN`, or postive
 * or negative `Infinity`.
 *
 * @example
 * const numbers = [ undefined, null, 1, 2 ];
 * expect(firstValidNumber(numbers)).toBe(1);
 */
export function firstValidNumber(...maybeNumbers: (number | unknown)[]): number | null {
  return maybeNumbers.find(maybeNumber =>
    Number.isFinite(maybeNumber as number),
  ) as number | undefined
    ?? null;
}
