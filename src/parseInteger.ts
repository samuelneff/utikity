import { isDefined } from '.';

/**
 * Parses a value numeric string as an integer and returns null in all other cases. Differs
 * from {@link !Number.parseInt} in that it will throw an error.
 *
 * @example
 * // Null for something that can't be an integer where standard parseInt would return 75
 * const actual = parseInteger('75abc');
 * expect(actual).toBeNull();
 *
 * @example
 * // A valid integer
 * const actual = parseInteger('75');
 * expect(actual).toBe(75);
 *
 * @see {@link !Number.parseInt}
 */
export function parseInteger(value: string | null | undefined) {
  return isDefined(value) && /^\d+$/.test(value)
    ? Number.parseInt(value)
    : null;
}
