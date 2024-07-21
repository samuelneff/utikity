/**
 * More expressive and less error prone test if a value is a function.
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}