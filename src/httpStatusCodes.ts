/**
 * Maps HTTP status code messages to numeric codes.
 *
 * It's an object, not an enum, since integration with other APIs too often requires a string.
 *
 * A non-standard value `000` is included to represent client-side errors useful in some circumstances,
 * differentiated from `4xx` codes that represent errors resulting from an invalid client-provided request.
 */
export const httpStatusCodes = {
  clientSideError: '000',
  continue: '100',
  switchingProtocols: '101',
  processing: '102',
  earlyHints: '103',
  ok: '200',
  created: '201',
  accepted: '202',
  nonAuthoritativeInformation: '203',
  noContent: '204',
  resetContent: '205',
  partialContent: '206',
  multiStatus: '207',
  alreadyReported: '208',
  imUsed: '226',
  multipleChoices: '300',
  movedPermanently: '301',
  found: '302',
  seeOther: '303',
  notModified: '304',
  useProxy: '305',
  temporaryRedirect: '307',
  permanentRedirect: '308',
  badRequest: '400',
  unauthorized: '401',
  paymentRequired: '402',
  forbidden: '403',
  notFound: '404',
  methodNotAllowed: '405',
  notAcceptable: '406',
  proxyAuthenticationRequired: '407',
  requestTimeout: '408',
  conflict: '409',
  gone: '410',
  lengthRequired: '411',
  preconditionFailed: '412',
  payloadTooLarge: '413',
  uriTooLong: '414',
  unsupportedMediaType: '415',
  rangeNotSatisfiable: '416',
  expectationFailed: '417',
  imATeapot: '418',
  misdirectedRequest: '421',
  unprocessableEntity: '422',
  locked: '423',
  failedDependency: '424',
  tooEarly: '425',
  upgradeRequired: '426',
  preconditionRequired: '428',
  tooManyRequests: '429',
  requestHeaderFieldsTooLarge: '431',
  unavailableForLegalReasons: '451',
  internalServerError: '500',
  notImplemented: '501',
  badGateway: '502',
  serviceUnavailable: '503',
  gatewayTimeout: '504',
  httpVersionNotSupported: '505',
  variantAlsoNegotiates: '506',
  insufficientStorage: '507',
  loopDetected: '508',
  bandwidthLimitExceeded: '509',
  notExtended: '510',
  networkAuthenticationRequired: '511'
};

/**
 * Represent the five official categorizations of HTTP status codes as well as a custom one
 * representing pure client-side errors.
 */
export enum HttpStatusCategory {
  ClientInternalError,
  Informational,
  Ok,
  Redirect,
  UserError,
  ServerError,
}

/**
 * Returns the {@link HttpStatusCategory} for a given status code.
 */
export function toHttpStatusCodeCategory(code: string | number) {
  return Number.parseInt(code.toString().charAt(0)) as HttpStatusCategory;
}

/**
 * Determines if an HTTP status code represents the non-standard client-side status code, `000`.
 */
export function isClientInternalErrorStatusCode(code: string | number) {
  return toHttpStatusCodeCategory(code) === HttpStatusCategory.ClientInternalError;
}

/**
 * Determines if a status code represents an informational message. Rarely used in web
 * development outside of low-level protocol implementations.
 */
export function isInformationalStatusCode(code: string | number) {
  return toHttpStatusCodeCategory(code) === HttpStatusCategory.Informational;
}

/**
 * Determines if the HTTP status code is any of the acceptable response codes.
 */
export function isOkStatusCode(code: string | number) {
  return toHttpStatusCodeCategory(code) === HttpStatusCategory.Ok;
}

/**
 * Determines if the HTTP status code is any of the redirect codes.
 */
export function isRedirectStatusCode(code: string | number) {
  return toHttpStatusCodeCategory(code) === HttpStatusCategory.Redirect;
}

/**
 * Determines if the HTTP status code is any of the user request error codes.
 */
export function isUserErrorStatusCode(code: string | number) {
  return toHttpStatusCodeCategory(code) === HttpStatusCategory.UserError;
}

/**
 * Determines if the HTTP status code is any of the server error codes.
 */
export function isServerErrorStatusCode(code: string | number) {
  return toHttpStatusCodeCategory(code) === HttpStatusCategory.ServerError;
}
