export function isSet<TKey>(set: Set<TKey>): set is Set<TKey>;
export function isSet(value: unknown): value is Set<unknown>;
/**
 * Tests if a value is a {@link !Set} or {@link !WeakSet}.
 */
export function isSet(value: unknown): value is Set<unknown> {
  return value instanceof Set || value instanceof WeakSet;
}