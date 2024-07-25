import { isDefined } from './isDefined';
import { isNullOrUndefined } from './isNullOrUndefined';
import { toRecord } from './toRecord';

/**
 * Given an object, returns a copy of that object filtering out all undefined or null values.
 *
 * @example
 *
 * const input = {
 *   a: 'A',
 *   b: 'B',
 *   n: null,
 * };
 * const expected = {
 *   a: 'A',
 *   b: 'B',
 * };
 * expect(filterNullProperties(input)).toEqual(expected);
 */
export function filterNullProperties<T extends {}>(obj: T): T {
  if (isNullOrUndefined(obj)) {
    return obj;
  }

  return toRecord(
    Object.entries(obj).filter(
      ([ _key, value ]) => isDefined(value)
    ),
    ([ key ]) => key,
    ([ , value ]) => value
  ) as T;
}
