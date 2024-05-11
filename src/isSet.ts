export function isSet<TKey>(set: Set<TKey>): set is Set<TKey>;
export function isSet(value: unknown): value is Set<unknown>;
export function isSet(value: unknown): value is Set<unknown> {
  return value instanceof Set;
}