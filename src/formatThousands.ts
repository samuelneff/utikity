import { isNullOrUndefined } from './isNullOrUndefined';

const thousandsFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  useGrouping: true,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export function formatThousands(value: number, nullText: string = '') {
  if (isNullOrUndefined(value)) {
    return nullText;
  }

  return thousandsFormatter.format(value);
}