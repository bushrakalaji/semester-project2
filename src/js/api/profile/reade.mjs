import { load } from "../../storage/index.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constans.mjs";
/**
 * This function sends a GET request to the API to fetch a list of listings filtered by name, and returns the result.
 */
const action = "/profiles";
export async function getMyProfile(name) {
  const getprofileURL = `${API_AUCTION_URL}${action}/${name}/listings`;
  const response = await authFetch(getprofileURL);
  return await response.json();
}
/**
 * This function sends a GET request to the API to fetch a profile based on its name, and returns the result.
 *
 */
export async function getProfile(name) {
  if (!name) {
    throw new Error("Get profile requires a name");
  }
  const getListingURL = `${API_AUCTION_URL}${action}/${name}`;
  const response = await authFetch(getListingURL);
  const result = await response.json();

  return result;
}
