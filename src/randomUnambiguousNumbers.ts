import { unambiguousNumbers } from './constants';
import { randomString } from './randomString';

/**
 * Returns a string of specified length consiting of unambiguous numbers. See {@link unambiguousString}
 * for a complete table and explanation.
 *
 * @example
 * const actual = randomUnambiguousNumbers(4);
 * expect(actual).toMatch(/^[3479]{4}$/);
 */
export function randomUnambiguousNumbers(length: number) {
  return randomString(length, unambiguousNumbers);
}
