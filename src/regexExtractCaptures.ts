export enum RegexExtractCapturesResult {
  singleFromOne,
  manyFromOne,
  singleFromMany,
  manyFromMany,
  flattenedFromMany,
}

export type RegexExtractCapturesResultIsSingle = RegexExtractCapturesResult.singleFromOne;
export type RegexExtractCapturesResultIsFlatMany =
  | RegexExtractCapturesResult.singleFromMany
  | RegexExtractCapturesResult.manyFromOne
  | RegexExtractCapturesResult.flattenedFromMany;
export type RegexExtractCapturesResultIsNestedMany = RegexExtractCapturesResult.manyFromMany;

/**
 * Extract a single capture group from one match returning a string.
 */
export function regexExtractCaptures(
  search: string,
  pattern: RegExp,
  resultType: RegexExtractCapturesResultIsSingle
): string | null;

/**
 * Extract a single capture from many matches, many captures from one match,
 * or a flattened array of many captures from many matches, returning an array of strings.
 */
export function regexExtractCaptures(
  search: string,
  pattern: RegExp,
  resultType?: RegexExtractCapturesResultIsFlatMany,
): string[] | null;

/**
 * Return many captures from many matches as a nested array of string arrays; almost identical
 * to {@link !String.matchAll} except only the captures are returned, not the full match.
 */
export function regexExtractCaptures(
  search: string,
  pattern: RegExp,
  resultType: RegexExtractCapturesResultIsNestedMany,
): string[][] | null;

/**
 * Extract matches based on specified result type and the return type will depend on the
 * provided result type.
 */
export function regexExtractCaptures(
  search: string,
  pattern: RegExp,
  resultType: RegexExtractCapturesResult,
): string | string[] | string[][] | null;

/**
 * Executes a RegExp match against a string and returns the capture results, either a single
 * string, an array of strings, or nested array of string arrays, depending on the
 * requested result type and pattern. It's a wrapper around {@link !String.matchAll} with
 * an easier to work with result.
 *
 * @example
 * // Extract a single capture group from one match
 * const actual = regexExtractCaptures(
 *   'This is a test string.',
 *   /t(\w+)t/,
 *   RegexExtractCapturesResult.singleFromOne,
 * );
 *
 * expect(actual).toBe('es');
 *
 * @example
 * // Extract a single capture from many matches
 * const actual = regexExtractCaptures(
 *   'This is a test string.',
 *   /(?:^|\s)(\w)/,
 *   RegexExtractCapturesResult.singleFromMany,
 * );
 *
 * expect(actual).toEqual(['T', 'i', 'a', 't', 's']);
 *
 * @example
 * // Extract many captures from the only or first match
 * const actual = regexExtractCaptures(
 *   'This is a test string.',
 *   /([\w ]+)(^\w)/,
 *   RegexExtractCapturesResult.manyFromOne,
 * );
 *
 * expect(actual).toEqual(['This is a test string', '.']);
 *
 * @example
 * // Extract many captures from many matches, returning a nested array
 * const actual = regexExtractCaptures(
 *   'This is a test string.',
 *   /(\w)(\w*)/,
 *   RegexExtractCapturesResult.manyFromMany,
 * );
 *
 * expect(actual).toEqual(
 *   [
 *     [ 'T', 'his' ],
 *     [ 'i', 's' ],
 *     [ 'a', '' ],
 *     [ 't', 'est' ],
 *     [ 's', 'tring' ],
 *   ]
 * );
 *
 * @example
 * // Extract many captures from many matches and flatten to a single array of strings
 * const actual = regexExtractCaptures(
 *   'This is a test string.',
 *   /(\w)(\w*)/,
 *   RegexExtractCapturesResult.flattenedFromMany,
 * );
 *
 * expect(actual).toEqual(
 *   [
 *     'T',
 *     'his',
 *     'i',
 *     's',
 *     'a',
 *     '',
 *     't',
 *     'est',
 *     's',
 *     'tring',
 *   ]
 * );
 *
 * @see {@link !String.matchAll}
 */
export function regexExtractCaptures<T extends RegexExtractCapturesResult | undefined>(
  search: string,
  pattern: RegExp,
  resultType?: T,
): string | string[] | string[][] | null {
  const globalPattern = pattern.global
    ? pattern
    : new RegExp(pattern, `g${pattern.flags}`);

  const matches = [...search.matchAll(globalPattern)];
  if (matches.length === 0) {
    return null;
  }

  const nested = matches.map(
    ([_fullMatch, ...groupMatches]) => groupMatches,
  );

  return (
    resultType === RegexExtractCapturesResult.singleFromOne
      ? nested[0][0]
      : resultType === RegexExtractCapturesResult.manyFromMany
        ? nested
        : resultType === RegexExtractCapturesResult.singleFromMany
          ? nested.map(([firstOfEach]) => firstOfEach)
          : nested.flat()
  );
}
