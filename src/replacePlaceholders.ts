import { escapeRegExp } from 'lodash';

/**
 * Arguments for {@link replacePlaceholers} which is a very basic template replacement system.
 */
export interface ReplacePlaceholderArgs {
  /** The template text. */
  text: string;
  /** A Record of placeholders that can be replaced. */
  placeholders: Record<string, unknown>;

  /** The prefix string that identifies the start of placeholder. Defaults to `$`. */
  markerPrefix?: string;

  /** The suffix string that identifies the end of a placeholder. Defaults to an empty string. */
  markerSuffix?: string;
}

/**
 * Very basic template processing that replaces the provided placeholders in an input string,
 * optionally with specified prefix and/or suffix.
 *
 * @example
 * // Simple example with default markers
 *
 * const actual = replacePlaceholers({
 *   text: 'Hello $firstName $lastName!',
 *   placeholders: {
 *     firstName: 'John',
 *     lastName: 'Doe'
 *   }
 * });
 *
 *
 * @example
 * // Example with custom markers
 *
 * const actual = replacePlaceholers({
 *   text: 'Hello %firstName% %lastName%!',
 *   placeholders: {
 *     firstName: 'John',
 *     lastName: 'Doe'
 *   },
 *   markerPrefix: '%',
 *   markerSuffix: '%',
 * });
 *
 * expect(actual).toBe('Hello John Doe!');
 *
 * @see {@link ReplacePlaceholderArgs}
 */
export function replacePlaceholers({
  text,
  placeholders,
  markerPrefix = '$',
  markerSuffix = ''
}: ReplacePlaceholderArgs) {

  const placeholderKeysAsPattern = Object.keys(placeholders)
    .map(escapeRegExp)
    .join('|');

  const placeholderRegExp = new RegExp(
    `${ escapeRegExp(markerPrefix) }(${ placeholderKeysAsPattern })${ escapeRegExp(markerSuffix) }`,
    'g'
  );

  return text.replaceAll(placeholderRegExp, replaceOnePlaceholder);

  function replaceOnePlaceholder(_: string, placeholder: string) {
    return String(placeholders[ placeholder ] ?? '');
  }
};


