import { isNullOrUndefined } from './isNullOrUndefined';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export function formatCurrency(value: number | undefined | null) {
  if (isNullOrUndefined(value)) {
    return '';
  }

  return currencyFormatter.format(value);
}
