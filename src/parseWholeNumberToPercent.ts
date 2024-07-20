/**
 * Given a string with a number between zero and a hundred, returns that number as a percent
 * betwen 0 and 1.
 *
 * @example
 * const actual = parseWholeNumberToPercent('75');
 * expect(actual).toBe(0.75);
 */
export function parseWholeNumberToPercent(value: string): number {
  return Number.parseFloat(value) / 100;
}
