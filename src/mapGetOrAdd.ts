/**
 * Gets a value from a map or creates a value and inserts it into the map if the key is not already in the map.
 *
 * @example
 * const map = new Map();
 * map.set('a', 'A');
 *
 * // Let's get a key already in the map; the lambda is never called
 * const a = mapGetOrAdd(map, 'a', () => 'X');
 * expect(a).toBe('a');
 * expect(map.get('a')).toBe('a');
 *
 * // Now let's call with a key not in the map, so the lambda is called to add it
 * const b = mapGetOrAdd(map, 'b', () => 'B');
 * expect(b).toBe('B');
 * expect(map.get('b')).toBe('B');
 */
export function mapGetOrAdd<TKey, TValue>(map: Map<TKey, TValue>, key: TKey, valueCreator: () => TValue): TValue {

  const existing = map.get(key);
  if (existing !== undefined && existing !== null) {
    return existing;
  }

  const toAdd = valueCreator();
  map.set(key, toAdd);

  return toAdd;
}
