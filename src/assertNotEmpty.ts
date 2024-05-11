import { ExError } from './ExError';
import { isNullUndefinedOrEmpty } from './isNullUndefinedOrEmpty';

export function assertNotEmpty<
  T extends string | Array<unknown> | number | { length: number; }
>(value: T | undefined | null, identifier: string): T {
  if (isNullUndefinedOrEmpty(value)) {
    throw new ExError(
      'Null, undefined, or empty value encountered where one was not expected or allowed.',
      {
        identifier,
        value
      }
    )
  }

  return value;
}
