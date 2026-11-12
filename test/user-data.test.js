import assert from "node:assert/strict";
import test from "node:test";
import { normalizeOnboardingPayload, toPublicUser } from "../src/lib/user-data.js";

test("onboarding keeps only the five editable profile fields", () => {
  const input = {
    fullName: " Alice ",
    bio: " Hi ",
    nativeLanguage: " English ",
    learningLanguage: " Spanish ",
    location: " Cairo ",
    email: "attacker@example.com",
    password: "unhashed-password",
    friends: ["unexpected-user"],
    isOnboarded: false,
  };
  const actual = normalizeOnboardingPayload(input);
  assert.deepEqual(actual, {
    missingFields: [],
    update: {
      fullName: "Alice",
      bio: "Hi",
      nativeLanguage: "English",
      learningLanguage: "Spanish",
      location: "Cairo",
    },
  });
});

test("onboarding rejects empty and non-string required fields", () => {
  const actual = normalizeOnboardingPayload({
    fullName: "  ",
    bio: {},
    nativeLanguage: "English",
    learningLanguage: "Spanish",
    location: "Cairo",
  });
  assert.deepEqual(actual.missingFields, ["fullName", "bio"]);
  assert.equal(actual.update, null);
  assert.equal(normalizeOnboardingPayload(null).missingFields.length, 5);
});

test("public serializer drops password without mutating a model document", () => {
  const stored = { _id: "123", email: "a@example.com", password: "hash", fullName: "Alice" };
  const document = { toObject: () => stored };
  const actual = toPublicUser(document);
  assert.deepEqual(actual, { _id: "123", email: "a@example.com", fullName: "Alice" });
  assert.equal(stored.password, "hash");
  assert.equal("password" in actual, false);
});

test("public serializer also handles plain objects and a missing user", () => {
  assert.deepEqual(toPublicUser({ _id: "123", password: "hash" }), { _id: "123" });
  assert.equal(toPublicUser(null), null);
});
