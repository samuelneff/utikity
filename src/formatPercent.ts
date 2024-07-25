import { isNullOrUndefined } from './isNullOrUndefined';

/**
 * Given a number returns a whole percent with a percent sign, such as 0.75 returning 75%.
 *
 * @example
 * expect(formatPercent(0.5)).toBe('50%');
 * expect(formatPercent(1.2)).toBe('120%');
 *
 * expect(formatPercent(undefined)).toBe('');
 * expect(formatPercent(null)).toBe('');
 *
 * @see {@link formatInteger}
 * @see {@link formatOrdinal}
 * @see {@link formatThousands}
 */
export function formatPercent(value: number | undefined | null) {
  return isNullOrUndefined(value)
    ? ''
    : Math.round(value * 100) + '%';
}

