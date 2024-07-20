import { isRealNumber } from '.';

export function toStars(count: number): string;
export function toStars(text: string, realLetterCount?: number): string;

/**
 * Returns a string of all astrisks matching the length of the input string optionally
 * keeping the specified number of actual characters, which are split at the beginning
 * of end of the result.
 *
 * @example
 * // Replace all characters
 *
 * const password = 'secret';
 * const safe = toStars(password);
 *
 * expect(safe).toBe('******');
 *
 * @example
 * // Keep some characters
 * const email = 'sam@gmail.com';
 * const safe = toStars(email, 4);
 *
 * expect(safe).toBe('sa*********om');
 *
 * @see {@link !String.repeat}
 */
export function toStars(textOrLength: string | number, realCount: number = 0) {

  if (isRealNumber(textOrLength)) {
    return '*'.repeat(textOrLength);
  }

  const { length } = textOrLength;
  if (realCount === 0 || realCount >= length) {
    return '*'.repeat(length);
  }

  const starCount = length - realCount;
  const startRealCount = Math.ceil(realCount / 2);
  const endRealCount = realCount - startRealCount;

  return [
    textOrLength.substring(0, startRealCount),
    '*'.repeat(starCount),
    textOrLength.substring(length - endRealCount - 1)
  ].join('');
}
