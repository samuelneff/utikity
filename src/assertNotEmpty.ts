import { ExError } from './ExError';
import { isEmpty } from './isEmpty';

/**
 * Throws an error if the value is empty—undefined, null, an empty array, an empty object, empty string, etc.
 * See {@link isEmpty} for a more complete explanation.
 *
 * @example
 *
 * expect(() => assertNotEmpty([])).toThrow();
 *
 * @see {@link assertNotNull}
 * @see {@link isDefined}
 * @see {@link isEmpty}
 */
export function assertNotEmpty<
  T extends string | Array<unknown> | number | { length: number; }
>(value: T | undefined | null, identifier: string): T {
  if (isEmpty(value)) {
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
