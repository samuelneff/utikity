export function defaultTemplateLiteral<
  Elem extends string,
  Template extends ReadonlyArray<Elem>,
  Value extends string,
  Values extends Value[]
>(template: Template, ...values: [ ...Values ]): string;
export function defaultTemplateLiteral(multilineText: string): string;
export function defaultTemplateLiteral(strings: string | string[], ...values: unknown[]): string;

/**
 * Implementation of the default template literal behavior, useful in composing template literals.
 *
 * @example
 *
 * function trim(strings: string[], ...values: unknown[]) {
 *   const interpolated = defaultTemplateLiteral(strings, ...values);
 *   return interpolated.trim();
 * }
 *
 * const actual = trim`
 *   This is some text.
 * `
 * expect(actual).toEqual('This is some text.');
 *
 * @see {@link trimIndent}
 */
export function defaultTemplateLiteral(strings: string | string[], ...values: unknown[]): string {

  return typeof strings === 'string'
    ? strings
    : strings.length === 1
      ? strings[ 0 ]
      : strings.reduce(
        (combinedText, stringPart, stringIndex) =>
          `${ combinedText }${ stringPart }${ values[ stringIndex ] ?? '' }`,
        ''
      );
}