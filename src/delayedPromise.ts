
/**
 * Function that implements the standard promise call signature.
 */
export type PromiseExecutor<T> = (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;

/**
 * Callback matching the resolve parameter to the standard call signature.
 */
export type PromiseResolver<T> = Parameters<PromiseExecutor<T>>[ 0 ];

/**
 * Callback matching the reject parameter to the standard call signature.
 */
export type PromiseRejector = Parameters<PromiseExecutor<unknown>>[ 1 ];

/**
 * Allows declaring a function that returns a promise without immediately executing the function. The
 * returned {@link DelayedPromise} must be triggered later either with {@link DelayedPromise.run} or
 * {@link DelayedPromise.runNextTick}.
 *
 * @example
 *
 * const messages = [];
 *
 * const delayed = delayPromise(
 *  (resolve, reject) => {
 *    messages.push('Promise triggered');
 *  }
 * );
 * messages.push('Promise created');
 * delayed.run();
 *
 * const expected = [
 *   'Promise created',
 *   'Promise triggered',
 * ];
 *
 * expect(messages).toEqual(expected);
 *
 * @see {@link DelayedPromise}
 */
export function delayPromise<T = void>(executor: PromiseExecutor<T>) {
  return new DelayedPromise(executor);
}

/**
 * Represents a reference to a promise that has not yet executed. See {@link delayPromise}.
 */
export class DelayedPromise<T> {
  public promise: Promise<T>;
  public resolve!: PromiseResolver<T>;
  public reject!: PromiseRejector;

  constructor(private executor: PromiseExecutor<T>) {
    this.promise = new Promise((resolve: PromiseResolver<T>, reject: PromiseRejector) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  /**
   * Executes a previously delayed promise. See {@link delayPromise}.
   */
  public run() {
    try {
      this.executor(this.resolve, this.reject);
    } catch (ex: unknown) {
      this.reject(ex);
    }
  }

  /**
   * Schedules execution a previously delayed promise on the next event loop tick. See {@link delayPromise}.
   */
  public runNextTick() {
    setTimeout(this.run.bind(this));
  }
}
