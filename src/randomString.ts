import { isRealNumber } from './isRealNumber';
import { randomItem } from './randomItem';

export const defaultRandomChars = 'abcdefghijklmnopqrstuvwxyz01234567890';

export function randomString(length: number, chars?: string): string;
export function randomString(pattern: string, chars?: string): string;

/**
 * Returns a random string composed of letters from the provided characters string with with a length between
 * the specified min and max, inclusive of max.
 */
export function randomString(lengthOrPattern: any, chars: string = defaultRandomChars): string {
  return randomStringImpl(
    isRealNumber(lengthOrPattern)
      ? 'x'.repeat(lengthOrPattern)
      : lengthOrPattern,
    chars
  );
}

function randomStringImpl(pattern: string, chars: string) {
  let s = '';

  for (const c of pattern) {
    s += c === 'x' ? randomItem(chars) : c;
  }

  return s;
}

export function createRandomStringGenerator(pattern: string, chars: string = defaultRandomChars) {
  return function generateRandomString() {
    return randomString(pattern, chars);
  }
}
