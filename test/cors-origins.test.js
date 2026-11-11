import assert from "node:assert/strict";
import test from "node:test";
import { createAllowedOrigins, isAllowedOrigin } from "../src/lib/cors-origins.js";

test("permits the known production frontend and local development", () => {
  const origins = createAllowedOrigins();
  assert.equal(isAllowedOrigin("http://localhost:5173", origins), true);
  assert.equal(
    isAllowedOrigin("https://dardasha-real-time-chat-frontend.vercel.app", origins),
    true,
  );
});

test("does not trust arbitrary Vercel deployments or lookalike domains", () => {
  const origins = createAllowedOrigins();
  assert.equal(isAllowedOrigin("https://unrelated.vercel.app", origins), false);
  assert.equal(
    isAllowedOrigin("https://dardasha-real-time-chat-frontend.vercel.app.evil.test", origins),
    false,
  );
  assert.equal(isAllowedOrigin("https://evil.test", origins), false);
});

test("allows explicit preview origins configured by the owner", () => {
  const origins = createAllowedOrigins(
    " https://preview-one.vercel.app, https://preview-two.vercel.app , ",
  );
  assert.equal(isAllowedOrigin("https://preview-one.vercel.app", origins), true);
  assert.equal(isAllowedOrigin("https://preview-two.vercel.app", origins), true);
  assert.equal(isAllowedOrigin("https://other.vercel.app", origins), false);
});

test("non-browser requests without an Origin header remain permitted", () => {
  assert.equal(isAllowedOrigin(undefined, createAllowedOrigins()), true);
});
