import { API_AUCTION_URL } from "../constans.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";
/**
 * This function sends the information to the API, receives the Response, and saves it to local storage
 *
 */
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
  const { accessToken, ...user } = await response.json();

  if (response.ok) {
    storage.save("token", accessToken);
    storage.save("profile", user);
    window.location.replace("/");
  } else {
    alert("Make sure that the email or password is correct");
  }
}
