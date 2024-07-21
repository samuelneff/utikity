/**
 * Tests whether an object is null or undefined. More expressive and shorter and less error
 * prone than repeating the expression itself.
 */
export function isNullOrUndefined(value: unknown): value is undefined | null {
  return value === null || value === undefined;
}
