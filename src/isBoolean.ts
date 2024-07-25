/**
 * Returns true if the value is a true boolean.
 *
 * @example
 * expect(isBoolean(true)).toBeTruthy();
 * expect(isBoolean(false)).toBeTruthy();
 *
 * expect(isBoolean(1)).toBeFalsy();
 * expect(isBoolean('true')).toBeFalsy();
 * expect(isBoolean(null)).toBeFalsy();
 * expect(isBoolean(undefined)).toBeFalsy();
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
