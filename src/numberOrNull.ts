import { isString } from 'lodash';
import { isNullOrUndefined, isRealNumber } from '.';

/**
 * Parses a number out of the input string if one is found and null otherwise.
 */
export function numberOrNull(value: number | string | undefined): number | null {
  if (isRealNumber(value)) {
    return value;
  }

  if (isNullOrUndefined(value) || !isString(value)) {
    return null;
  }

  const digits = value.replaceAll(/[^0-9]/g, '');

  return digits.length === 0
    ? null
    : Number.parseInt(digits);
}
