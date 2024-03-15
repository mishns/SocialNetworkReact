export const REFERRER_POLICY =
  process.env.NODE_ENV === "development"
    ? "same-origin"
    : "strict-origin-when-cross-origin";
export const API_URL = "http://127.0.0.1:4000";
