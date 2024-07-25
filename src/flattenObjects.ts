import {
  isArrayLike,
  isBoolean,
  isBuffer,
  isDate,
  isError,
  isFunction,
  isNumber,
  isRegExp,
  isSet,
  isString,
  isSymbol,
} from 'lodash';
import { isNullOrUndefined } from './isNullOrUndefined';
import { safeObjectEntries } from './safeObjectEntries';

/**
 * Returns a object with all the keys and values of the input object including all nested
 * children of the original object, essentially flattening it.
 *
 * @example
 * const input = {
 *   a: 'A',
 *   b: 'B',
 *   child: {
 *     c: 'C',
 *     d: 'D',
 *     grandchild: {
 *       e: 'E',
 *     },
 *   },
 * };
 *
 * const actual = flattenObjects(input);
 *
 * const expected = {
 *   a: 'A',
 *   b: 'B',
 *   c: 'C',
 *   d: 'D',
 *   e: 'E',
 * };
 *
 * expect(actual).toEqual(expected);
 */
export function flattenObjects(root: Record<PropertyKey, unknown> | {}): Record<PropertyKey, unknown> {
  // breadth-first search
  const pendingObjects = [ root ];
  const flat = {} as Record<PropertyKey, unknown>;

  // use `for` loop because we're going to be adding to the array we're looping over as we loop over it,
  // recursive-type programming without recursion.
  for (let i = 0; i < pendingObjects.length; i++) {
    const obj = pendingObjects[ i ];
    safeObjectEntries(obj).forEach(([ key, value ]) => {
      if (
        isString(value) ||
        isBoolean(value) ||
        isNumber(value) ||
        isDate(value) ||
        isNullOrUndefined(value) ||
        isArrayLike(value) ||
        isSet(value) ||
        isBuffer(value) ||
        isError(value) ||
        isFunction(value) ||
        isRegExp(value) ||
        isSymbol(value)
      ) {
        if (!(key in flat)) {
          flat[ key ] = value;
        }
        return;
      }
      pendingObjects.push(value as Record<PropertyKey, unknown>);
    });
  }

  return flat;
}
