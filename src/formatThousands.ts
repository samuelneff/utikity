import { isRealNumber } from './isRealNumber';

const thousandsFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  useGrouping: true,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

/**
 * Formats a whole number with a thousands separator, optionallyw with custom null text.
 * Null returns empty string by default.
 *
 * @example
 *
 * expect(formatThousands(12345)).toBe('12,345');
 * expect(formatThousands(12345.67)).toBe('12,346');
 *
 * expect(formatThousands(undefined)).toBe('');
 * expect(formatThousands(null, 'Unlimited')).toBe('Unlimited');
 *
 * @see {@link formatInteger}
 * @see {@link formatOrdinal}
 * @see {@link formatPercent}
 */
export function formatThousands(value: number | undefined | null, nullText: string = '') {
  if (!isRealNumber(value)) {
    return nullText;
  }

  return thousandsFormatter.format(value);
}