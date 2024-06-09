import { Spread } from './Spread.js';

/**
 * Given an array of objects, returns a proxy that will pass all property access to each object in order until one
 * the first one with the matching property is found.
 */
export function createMultiProxy<T extends object[]>(...objects: [...T]) {

  const handler = {
    get(_target: unknown, prop: string, _receiver: unknown) {
      for (const multiTarget of objects) {
        if (prop in multiTarget) {
          return (multiTarget as Record<string, unknown>)[ prop ];
        }
      }
      return undefined;
    }
  };
  return new Proxy(objects[ 0 ], handler) as Spread<T>;
}
