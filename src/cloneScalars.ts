import { isNullOrUndefined } from './isNullOrUndefined';
import { isScalarLike } from './isScalarLike';
import { isSymbol } from './isSymbol';

/**
 * Clones the top-level scalar values of an object. Objects, arrays, maps, sets, and functions are excluded.
 *
 * @example
 * const source = {
 *   str: 'Hello',
 *   num: 1,
 *   bool: true,
 *   date: new Date('2024-01-01'),
 *   nil: null,
 *   child: {
 *     excluded: 'me'
 *   },
 *   stuff: [1, 2, 3],
 *   func() {
 *   },
 *   sym: Symbol('')
 * };
 *
 * const actual = cloneScalars(source);
 *
 * const expected = {
 *   str: 'Hello',
 *   num: 1,
 *   bool: true,
 *   date: new Date('2024-01-01'),
 * };
 *
 * expect(actual).toEqual(expected);
 *
 * @see {@link isScalarLike}
 */
export function cloneScalars<T extends object>(source: T): T {
  if (isNullOrUndefined(source) || isScalarLike(source)) {
    return source;
  }

  const clone = (Array.isArray(source) ? [] : {}) as T;

  for (const [ key, value ] of Object.entries(source)) {
    if (isScalarLike(value) && !isSymbol(value)) {
      // @ts-ignore
      clone[key] = value;
    }
  }

  return clone;
}
