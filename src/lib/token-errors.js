const TOKEN_ERROR_NAMES = new Set([
  "JsonWebTokenError",
  "TokenExpiredError",
  "NotBeforeError",
]);

export function isInvalidAuthTokenError(error) {
  return TOKEN_ERROR_NAMES.has(error?.name);
}
