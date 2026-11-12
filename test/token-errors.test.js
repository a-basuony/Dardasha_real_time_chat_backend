import assert from "node:assert/strict";
import test from "node:test";
import { isInvalidAuthTokenError } from "../src/lib/token-errors.js";

test("expired, malformed, and not-yet-valid JWTs are authentication failures", () => {
  for (const name of ["JsonWebTokenError", "TokenExpiredError", "NotBeforeError"]) {
    assert.equal(isInvalidAuthTokenError({ name }), true);
  }
});

test("database and programmer failures are not mistaken for bad JWTs", () => {
  assert.equal(isInvalidAuthTokenError(new Error("MongoDB unavailable")), false);
  assert.equal(isInvalidAuthTokenError(undefined), false);
  assert.equal(isInvalidAuthTokenError({ name: "CastError" }), false);
});
