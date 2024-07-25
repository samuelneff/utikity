import { isEmpty } from './isEmpty';

/**
 * Maps an array of items to a new converted array of items ignoring any item where the converter
 * returned null or undefined.
 *
 * @example
 *
 * function evenSquared(value: number) {
 *   return value & 1 // is odd
 *     ? null
 *     : value * value;
 * }
 *
 * const actual = mapDefined(
 *   [ 1, 2, 3, 4 ],
 *   evenSquared,
 * );
 *
 * expect(actual).toEqual([ 4, 16 ]);
 */
export function mapDefined<TIn, TOut>(list: TIn[], converter: (item: TIn, index?: number) => TOut | undefined): TOut[] {
  if (isEmpty(list)) {
    return [];
  }
  const len = list.length;
  const result = new Array<TOut>(len);
  let outIndex = 0;
  for (let inIndex = 0; inIndex < len; inIndex++) {
    const converted = converter(list[ inIndex ], inIndex);
    if (converted !== undefined && converted !== null) {
      result[ outIndex++ ] = converted;
    }
  }
  result.length = outIndex;
  return result;
}
