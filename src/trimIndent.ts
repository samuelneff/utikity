import { defaultTemplateLiteral } from './defaultTemplateLiteral';
import { minIndent } from './minIndent';

/**
 * Given a multi-line string, trims the whitespace at the beginning of each line to be consistent
 * such that the line with the least leading whitespace is fully left justified and the whitespace
 * leading all other lines is appropriately adjusted. This allows you to indent template strings
 * in code per their indentation level in the code itself with the resulting string being left
 * justified. The indentation on the first and last lines are ignored if zero so the starting
 * and ending tick marks can be on lines by themselves. Leading and trailing empty lines are
 * also removed.
 *
 * @example
 *
 * // notice indentation of the template string is 2 spaces and then 4 spaces
 * const message = trimIndent`
 *   function ping() {
 *     return pong();
 *   }
 * `;
 *
 * const actualLines = message.split('\n');
 * expect(actualLines.length.toBe(3); // three lines
 * expect(actualLines[0][0]).toBe('f'); // first character of message 'f'
 * expect(message[message.length - 1]).toBe('}'); // last character of message is the bracket
 * expect(actualLines[1]).toStartWith('  return'); // line 2 has an indentation of only 2 spaces
 * expect(actualLines[2]).toBe('}'); // line 3 is the bracket without whitespace
 *
 * @see {@link defaultTemplateLiteral}
 * @see {@link minIndent}
 */
export function trimIndent(multilineText: string): string;
export function trimIndent<
  Elem extends string,
  Template extends ReadonlyArray<Elem>,
>(template: Template, ...values: unknown[]): string;

export function trimIndent(strings: string | string[], ...values: unknown[]): string {

  const source = defaultTemplateLiteral(strings, ...values);
  const lines = source.split('\n');
  const indent = minIndent(lines);
  return lines.map(trimIndentLine).join('\n').trim();

  function trimIndentLine(line: string): string {
    return line.startsWith(' ') ? line.substring(indent) : line;
  }
}
