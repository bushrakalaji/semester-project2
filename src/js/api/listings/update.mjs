import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constans.mjs";

const action = "/listings";
const method = "put";
/**
 * make a PUT request to the API to update the listing with the specified ID
 */
export async function updateListing(listingData) {
  if (!listingData.id) {
    throw new Error("Update requires a listing ID");
  }
  listingData.tags = listingData.tags.split(" ");
  listingData.media = listingData.media.split(" ");
  const updateListingURL = `${API_AUCTION_URL}${action}/${listingData.id}`;

  const response = await authFetch(updateListingURL, {
    method,
    body: JSON.stringify(listingData),
  });
  alert("Listing updated");
  window.location.replace("/profile/");
  return await response.json();
}
