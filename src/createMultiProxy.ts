import { identity } from 'lodash';
import { Spread } from './Spread';
import { hasValue } from './hasValue';
import { isNullOrUndefined } from './isNullOrUndefined';

/**
 * Given an array of objects, returns a proxy that will pass all property access to each object in order until one
 * the first one with the matching property is found.
 */
export function createMultiProxy<T extends (object | null | unknown)[]>(...objects: [...T]) {

  const handler = {
    get(_target: unknown, prop: string, _receiver: unknown) {
      return getValue(prop, identity);
    },
    has(_target: unknown, prop: string) {
      return getValue(prop, () => true) ?? false;
    }
  };
  return new Proxy(objects[ 0 ] ?? {}, handler) as Spread<T>;

  function getValue<T>(prop: string, valueConverter: (rawValue: unknown) => T) {
    for (const multiTarget of objects) {
      if (isNullOrUndefined(multiTarget)) {
        continue;
      }
      const maybeValue = (multiTarget as Record<string, unknown>)[ prop ];
      if (hasValue(maybeValue)) {
        return valueConverter(maybeValue);
      }
    }
    return undefined;
  }
}
