import { isMap } from './isMap';
import { isNullOrUndefined } from './isNullOrUndefined';
import { isSet } from './isSet';

export function safeObjectEntries<T>(obj: { [s: string]: T } | ArrayLike<T> | undefined | null): [string, T][] {
  if (isNullOrUndefined(obj)) {
    return [];
  }

  if (isMap(obj) || isSet(obj)) {
    return [ ...obj.entries() ] as [ string, T ][];
  }

  try {
    return Object.entries(obj);
  } catch {
    return [];
  }
}
