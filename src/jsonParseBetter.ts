import { ExError } from './ExError';
import { fastMaybeParseDateString } from './fastMaybeParseDateString';
import { isNullUndefinedOrEmpty } from './isNullUndefinedOrEmpty';

/**
 * Non-standard wrapper for {@link !JSON.parse} that deserializes dates when strings match
 * the most common ISO–8601 date format and provides improved error messaging when parse fails.
 *
 * | Enhancement | Notes |
 * | ----------- | ----- |
 * | Dates | Dates that match the most common subset of ISO–8601 are converted to JavaScript {@link !Date} objects. See {@link dateTimeRegex} for more details. |
 * | Error handling | In case of any parsing error the json before, at, and after the error position are additionally included in the message. See the example for details of what additional information is included. |
 *
 * @example
 * // Enhanced date handling
 * const json = '{date: "2024-07-19"}';
 * const actual = jsonParseBetter(json);
 * expect(actual.date).toBeInstanceOf(Date);
 *
 * @example
 * // Bad JSON shows context in the error message
 * try {
 *   jsonParseBetter('{ok: 123, text: "Some string", bad: -}');
 * } catch (error) {
 *   const ex = error as ExError;
 *
 *   const expected = {
 *     jsonLength: 38,
 *     jsonStart: '{ok: 123, text:',
 *     jsonEnd: 'ring", bad: -}',
 *
 *     // These properties are only included if the original parse error includes the position,
 *     // most errors do but not all.
 *     errorPos: 36,
 *     jsonAroundPos: ' string", bad:  >>> - <<< }',
 *     jsonAtPos: '-',
 *     jsonBefore: ' string", bad: ',
 *     jsonAfter: '}',
 *   }
 * }
 *
 * @see {@link !JSON.parse}
 */
export function jsonParseBetter<T = unknown>(json: string | null | undefined): T | null {

  if (isNullUndefinedOrEmpty(json)) {
    return null;
  }

  try {
    return JSON.parse(json, jsonParseBetterReviver);
  } catch (ex: unknown) {
    //
    // All JSON error messages, from v8 source:
    // https://github.com/v8/v8/blob/1db97e57290873fbe50b6115ea38f7ef2ee1854c/src/common/message-template.h#L507
    //
    //  Unexpected end of JSON input
    //  Unexpected number in JSON at position % (line % column %)
    //  Unexpected string in JSON at position % (line % column %)
    //  Unterminated string in JSON at position % (line % column %)
    //  Expected property name or '}' in JSON at position % (line % column %)
    //  Expected ',' or ']' after array element in JSON at position % (line % " "column %)
    //  Expected ',' or '}' after property value in JSON at position " "% (line % column %)
    //  Expected double-quoted property name in JSON at position % (line % " "column %)
    //  Exponent part is missing a number in JSON at position % (line % column " "%)
    //  Expected ':' after property name in JSON at position % (line % column " "%)
    //  Unterminated fractional number in JSON at position % (line % column %)
    //  Unexpected non-whitespace character after JSON at position " "% (line % column %)
    //  Bad escaped character in JSON at position % (line % column %)
    //  Bad control character in string literal in JSON at position % (line % " "column %)
    //  Bad Unicode escape in JSON at position % (line % column %)
    //  No number after minus sign in JSON at position % (line % column %)
    //  \"%\" is not valid JSON
    //  Unexpected token '%', \"%\" is not valid JSON
    //  Unexpected token '%', ...\"%\"... is not valid JSON
    //  Unexpected token '%', ...\"%\" is not valid JSON
    //  Unexpected token '%', \"%\"... is not valid JSON

    const metadata: Record<string, unknown> = {
      jsonLength: json.length,
      jsonStart: json.substring(0, 15),
      jsonEnd: json.substring(json.length - 15),
    };

    const posMatch = ex instanceof Error
      ? ex.message.match(/JSON at position (\d+)/)
      : undefined;

    if (posMatch) {
      const pos = Number.parseInt(posMatch[ 1 ]);

      const jsonAtPos = json.substring(pos, pos + 1);
      const jsonBefore = json.substring(pos - 15, pos);
      const jsonAfter = json.substring(pos + 1, pos + 15);

      Object.assign(
        metadata,
        {
          errorPos: pos,
          jsonAroundPos: `${ jsonBefore } >>> ${ jsonAtPos } <<< ${ jsonAfter }`,
          jsonAtPos,
          jsonBefore,
          jsonAfter,
        }
      );
    }

    throw new ExError('Error parsing JSON.', metadata, ex);
  }
}

function jsonParseBetterReviver(_key: string | number, value: unknown): any {
  return fastMaybeParseDateString(value);
}
