import { randomBetween } from './randomBetween';

export function randomBelow(exclusiveMax: number) {
  return randomBetween(0, exclusiveMax);
}
