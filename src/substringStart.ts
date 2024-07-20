import { Delimiter, isNullOrUndefined } from '.';

/**
 * Returns the start of the string through the delimiter and optionally including the delimiter. By default
 * the delimiter is not included.
 *
 * @example
 *
 * const firstName = substringStart('John Doe', ' ');
 * expect(firstName).toBe('John');
 *
 * @see {@link Delimiter}
 * @see {@link substringEnd}
 */
export function substringStart(text: string | undefined, delimiter: string, includeDelimiter: Delimiter = Delimiter.exclude): string {
  const index = text?.indexOf(delimiter);
  return (
    isNullOrUndefined(index) || index === -1
      ? text
      : text?.substring(0, index + (includeDelimiter === Delimiter.include ? delimiter.length : 0))
  ) ?? '';
}
