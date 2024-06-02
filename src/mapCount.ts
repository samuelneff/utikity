
export function mapCount<T>(count: number, callback: (index: number) => T): T[] {
  const array = new Array(count) as T[];
  for (let i = 0; i < count; i++) {
    array[ i ] = callback(i);
  }
  return array;
}
