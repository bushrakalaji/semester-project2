import { load } from "../../storage/index.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_AUCTION_URL } from "../constans.mjs";

const action = "/profiles";
export async function getMyProfile(name) {
  const getprofileURL = `${API_AUCTION_URL}${action}/${name}/listings`;
  const response = await authFetch(getprofileURL);
  return await response.json();
}

export async function getProfile(name) {
  if (!name) {
    throw new Error("Get profile requires a name");
  }
  const getListingURL = `${API_AUCTION_URL}${action}/${name}`;
  const response = await authFetch(getListingURL);
  const result = await response.json();

  return result;
}
