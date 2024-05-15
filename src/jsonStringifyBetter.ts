import { isDate, isSet } from 'lodash';
import { isScalarLike } from './isScalarLike';
import { isRunningLocal } from './runtimeEnvironment';
import { isMap } from './isMap';
import { RecordKey } from './RecordKey';

/**
 * Wrapper for JSON.stringify() with improved error handling,
 * custom handling for some types, and automatic pretty formatting
 * for local development.
 */
export function jsonStringifyBetter(value: unknown): string {

  const found: unknown[] = [];

  return JSON.stringify(
    value,
    betterReplacer,
    isRunningLocal() ? 2 : undefined
  );

  function betterReplacer(key: string, value: unknown) {

    if (isScalarLike(value) || isDate(value)) {
      return value;
    }

    let newValue = value;
    newValue = filterCirculars(key, newValue);
    newValue = convertMaps(key, newValue);
    newValue = convertSets(key, newValue);

    return newValue;
  }

  function filterCirculars(_key: string, value: unknown) {
    if (found.includes(value)) {
      return null;
    }

    found.push(value);
    return value;
  }

  function convertMaps(_key: string, value: unknown) {
    if (!isMap(value)) {
      return value;
    }

    const newValue: Record<RecordKey, unknown> = {};
    for (const [ key, item ] of value.entries()) {
      newValue[ String(key) ] = item;
    }

    return newValue;
  }

  function convertSets(_key: string, value: unknown) {
    return isSet(value) ? [ ...value.keys() ] : value;
  }
}
