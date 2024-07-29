/**
 * Creates a proxy to an object that returns a default value for any property that doesn't exist or is undefined or null.
 *
 * @example
 * const source = {
 *   name: 'John',
 * };
 * const proxy = createDefaultProxy(source, 'Unknown');
 * expect(proxy.name).toBe('John');
 * expect(proxy.title).toBe('Unknown');
 *
 * @see {@link createEntityEncodeProxy}
 * @see {@link createMultiProxy}
 */
export function createDefaultProxy<
  TTarget extends object | undefined | null,
  TDefault
  >(target: TTarget, defaultValue: TDefault) {
  const defaultProxy = {
    get(target: object, prop: PropertyKey, receiver: unknown) {
      const value = Reflect.get(target, prop, receiver);
      return value ?? defaultValue;
    },
    has(_target: unknown, _prop: string) {
      return true;
    }
  };

  return new Proxy(target ?? {}, defaultProxy) as TTarget | Record<PropertyKey, TDefault>;
}
