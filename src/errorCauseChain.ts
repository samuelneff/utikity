import { hasOwnProperty } from './hasOwnProperty';

/**
 * Given an {@link !Error} object returns an array of {@link Error} objects which is the flattened
 * `cause` values from each.
 *
 * @example
 * const root = new Error('Something bad happened.');
 * const middle = new Error('Add some more info', { cause: root });
 * const final = new Error('Handling the error', {cause: middle });
 *
 * const actual = errorCauseChain(final);
 *
 * const expected = [
 *   root,
 *   middle,
 *   final,
 * ];
 * expect(actual).toEqual(expected);
 *
 * @see {@link ExError}
 */
export function errorCauseChain(ex: unknown) {
  // we're going to loop through the cause chain recursively but want
  // to list everything oldest first. So we'll convert the
  // cause chain to an array and reverse it then build up the
  // loggabe object.

  const causeChain = [] as unknown[];
  let cause = ex;
  while (cause != undefined) {
    causeChain.push(cause);
    cause = hasOwnProperty(cause, 'cause') ? cause.cause : undefined;
  }

  return causeChain.reverse();
}
