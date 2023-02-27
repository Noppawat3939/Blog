const ERR_MESSAGE = {
  USER: {
    MIN: "Username must be more than 4 characters",
  },
  PASSWORD: {
    MIN: "Password must be more than 6 characters",
    NOT_MATCH: "Passwords do not match",
  },
  EMAIL: "Email isn't valid",
};

export const REGEX = {
  USERNAME: {
    MIN: 4,
  },
  PASSWORD: {
    MIN: 6,
  },
  ERR_MESSAGE,
};
