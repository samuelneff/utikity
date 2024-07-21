import { dateTimeRegex } from './constants';

/**
 * Given an unknown value, it returns a Date object if that value is an ISO-8601
 * date string, or the input value otherwise.
 *
 * Labeled "fast" because it's used in {@link jsonParseBetter} against every value and testing
 * showed the double-testing method it uses is faster than directly parsing or other
 * preliminary checks.
 *
 * @example
 * expect(fastMaybeParseDateString('2004-07-19')).toEqual(new Date('2004-07-19'));
 * expect(fastMaybeParseDateString('2004-07-19T08:43:19')).toEqual(new Date('2004-07-19T08:43:19'));
 * expect(fastMaybeParseDateString('2004-07-19T08:43:19.123')).toEqual(new Date('2004-07-19T08:43:19.123'));
 * expect(fastMaybeParseDateString('2004-07-19T08:43:19.123Z')).toEqual(new Date('2004-07-19T08:43:19.123Z'));
 *
 * expect(fastMaybeParseDateString(1)).toBe(1);
 * expect(fastMaybeParseDateString('text')).toBe('text');
 * expect(fastMaybeParseDateString(undefined)).toBeUndefined();
 * expect(fastMaybeParseDateString(null)).toBeNull();
 * expect(fastMaybeParseDateString([])).toEqual([]);
 * expect(fastMaybeParseDateString({})).toEqual({});
 *
 * @see {@link jsonParseBetter}
 */
export function fastMaybeParseDateString<T>(value: T): T | Date {
  if (typeof value === 'string' && dateTimeRegex.test(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.valueOf())) {
      return date;
    }
  }

  return value;
}
