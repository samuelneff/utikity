import { isNullOrUndefined } from './isNullOrUndefined';

export function formatPercent(value: number | undefined | null) {
  return isNullOrUndefined(value)
    ? ''
    : Math.round(value * 100) + '%';
}

