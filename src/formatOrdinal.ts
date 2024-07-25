/**
 * Given a whole number returns the ordinal value—the number with a suffix such as 1st, 2nd, 3rd.
 *
 * @example
 * expect(formatOrdinal(1)).toBe('1st');
 * expect(formatOrdinal(2)).toBe('2nd');
 * expect(formatOrdinal(3)).toBe('3rd');
 * expect(formatOrdinal(14)).toBe('14th');
 * expect(formatOrdinal(0)).toBe('0');
 *
 * @see {@link formatInteger}
 * @see {@link formatPercent}
 * @see {@link formatThousands}
 */
export function formatOrdinal(n: number) {
  let ord = 'th';
  if (n === 0) {
    return '0';
  }  else if (n % 10 == 1 && n % 100 != 11) {
    ord = 'st';
  } else if (n % 10 == 2 && n % 100 != 12) {
    ord = 'nd';
  } else if (n % 10 == 3 && n % 100 != 13) {
    ord = 'rd';
  }
  return n + ord;
}
