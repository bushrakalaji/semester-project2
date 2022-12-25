import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constans.mjs";

const action = "/listings";
const method = "delete";

export async function deleteListing(id) {
  if (!id) {
    throw new Error("Delete requires a listing ID");
  }
  const deleteListingURL = `${API_AUCTION_URL}${action}/${id}`;

  const response = await authFetch(deleteListingURL, {
    method,
  });
  alert("Your listing are deleted");
  window.location.replace("/profile/");
  return await response.json();
}
