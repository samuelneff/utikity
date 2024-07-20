import { identity } from 'lodash';
import { isNullUndefinedOrEmpty } from './isNullUndefinedOrEmpty';

export function maxOf(items: number[]): number;
export function maxOf<T>(items: T[], selector: (item: T) => number): number;
export function maxOf<T>(items: T[], selector: (item: T) => number, defaultValue: number): number;

/**
 * Returns the largest value in an array of numbers or array of objects with a provided
 * selector, or a default value if the input array is empty. The default value is zero if not provided.
 *
 * @example
 * // Max of an array of numbers
 * const array = [1, 3, 2 ];
 * const actual = maxOf(array);
 * expect(actual).toBe(3);
 *
 * @example
 * // Max of objects with a selector
 * const items = [
 *   { i: 1 },
 *   { i: 3 },
 *   { i: 2 },
 * ];
 * const actual = maxOf(items, item => item.i);
 * expect(actual).toBe(3);
 */
export function maxOf<T>(
  items: T[],
  selector: (item: T) => number = identity,
  defaultValue: number = 0
) {
  if (isNullUndefinedOrEmpty(items)) {
    return defaultValue;
  }

  const calcMax = items.reduce(
    (acc, item) => Math.max(acc, selector(item)),
    Number.MIN_SAFE_INTEGER
  );

  return calcMax === Number.MIN_SAFE_INTEGER
    ? defaultValue
    : calcMax;
}
