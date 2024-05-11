import { isDefined } from './isDefined';
import { isNullOrUndefined } from './isNullOrUndefined';
import { toRecord } from './toRecord';

export function filterNullProperties<T extends {}>(obj: T): T {
  if (isNullOrUndefined(obj)) {
    return obj;
  }

  return toRecord(
    Object.entries(obj).filter(
      ([ _key, value ]) => isDefined(value)
    ),
    ([ key ]) => key,
    ([ , value ]) => value
  ) as T;
}
