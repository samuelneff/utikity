import { isNullOrUndefined } from "./isNullOrUndefined";

/**
 * Valid values for keys of Record<,>.
 */
export type AllowedKey = keyof any;

/**
 * Function that convers a Record<,> key to a new key.
 */
export type RecordKeyConverter<TIn, TKey extends AllowedKey = string> = (
  value: TIn,
  index: number,
) => TKey;

/**
 * Function that convers a Record<,> value to a new value.
 */
export type RecordValueConverter<TIn, TOut, TKey extends AllowedKey = string> = (
  value: TIn,
  index: number,
  key: TKey,
) => TOut;

/**
 * Converts an array to a Record<,> with optional key converter and optional value converter.
 * If key or value convers are not provided then an near-identity function is used (the result is
 * the same as the source except null and undefined are converted to empty strings); If you want
 * to provide value converter but not a key converter than you can pass {@link defaultKeyConverter}
 * as the second parameter.
 *
 * @example
 * // Simple example without converters
 *
 * const input = [ 'a', 'b', 'c' ];
 * const actual = toRecord(input);
 * const expected = {
 *   a: 'a',
 *   b: 'b',
 *   c: 'c',
 * };
 *
 * expect(actual).toEqual(expected);
 *
 * @example
 * // Converters used to modify result
 * const input = [ 'a', 'b', 'c' ];
 *
 * const actual = toRecord(
 *   input,
 *   i => i.toUpperCase(),
 *   i => i.charCodeAt(0),
 * );
 *
 * const expected = {
 *   'A': 97,
 *   'B': 98,
 *   'C': 99,
 * };
 *
 * expect(actual).toEqual(expected);
 *
 * @see {@link RecordKeyConverter}
 * @see {@link RecordValueConverter}
 * @see {@link defaultKeyConverter}
 */
export function toRecord<TIn, TOut = TIn, TKey extends AllowedKey = string>(
  source: TIn[],
  keyConverter: RecordKeyConverter<TIn, TKey> = defaultKeyConverter as any,
  valueConverter: RecordValueConverter<TIn, TOut, TKey> = defaultValueConverter as any
): Record<TKey, TOut> {
  return source.reduce((map, value, index) => {
    const key = keyConverter(value, index);
    map[key] = valueConverter(value, index, key);
    return map;
  }, {} as Record<TKey, TOut>);
}

/**
 * Default key converter used by {@link toRecord}, useful when you want to provide
 * a value converter and not a key converter. Returns the provided key unless it is
 * null or undefined, in which case it returns an empty string.
 */
export function defaultKeyConverter<TIn>(value: TIn, _index: number): string {
  return isNullOrUndefined(value) ? "" : String(value);
}

function defaultValueConverter<TIn>(
  value: TIn,
  _index: number,
  _key: string
): TIn {
  return value;
}
