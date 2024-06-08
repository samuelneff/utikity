/**
 * Counts the number of items in the array that match the predicate function.
 */
export function countMatching<T>(array: T[], predicate: (item: T) => boolean) {
  let count = 0;
  if (Array.isArray(array)) {
    array.forEach(item => {
      if (predicate(item)) {
        count++;
      }
    });
  }
  return count;
}