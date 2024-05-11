export function randomBetween(min: number, exclusiveMax: number): number {
  if (exclusiveMax <= min) {
    throw new Error(`exclusiveMax (${ exclusiveMax }) must be greater than min (${ min }).`);
  }
  return Math.random() * (exclusiveMax - min) + min;
}
