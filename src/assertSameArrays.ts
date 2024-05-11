import { ExError } from './ExError';
import { compareArrays } from './compareArrays';

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
