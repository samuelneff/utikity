import { lowercaseLettersAndNumbers } from './constants';
import { isEmpty } from './isEmpty';
import { randomInt } from './randomInt';

/**
 * Returns one random character from the `chars` string if provided or from all lowercase letters
 * and numbers if `chars` is not provided.
 */
export function randomChar(chars?: string): string {
  const appliedChars: string = isEmpty(chars)
    ? lowercaseLettersAndNumbers
    : chars;

  const index = randomInt(appliedChars.length - 1);
  return appliedChars[index];
}
