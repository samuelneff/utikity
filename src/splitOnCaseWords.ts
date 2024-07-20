
const capitalLetterSplitter = /(?=[A-Z])/;

/**
 * Very basic splitting of a stiring on capital letters. Mostly useful in very specific use cases where
 * the input string is known to be in Pascal or camel case.
 *
 * @example
 * const actual = splitOnCaseWords('myIdentifier')
 * expect(actual).toEqual([ 'my', 'Identifier' ]);
 */
export function splitOnCaseWords(text: string) {
  return text.split(capitalLetterSplitter);
}
