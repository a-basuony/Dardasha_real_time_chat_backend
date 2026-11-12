export function isAlreadyFriends(friendIds, userId) {
  const target = String(userId);
  return Array.isArray(friendIds) && friendIds.some((id) => id?.toString() === target);
}

export function isPendingFriendRequest(request) {
  return request?.status === "pending";
}
