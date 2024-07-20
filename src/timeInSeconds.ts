import { secondsPerHour, secondsPerMinute } from './constants';

/**
 * Returns the time value of a date in seconds since midnight.
 *
 * @example
 * const date = new Date('2024-07-19T07:35');
 * const actual = timeInSeconds(date);
 * expect(actual).toBe(27300); // 7 hours and 35 minutes = 7 * 60 * 60 + 35 * 60
 */
export function timeInSeconds(date?: Date): number {
  const d = date ?? new Date();
  return d.getSeconds() +
    d.getMinutes() * secondsPerMinute +
    d.getHours() * secondsPerHour;
}
