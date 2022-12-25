import { API_AUCTION_URL } from "../constans.mjs";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_AUCTION_URL + action;
  const body = JSON.stringify(profile);
  const response = await fetch(registerURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });
  const result = await response.json();

  if (response.ok) {
    alert("you are now registerd");
    window.location.replace("/profile/login/");
    return result;
  } else {
    alert(
      "The email or name is not available. Please try again with a different name or email"
    );
  }
}
