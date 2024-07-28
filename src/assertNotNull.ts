import { ExError } from './ExError';
import { isNullOrUndefined } from './isNullOrUndefined';

/**
 * Throws an error if the value is undefined or null.
 *
 * @example
 *
 * expect(() => assertNotNull(null)).toThrow();
 *
 * @see {@link isDefined}
 * @see {@link isEmpty}
 */
export function assertNotNull<T>(value: T | undefined | null, identifier: string): T {
  if (isNullOrUndefined(value)) {
    throw new ExError(
      'Null or undefined value encountered where one was not expected or allowed.',
      {
        identifier,
        value
      }
    )
  }

  return value;
}
