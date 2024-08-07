import { entityEncode } from './entityEncode';
import { isNullOrUndefined } from './isNullOrUndefined';
import { isString } from './isString';

const entityEncodeProxy = {
  get(target: object, prop: PropertyKey, receiver: unknown) {
    const value = Reflect.get(target, prop, receiver);
    return isString(value)
      ? entityEncode(value)
      : value;
  }
}

/**
 * Creates a proxy to an object that entity encodes the values upon access, without copying the whole object.
 *
 * @example
 * const source = {
 *   names: 'John & James',
 * };
 * const proxy = createEntityEncodeProxy(source);
 * const actual = proxy.names;
 * expect(actual).toBe('John &amp; James');
 *
 * @see {@link entityEncode}
 */
export function createEntityEncodeProxy<T extends object | undefined | null>(target: T) {
  return isNullOrUndefined(target)
    ? target
    : new Proxy(target, entityEncodeProxy) as T;
}
