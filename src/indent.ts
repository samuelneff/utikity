export function indent(source: string[], indentation?: number): string[]
export function indent(source: string, indentation?: number): string;
/**
 * Adds specified indentation (spaces) to the start of each line. Blank lines
 * do not get indentation.
 *
 * @example
 * // Add indentation to a multi-line string
 *
 * // original has a blank line at the start and end and pre-existing 2 spaces on 2nd and 4th lines and 4 spaces
 * // on the 3rd line, so those three lines will now have two additional spaces.
 * const input = `
 *   function sayHello() {
 *     console.log('Hello');
 *   }
 * `;
 *
 * const actual = indent(input);
 * const actualLines = actual.split('\n');
 *
 * expect(actualLines[0]).toBe(''); // no indentation added to first line
 * expect(actualLines[1]).toStartWith('    f');
 * expect(actualLines[2]).toStartWith('      c');
 * expect(actualLines[3]).toStartWith('    }');
 * expect(actualLines[4]).toBe(''); // no indentation added to last line
 *
 * @example
 * // Add indentation to a an array of strings
 *
 * const input = [
 *   'function sayHello() {',
 *   '  console.log('Hello');',
 *   '}'
 * ];
 *
 * const actual = indent(input, 3); // we passed in an array of strings so we got an array of strings back
 *
 * expect(actual[0]).toStartWith('   f');
 * expect(actual[1]).toStartWith('      c');
 * expect(actual[2]).toStartWith('   }');
 *
 * @see {@link trimIndent}
 */
export function indent(source: string[] | string, indentation = 2) {
  let sourceLines: string[];
  let sourceTypeIsArray: boolean;

  if (Array.isArray(source)) {
    sourceLines = source;
    sourceTypeIsArray = true;
  } else {
    sourceLines = source.split('\n');
    sourceTypeIsArray = false;
  }
  const spaces = ' '.repeat(indentation);
  const result = sourceLines.map(
    line =>
      line.length === 0
        ? ''
        : spaces + line
  );

  return sourceTypeIsArray ? result : result.join('\n');
}