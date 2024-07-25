import { hasOwnProperty } from './hasOwnProperty';
import { isError } from 'lodash';
import { numberLines } from './numberLines';
import { indent } from './indent';
import { yamlStringify } from './yaml';
import { regexReplaceWithBackreferences } from './regexReplaceWithBackreferences';
import { errorCauseChain } from './errorCauseChain';
import { unlessEmpty } from './unlessEmpty';
import { isEmpty } from './isEmpty';

const stackTraceStartOfLine = / +at /;
const sourcePathStripStartExp =
  /(?:file:\/\/|\/).+(\/(?:packages|node_modules)\/)/g;

/**
 * Object representation of a fully flattened and summaries error for better logging and analysis.
 */
export type LoggableObject = {
  messages: string[];
  stackSummaries: string[];
  metadataFlattened: unknown;
  causeChain: unknown[]; // Technically anything can be thrown
  finalError: Error;
};

/**
 * Extended error object with significant enhanced functionality. Provides for separate message and metadata,
 * and better representation of nested causes and stack traces, easier to read stack traces, plus
 * whether an ability to track when an error has been logged already avoid duplication. Consistent use of
 * `ExError` will provide more information and make applications easier to support and debug.
 *
 * @example
 *
 * function throwNestedError() {
 *   try {
 *     try {
 *       throw new ExError(
 *         'Something bad happened',
 *         {
 *          a: 'A'
 *         }
 *       );
 *     } catch (error1) {
 *       throw new ExError(
 *         'We caught an error, adding more context',
 *         {
 *           b: 'B',
 *         },
 *         error1,
 *       );
 *     }
 *   } catch (error2) {
 *     throw new ExError(
 *       'We also caught the error and are adding even more context',
 *       {
 *         c: 'C',
 *       },
 *       error2,
 *     );
 *   }
 * }
 *
 * expect(throwNestedError).toThrowMatchingInlineSnapshot();
 *
 * @see {@link ApiExError}
 */
export class ExError extends Error {
  public name = this.constructor.name;
  public logCode: string | undefined = undefined;

  constructor(
    public staticMessage: string,
    public metadata: Record<string, unknown>,
    cause?: unknown,
  ) {
    super(staticMessage, { cause });
  }

  /**
   * Chainable method to add more metadata to an existing `ExError`.
   *
   * @example
   *
   * try {
   *   throw ExError('Something bad happened');
   * } catch (error) {
   *   const actual = (error as ExError).addMetadata({ a: 'A' });
   *   expect(actual.metadata.a).toBe('A');
   *   expect(actual).toBe(error); // adding metadata modifies the original error and returns it
   * }
   * expect.hasAssertions();
   */
  addMetadata(moreMetadata: Record<string, unknown>) {
    Object.assign(this.metadata, moreMetadata);
    return this;
  }

  /**
   * Adds metadata to an existing `ExError` or wraps the provided error in a new `ExError` if it
   * is any other type of error. Useful when calling a method that might through `ExError` or might
   * let a standard error bubble up.
   *
   * @example
   * // Wrapping a different error in ExError with metadata
   * try {
   *   throw Error('Something bad happened');
   * } catch (error) {
   *   const actual = wrapOrAddMetadata('The cause is not ExError', { a: 'A' }, error);
   *   expect(actual.metadata.a).toBe('A');
   *   expect(actual).not.toBe(error); // original is not ExError, so the wrapped ExError is different
   * }
   * expect.hasAssertions();
   *
   * @example
   * // Adding metadata to an existing ExError
   * try {
   *   throw ExError('Something bad happened');
   * } catch (error) {
   *   const actual = wrapOrAddMetadata('The cause is not ExError', { a: 'A' }, error);
   *   expect(actual.message).toBe('Something bad happened'); // the original message is preserved
   *   expect(actual.metadata.a).toBe('A'); // metadata was added
   *   expect(actual).toBe(error); // The returned error is the same as the original since it was already an ExError
   * }
   * expect.hasAssertions();
   */
  static wrapOrAddMetadata(
    staticMessage: string,
    metadata: Record<string, unknown>,
    cause: ExError | unknown,
  ): ExError {
    if (cause instanceof ExError) {
      return cause.addMetadata(metadata);
    }

    return new ExError(staticMessage, metadata, cause);
  }

