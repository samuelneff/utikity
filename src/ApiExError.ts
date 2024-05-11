import { ExError } from './ExError';

export class ApiExError extends ExError {
  constructor(
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
