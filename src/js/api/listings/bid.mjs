import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constans.mjs";

const action = "/listings";
const bids = "bids";
const method = "post";

export async function listingBid(id, amount) {
  const bidURL = `${API_AUCTION_URL}${action}/${id}/${bids}?_seller=true&_bids=true`;

  const response = await authFetch(bidURL, {
    method,
    body: JSON.stringify({ amount: Number(amount) }),
  });
  const result = await response.json();
  console.log(result);
  return result;
}
