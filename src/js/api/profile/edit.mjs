import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constans.mjs";

const action = "/profiles";
const method = "put";

export async function updateAvatar(profileData) {
  if (!profileData.name) {
    throw new Error("Update requires a listing ID");
  }

  const updateProfileURL = `${API_AUCTION_URL}${action}/${profileData.name}/media`;

  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });
  alert("Avatar updated");
  window.location.replace("/profile/");
  return await response.json();
}
