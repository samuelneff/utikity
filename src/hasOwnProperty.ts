import { isDefined } from './isDefined';

const realHasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Alias for {@link !Object.hasOwnProperty} that's safe to be called on undefined and null variables.
 *
 * @example
 * expect(hasOwnProperty({a: 'A'}, 'a')).toBeTruthy();
 *
 * expect(hasOwnProperty({a: 'A'}, 'b')).toBeFalsy();
 * expect(hasOwnProperty(undefined, 'b')).toBeFalsy();
 * expect(hasOwnProperty(null, 'b')).toBeFalsy();
 */
export function hasOwnProperty<ObjectType, Key extends PropertyKey>(
  obj: ObjectType,
  property: Key,
): obj is ObjectType & Record<Key, unknown> {
  return isDefined(obj) && realHasOwnProperty.call(obj, property);
}