  /**
   * Provides a huge print-out of the error details and all causes in a very easy-to-read and
   * organized output including the messages, in order of original to most re-thrown,
   * most relevant lines from each stack trace, flattened metadata, and the original error details
   * from each cause.
   *
   * @example
   *
   * 1> string: This is just a string error
   * 2> Error: Rethrowing string error as Error
   * 3> ExError: Error #3 as ExError
   * 4> Error: Error #4, rethrow ExError as Error
   * 5> ExError: Error #5 as ExError
   * 6> ExError: ExError #6
   *
   * 1> n.a.
   * 2> at completeCrazyTest (/packages/shared/test/ExError.test.ts:15:19)
   * 3> at completeCrazyTest (/packages/shared/test/ExError.test.ts:18:17)
   * 4> at completeCrazyTest (/packages/shared/test/ExError.test.ts:21:15)
   * 5> at completeCrazyTest (/packages/shared/test/ExError.test.ts:24:13)
   * 6> at completeCrazyTest (/packages/shared/test/ExError.test.ts:27:14)
   *
   *   depth: 5
   *   depth_5: 3
   *   a: A
   *   depth_6: 2
   *   a_6: A2
   *   b: B
   *   nesting:
   *     - c: {}
   *     - - One
   *       - Two
   *       - Three
   *       - Four
   *
   *
   * Original error:
   *   This is just a string error
   *
   * Error #2:
   *   Error: Rethrowing string error as Error
   *       at completeCrazyTest (/packages/shared/test/ExError.test.ts:15:19)
   *       at /node_modules/@vitest/runner/dist/index.js:132:13
   *       at /node_modules/@vitest/runner/dist/index.js:41:26
   *       at runTest (/node_modules/@vitest/runner/dist/index.js:449:15)
   *       at runSuite (/node_modules/@vitest/runner/dist/index.js:548:15)
   *       at runFiles (/node_modules/@vitest/runner/dist/index.js:599:5)
   *       at startTests (/node_modules/@vitest/runner/dist/index.js:608:3)
   *       at /node_modules/vitest/dist/entry.js:259:7
   *       at withEnv (/node_modules/vitest/dist/entry.js:184:5)
   *       at run (/node_modules/vitest/dist/entry.js:251:3)
   *
   * Error #3:
   *   ExError: Error #3 as ExError
   *       at completeCrazyTest (/packages/shared/test/ExError.test.ts:18:17)
   *       at /node_modules/@vitest/runner/dist/index.js:132:13
   *       at /node_modules/@vitest/runner/dist/index.js:41:26
   *       at runTest (/node_modules/@vitest/runner/dist/index.js:449:15)
   *       at runSuite (/node_modules/@vitest/runner/dist/index.js:548:15)
   *       at runFiles (/node_modules/@vitest/runner/dist/index.js:599:5)
   *       at startTests (/node_modules/@vitest/runner/dist/index.js:608:3)
   *       at /node_modules/vitest/dist/entry.js:259:7
   *       at withEnv (/node_modules/vitest/dist/entry.js:184:5)
   *       at run (/node_modules/vitest/dist/entry.js:251:3)
   *
   * Error #4:
   *   Error: Error #4, rethrow ExError as Error
   *       at completeCrazyTest (/packages/shared/test/ExError.test.ts:21:15)
   *       at /node_modules/@vitest/runner/dist/index.js:132:13
   *       at /node_modules/@vitest/runner/dist/index.js:41:26
   *       at runTest (/node_modules/@vitest/runner/dist/index.js:449:15)
   *       at runSuite (/node_modules/@vitest/runner/dist/index.js:548:15)
   *       at runFiles (/node_modules/@vitest/runner/dist/index.js:599:5)
   *       at startTests (/node_modules/@vitest/runner/dist/index.js:608:3)
   *       at /node_modules/vitest/dist/entry.js:259:7
   *       at withEnv (/node_modules/vitest/dist/entry.js:184:5)
   *       at run (/node_modules/vitest/dist/entry.js:251:3)
   *
   * Error #5:
   *   ExError: Error #5 as ExError
   *       at completeCrazyTest (/packages/shared/test/ExError.test.ts:24:13)
   *       at /node_modules/@vitest/runner/dist/index.js:132:13
   *       at /node_modules/@vitest/runner/dist/index.js:41:26
   *       at runTest (/node_modules/@vitest/runner/dist/index.js:449:15)
   *       at runSuite (/node_modules/@vitest/runner/dist/index.js:548:15)
   *       at runFiles (/node_modules/@vitest/runner/dist/index.js:599:5)
   *       at startTests (/node_modules/@vitest/runner/dist/index.js:608:3)
   *       at /node_modules/vitest/dist/entry.js:259:7
   *       at withEnv (/node_modules/vitest/dist/entry.js:184:5)
   *       at run (/node_modules/vitest/dist/entry.js:251:3)
   *
   * Error #6:
   *   ExError: ExError #6
   *       at completeCrazyTest (/packages/shared/test/ExError.test.ts:27:14)
   *       at /node_modules/@vitest/runner/dist/index.js:132:13
   *       at /node_modules/@vitest/runner/dist/index.js:41:26
   *       at runTest (/node_modules/@vitest/runner/dist/index.js:449:15)
   *       at runSuite (/node_modules/@vitest/runner/dist/index.js:548:15)
   *       at runFiles (/node_modules/@vitest/runner/dist/index.js:599:5)
   *       at startTests (/node_modules/@vitest/runner/dist/index.js:608:3)
   *       at /node_modules/vitest/dist/entry.js:259:7
   *       at withEnv (/node_modules/vitest/dist/entry.js:184:5)
   *       at run (/node_modules/vitest/dist/entry.js:251:3)
   *
   */
  public toString() {
    const loggable = this.toLoggableObject();

    const messages = numberLines(loggable.messages).join('\n');
    const stackSummaries = numberLines(loggable.stackSummaries).join('\n');
    const metadataFlattened = indent(
      yamlStringify(
        loggable.metadataFlattened,
        {
          blockQuote: 'literal',
          lineWidth: 240,
          keepUndefined: false,
        },
      ),
    );

    const fullStacks = loggable.causeChain.map((ex, index) => {
      const heading = index === 0 ? 'Original error:' : `Error #${index + 1}:`;

      const indented = indent(
        isError(ex) && ex.stack
          ? regexReplaceWithBackreferences(
              ex.stack,
              sourcePathStripStartExp,
              '.$1',
            )
          : String(ex),
      );

      return `${heading}\n${indented}`;
    });

    return [
      messages,
      stackSummaries,
      metadataFlattened,
      fullStacks.join('\n\n'),
    ].join('\n\n');
  }

