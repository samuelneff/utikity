import { coercePositiveInteger } from './coercePositiveInteger';
import { isNullOrUndefined } from './isNullOrUndefined';

export function coerceYear(value: string) {
  const year = coercePositiveInteger(value);

  if (isNullOrUndefined(year)) {
    return year;
  }

  if (year < 1900 || year > 2200) {
    return undefined;
  }

  return year;
}