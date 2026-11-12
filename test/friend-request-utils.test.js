import assert from "node:assert/strict";
import test from "node:test";
import { isAlreadyFriends, isPendingFriendRequest } from "../src/lib/friend-request-utils.js";

test("recognizes ObjectId-like friends when the current user ID is a string", () => {
  const objectIdLike = { toString: () => "507f1f77bcf86cd799439011" };
  assert.equal(isAlreadyFriends([objectIdLike], "507f1f77bcf86cd799439011"), true);
  assert.equal(isAlreadyFriends(["507f1f77bcf86cd799439011"], "507f1f77bcf86cd799439011"), true);
});

test("rejects unrelated user IDs and absent friend lists", () => {
  assert.equal(isAlreadyFriends([{ toString: () => "507f1f77bcf86cd799439011" }], "507f1f77bcf86cd799439012"), false);
  assert.equal(isAlreadyFriends(undefined, "507f1f77bcf86cd799439011"), false);
});

test("only pending requests can transition to accepted", () => {
  assert.equal(isPendingFriendRequest({ status: "pending" }), true);
  assert.equal(isPendingFriendRequest({ status: "accepted" }), false);
  assert.equal(isPendingFriendRequest(null), false);
});
