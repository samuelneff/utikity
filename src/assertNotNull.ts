import { ExError } from './ExError';
import { isNullOrUndefined } from './isNullOrUndefined';

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
