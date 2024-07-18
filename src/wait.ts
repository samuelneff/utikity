/**
 * Waits the specified number of milliseconds. Promisified version of {setTimeout}.
 * @see {setTimeout}
 */
export function wait(timeoutMs: number) {
  return new Promise(waitImpl);

  function waitImpl(resolve: (value: unknown) => void, _reject: (reason?: any) => void) {
    setTimeout(resolve, timeoutMs);
  }
}
