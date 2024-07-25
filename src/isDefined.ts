/**
 * Returns true if the provided value is not null or undefined.
 *
 * @example
 * expect(isDefined('')).toBeTruthy();
 * expect(isDefined(true)).toBeTruthy();
 * expect(isDefined(1)).toBeTruthy();
 * expect(isDefined({})).toBeTruthy();
 * expect(isDefined([])).toBeTruthy();
 *
 * expect(isDefined(undefined)).toBeFalsy();
 * expect(isDefined(null)).toBeFalsy();
 */
export function isDefined<T>(value: T | undefined | null): value is NonNullable<T> {
  return value !== undefined && value !== null;
}
