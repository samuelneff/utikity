/**
 * Returns true if the value is a {@link !BigInt}. More expressive and less error prone than a `typeof` check.
 *
 * @example
 * expect(isBigInt(BigInt("0x1fffffffffffff"))).toBeTruthy();
 *
 * expect('0x1fffffffffffff').toBeFalsy();
 * expect(1).toBeFalsy();
 * expect(undefined).toBeFalsy();
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint';
}
