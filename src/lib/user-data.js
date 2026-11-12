const ONBOARDING_FIELDS = [
  "fullName",
  "bio",
  "nativeLanguage",
  "learningLanguage",
  "location",
];

export function normalizeOnboardingPayload(input) {
  const missingFields = ONBOARDING_FIELDS.filter(
    (field) => typeof input?.[field] !== "string" || !input[field].trim(),
  );

  if (missingFields.length) {
    return { missingFields, update: null };
  }

  const update = Object.fromEntries(
    ONBOARDING_FIELDS.map((field) => [field, input[field].trim()]),
  );

  // The frontend supports selecting a new avatar while onboarding.
  // Keep this optional profile field without accepting arbitrary model fields.
  if (typeof input.profilePic === "string") {
    update.profilePic = input.profilePic.trim();
  }

  return { missingFields: [], update };
}

export function toPublicUser(user) {
  if (!user) return user;

  const record = typeof user.toObject === "function" ? user.toObject() : user;
  const safeUser = { ...record };
  delete safeUser.password;
  return safeUser;
}
