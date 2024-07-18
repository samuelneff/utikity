import { ExError } from './ExError';

/**
 * Error useful to represent API errors; contains standard ExError data plus a status code from {HttpStatusCodes}.
 * for available values.
 * @example
 * function accessDenied() {
 *   throw new ApiExError(
 *     HttpStatusCodes.forbidden,
 *     'You do not have permission to access this resource',
 *     { resource: '/admin' },
 *   );
 * }
 *
 * expect(accessDenied).toThrowErrorMatchingInlineSnapshot('');
 */
export class ApiExError extends ExError {
  constructor(

    /**
     * Status code this error represents.
     * @see {HttpStatusCodes}
     */
    public statusCode: string,
    staticMessage: string,
    metadata: Record<string, unknown>,
    cause?: unknown,
  ) {
    super(
      staticMessage,
      {
        statusCode,
        ...metadata,
      },
      cause,
    );
  }

  static wrapApiOrAddMetadata(
    statusCode: string,
    staticMessage: string,
    metadata: Record<string, unknown>,
    cause: ExError | unknown,
  ): ApiExError {
    if (cause instanceof ApiExError) {
      return cause.addMetadata(metadata);
    }

    return new ApiExError(
      statusCode,
      staticMessage,
      metadata,
      cause
    );
  }
}
