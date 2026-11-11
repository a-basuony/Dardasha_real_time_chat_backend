const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://dardasha-real-time-chat-frontend.vercel.app",
];

export function createAllowedOrigins(configuredOrigins = "") {
  const additional = configuredOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...additional]);
}

export function isAllowedOrigin(origin, allowedOrigins) {
  // Missing Origin headers are common for server-to-server and CLI requests.
  return !origin || allowedOrigins.has(origin);
}
