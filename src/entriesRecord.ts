/**
 * Given an array of key/value arrays returns an new Record with those key/value pairs.
 *
 * @example
 * const input = [
 *   [ 'a', 'A' ],
 *   [ 'b', 'B' ],
 * ];
 * const expected = {
 *   a: 'A',
 *   b: 'B',
 * };
 * const actual = entriesToRecord(input);
 *
 * expect(actual).toEqual(expected);
 *
 * @see {@link safeObjectEntries}
 * @see {@link toRecord}
 */
export function entriesToRecord<TKey extends string | number | symbol, TValue>(
  source: [TKey, TValue][],
) {
  return source.reduce((map, [key, value]) => {
    map[key] = value;
    return map;
  }, {} as Record<TKey, TValue>);
}
