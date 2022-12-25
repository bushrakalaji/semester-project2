import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constans.mjs";

const action = "/listings";
const myTag = "?_tag=art";
/**
 * This function fetches a listings from the API using its "tag" and returns the result.
 *
 */
export async function getListings() {
  const getListingsURL = `${API_AUCTION_URL}${action}${myTag}`;
  const response = await authFetch(getListingsURL);
  return await response.json();
}
/**
 * This function fetches a listing from the API using its ID and returns the result.
 *
 */
export async function getListing(id) {
  if (!id) {
    throw new Error("Get listing requires a listing ID");
  }
  const getListingURL = `${API_AUCTION_URL}${action}/${id}?_seller=true&_bids=true`;

  const response = await authFetch(getListingURL);
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    throw new Error(response.statusText);
  }
}
