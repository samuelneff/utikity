import { ExError } from './ExError';
import { compareArrays } from './compareArrays';
/**
 * Throws an error if two arrays don't have the same values with details of the differences.
 *
 * @example
 * const source = [ 'a', 'b', 'c' ];
 * const target = [ 'b', 'c', 'd' ]
 * expect(() => assertSameArrays(source, target)).toThrowErrorMatchingInlineSnapshot('');
 *
 * @see {@link assertSameKeys}
 * @see {@link compareArrays}
 */
export function assertSameArrays<T extends {}>(
  expected: T[],
  actual: T[],
  staticMessage: string = "Array items mismatch; expected arrays to have the same content but they were different.",
  extraMetadata: Record<string, unknown> = {}
) {
  const comparison = compareArrays(expected, actual);
  if (comparison.missing.length === 0 && comparison.extra.length === 0) {
    return;
  }

  throw new ExError(
    staticMessage,
    {
      ...extraMetadata,
      ...comparison,
    }
  );
}
