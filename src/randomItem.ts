import { type RecordKey } from './RecordKey';
import { isNullOrUndefined } from './isNullOrUndefined';
import { isString } from './isString';
import { randomBelow } from './randomBelow';

/**
 * Returns one random item from the array.
 */
export function randomItem<T>(array: T[]): T | undefined;
export function randomItem<T>(set: Set<T>): T | undefined;
export function randomItem<TKey, TValue>(map: Map<TKey, TValue>): [TKey, TValue] | undefined;
export function randomItem<TKey extends RecordKey, TValue>(record: Record<TKey, TValue>): [ TKey, TValue ] | undefined;
export function randomItem(characters: string): string | undefined;

export function randomItem(collection: unknown) {

  if (isNullOrUndefined(collection)) {
    return null;
  }

  if (Array.isArray(collection) || isString(collection)) {
    const len = collection.length;
    return len === 0
      ? null
      : collection[ randomBelow(len) ];
  }

  if (collection instanceof Map || collection instanceof Set) {
    const len = collection.size;
    let index = randomBelow(len);
    for (const item of collection.entries()) {
      if (!index) {
        return item;
      }
      index--;
    }
  }

  try {
    return randomItem(Object.entries(collection as Record<RecordKey, unknown>));
  } catch {
    // not iterable
    return null;
  }
}
