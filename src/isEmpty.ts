import { isNullOrUndefined } from './isNullOrUndefined';
import { isString } from './isString';

export function isEmpty(value: unknown) {
  if (isNullOrUndefined(value)) {
    return true;
  }

  if (isString(value) || Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  return Object.getOwnPropertyNames(value).length === 0;
}