  public flattenMetadata() {
    const metadataFlattened: Record<string, unknown> = {};
    const causeChain = errorCauseChain(this);

    causeChain.forEach((ex: unknown, index: number) => {
      if (ex instanceof ExError) {
        const entries = Object.entries(ex.metadata);
        entries.forEach(([key, value]) => {
          // const appliedValue = applyMetadataModifiers(value, key);
          // if (appliedValue === suppressKeyValuePair) {
          //   return;
          // }

          // if (key === 'event') {
          //   const headers = appliedValue?.headers;
          //   if (headers) {
          //     Object.entries(headers).forEach(([headerName, headerValue]) => {
          //       const appliedHeaderValue = applyMetadataModifiers(
          //         headerValue,
          //         headerName,
          //       );
          //       if (
          //         appliedHeaderValue === suppressKeyValuePair ||
          //         appliedHeaderValue === undefined
          //       ) {
          //         delete headers[headerName];
          //         return;
          //       }
          //       headers[headerName] = headerValue;
          //     });
          //   }
          //   delete appliedValue['multiValueHeaders'];
          // }

          const appliedKey = hasOwnProperty(metadataFlattened, key)
            ? `${key}_${index + 1}`
            : key;

          metadataFlattened[appliedKey] = value; // appliedValue;
        });
      }
    });

    return metadataFlattened;
  }

  public toLoggableObject(): LoggableObject {
    const messages = [] as string[];
    const stackSummaries = [] as string[];
    const metadataFlattened = this.flattenMetadata();

    const causeChain = errorCauseChain(this);

    causeChain.forEach((ex: unknown) => {
      if (ex instanceof Error) {
        const nameWithColon = unlessEmpty`${ex.name}: `;
        messages.push(`${nameWithColon}${ex.message}`);
        stackSummaries.push(this.stackTraceMostRelevantLine(ex.stack));
      } else {
        messages.push(`${typeof ex}: ${String(ex)}`);
        stackSummaries.push('n.a.');
      }
    });

    return {
      messages,
      stackSummaries,
      metadataFlattened,
      // metadataFlattened: clonePlus(metadataFlattened, {
      //   maxDepth: 3,
      //   maxArrayLength: 40,
      // }),
      causeChain,
      finalError: this,
    };
  }

  private stackTraceMostRelevantLine(stackTrace?: string): string {
    if (isEmpty(stackTrace)) {
      return 'n.a.';
    }
    const lines = stackTrace
      .split('\n')
      .filter(line => stackTraceStartOfLine.test(line));
    for (const line of lines) {
      if (!line.includes('node_modules')) {
        return regexReplaceWithBackreferences(
          line.trim(),
          sourcePathStripStartExp,
          '.$1',
        );
      }
    }

    return lines[0];
  }
}
