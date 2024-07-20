import { isNullOrUndefined } from './isNullOrUndefined';
import { isNullUndefinedOrEmpty } from './isNullUndefinedOrEmpty';

/**
 * Template formatter that returns the formatted string if the interpolated values have content
 * but returns an empty string if the interpolated values are all empty, null, or undefined.
 *
 * @example
 * // Mixed values sample
 * const firstName = 'John';
 * const lastName = null;
 * const actual = unlessEmpty`Welcome ${firstName} ${lastName}`;
 *
 * expect(actual).toEqualIgnoringWhitespace('Welcome John');
 *
 * @example
 * // All values null example
 * const firstName = null;
 * const lastName = null;
 * const actual = unlessEmpty`Welcome ${firstName} ${lastName}`;
 *
 * expect(actual).toEqualIgnoringWhitespace('');
 *
 * @see [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
 */
export function unlessEmpty(
  strings: TemplateStringsArray,
  ...values: any[]
): string {
  return values.length === 0 || values.every(isNullUndefinedOrEmpty)
    ? ''
    : String.raw(
      strings,
      ...(
        values.map(
          value => isNullOrUndefined(value) ? '' : value
        )
      )
    );
}
