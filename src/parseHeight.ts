import { ExError } from './ExError';
import { isNullUndefinedOrEmpty } from './isNullUndefinedOrEmpty';
import { regexExtractCaptures } from './regexExtractCaptures';

const heightPattern = /^(\d+)' ?(\d+)"$/;

/**
 * Given a string in the form `5' 8"` parses the value to height in inches.
 *
 * Returns null if the input is null or undefined and throws an error if
 * the input string is not a valid height string.
 *
 * @example
 * const actual = parseHeight(`5' 8"`);
 * expect(actual).toBe(68);
 */
export function parseHeight(height: string | null | undefined) {
  if (isNullUndefinedOrEmpty(height)) {
    return null;
  }

  const parts = regexExtractCaptures(height, heightPattern);
  if (parts !== null) {
    return Number.parseInt(parts[0]) * 12 + Number.parseInt(parts[1]);
  }

  throw new ExError('Unable to convert height in inches.', { height });
}
