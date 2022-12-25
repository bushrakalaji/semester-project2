import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constans.mjs";

const action = "/listings";
const method = "post";

export async function createListing(listingData) {
  listingData.tags = listingData.tags.split(" ");
  listingData.media = listingData.media.split(" ");
  const createListingURL = API_AUCTION_URL + action;

  const response = await authFetch(createListingURL, {
    method,
    body: JSON.stringify(listingData),
  });

  alert("Listing created");
  window.location.replace("/profile/");
  return await response.json();
}
