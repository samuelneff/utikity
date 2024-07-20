import { upperFirst, camelCase } from 'lodash';

/**
 * Returns the specified string in Pascal-case—camel case but with the first letter
 * upper case. We recommend [npm!lodash] for other case conversions, but for some reason
 * they don't provide Pascal-case conversion.
 *
 * @example
 * const actual = pascalCase('SOME_VARIABLE');
 * expect(actual).toBe('SomeVariable');
 *
 * @see [npm!lodash]
 */
export function pascalCase(value: string) {
  return upperFirst(camelCase(value));
}
