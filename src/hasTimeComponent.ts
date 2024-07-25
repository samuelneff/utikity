import { isDate } from 'lodash';

/**
 * Determines if a Date value has any time component--hours, minutes, seconds, or milliseconds.
 * Note that dates deserialized without a time component but in UTC to any timezone other than
 * UTC will have an hours component due to the conversion.
 *
 * @example
 * expect(hasTimeComponent(new Date('2024-08-22T18:04:13'))).toBeTruthy();
 *
 * expect(hasTimeComponent(new Date(2024, 8, 22))).toBeFalsy();
 */
export function hasTimeComponent(date: Date): boolean {
  return isDate(date) &&
    (
      date.getMinutes() !== 0 ||
      date.getHours() !== 0 ||
      date.getSeconds() !== 0 ||
      date.getMilliseconds() !== 0
    );
}
