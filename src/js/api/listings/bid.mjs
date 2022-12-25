import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constans.mjs";

const action = "/listings";
const bids = "bids";
const method = "post";
/**
 * This function sends the bid amount to the API and receives the Respons.
 *
 */
export async function listingBid(id, amount) {
  const displayError = document.querySelector("#liveAlertPlaceholder");

  const bidURL = `${API_AUCTION_URL}${action}/${id}/${bids}?_seller=true&_bids=true`;

  const response = await authFetch(bidURL, {
    method,
    body: JSON.stringify({ amount: Number(amount) }),
  });
  const result = await response.json();
  console.log(result);
  if (response.ok) {
    window.location.reload();
    return result;
  } else {
    throw new Error((displayError.innerHTML = result.errors[0].message));
  }
}
