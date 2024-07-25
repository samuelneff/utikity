import { defaultTemplateLiteral } from './defaultTemplateLiteral';

/**
 * Replaces all consequitive whitespace, of any type, to be a single space.
 *
 * @example
 *
 * const actual = collapseWhitespace`
 *   This is a
 *   multi-line string.
 * `;
 *
 * expect(actual).toBe('This is a multi-line string');
 *
 * @see {@link trimIndent}
 */
export function collapseWhitespace(strings: string[], ...values: unknown[]) {
  const text = defaultTemplateLiteral(strings, values);
  return text.replace(/\s{2,}/g, ' ').trim();
}