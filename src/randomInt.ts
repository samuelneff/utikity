import { randomIntBetween } from './randomIntBetween';

/**
 * Returns a random integer between zero and max, inclusive of max.
 *
 * @example
 * const actual = randomIntBetween(8);
 *
 * expect(actual).toBeGreaterThanOrEqualTo(0);
 * expect(actual).toBeLessThanOrEqualTo(8);
 *
 * @see {@link randomIntBetween}
 */
export function randomInt(max: number): number {
  return randomIntBetween(0, max);
}
