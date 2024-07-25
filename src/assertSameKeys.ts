import { compareKeys } from './compareKeys';
import { ExError } from './ExError';

/**
 * Throws an error if two objects don't have the exact same set of keys. The details of which
 * keys are msising or extra are in the error metadata.
 *
 * @example
 * const source = {
 *   a: 'A',
 *   b: 'B',
 *   c: 'C',
 * };
 * const target = {
 *   b: 'B',
 *   c: 'C',
 *   d: 'D',
 * }
 * expect(() => assertSameKeys(source, target)).toThrowErrorMatchingInlineSnapshot('');
 *
 * @see {@link assertSameArrays}
 * @see {@link compareKeys}
 */
export function assertSameKeys<T extends {}>(
  expected: T,
  actual: T,
  staticMessage: string = "Key mismatch; some keys are missing or were unexpected.",
  extraMetadata: Record<string, unknown> = {}
) {
  const comparison = compareKeys(expected, actual);
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
