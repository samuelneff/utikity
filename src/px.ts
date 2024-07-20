/**
 * Given a number returns that number with the suffix `px` if it's non-zero or the number
 * zero without a suffix if the number is zero. If a non-number is provided, such as a
 * length string with unit, then the string representation of that value is returned
 *
 * @example
 * // Zero value
 * const actual = px(0);
 * expect(actual).toBe('0');
 *
 * @example
 * // Non-zero value
 * const actual = px(11);
 * expect(actual).toBe('11px');
 *
 * @example
 * // Other unit already included
 * const actual = px('3em');
 * expect(actual).toBe('3em');
 */
export function px(maybeLength: number | unknown) {
  return typeof maybeLength === 'number' && !Number.isNaN(maybeLength) && maybeLength !== 0
    ? `${ maybeLength }px`
    : String(maybeLength);
}
