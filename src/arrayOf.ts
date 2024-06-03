
export function arrayOf<T>(value: T, count: number): T[] {
  if (count <= 0) {
    return [];
  }

  const array = new Array<T>(count);
  for (let i = 0; i < count; i++) {
    array[ i ] = value;
  }

  return array;
}
