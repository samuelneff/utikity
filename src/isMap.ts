export function isMap<TKey, TValue>(map: Map<TKey, TValue>): map is Map<TKey, TValue>;
export function isMap(value: unknown): value is Map<unknown, unknown>;
/**
 * Tests if a value is a {@link !Map} or {@link !WeakMap}.
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return value instanceof Map || value instanceof WeakMap;
}
