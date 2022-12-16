import { API_AUCTION_URL } from "../constans.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_AUCTION_URL + action;
  const body = JSON.stringify(profile);
  const response = await fetch(loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });
  const result = await response.json();
  return result;
}
