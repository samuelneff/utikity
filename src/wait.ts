/**
 * Waits the specified number of milliseconds. Promisified version of {@link !setTimeout}.
 *
 * @example
 *
 * let error: Error | null = new Error('An error occurred');
 * await wait(5000);
 * error = null;
 *
 * @see {@link !setTimeout}
 */
export function wait(timeoutMs: number) {
  return new Promise(waitImpl);

  function waitImpl(resolve: (value: unknown) => void, _reject: (reason?: any) => void) {
    setTimeout(resolve, timeoutMs);
  }
}
