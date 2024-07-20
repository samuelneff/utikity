import { Delimiter } from './Delimiter';
import { isNullOrUndefined } from './isNullOrUndefined';

/**
 * Returns the end of the string from the delimiter afterwards, optionally including the delimiter.
 *
 * @example
 *
 * const lastName = substringEnd('John Doe', ' ');
 * expect(lastName).toBe('Doe');
 *
 * @see {@link Delimiter}
 * @see {@link substringStart}
 */
export function substringEnd(text: string | undefined, delimiter: string, includeDelimiter: Delimiter = Delimiter.exclude): string {
  const index = text?.indexOf(delimiter);
  return (
    isNullOrUndefined(index) || index === -1
      ? text
      : text?.substring(index + (includeDelimiter === Delimiter.include ? 0 : delimiter.length))
  ) ?? '';
}
