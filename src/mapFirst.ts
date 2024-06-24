/**
 * Calls the mapper for each item in a list sequentiall and returns the first non-null response
 * returned by the mapper.
 */
export function mapFirst<TSource, TMapped>(
  array: TSource[],
  mapper: (item: TSource, index: number) => TMapped | null
): TMapped | null {
  let index = 0;
  for (const item of array) {
    const mapped = mapper(item, index++);
    if (mapped !== null) {
      return mapped;
    }
  }
  return null;
}
