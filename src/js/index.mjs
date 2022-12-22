import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import { setCreateFormListener } from "./handlers/createListing.mjs";
import { bidFormListener } from "./handlers/bid.mjs";
import { setUpdateFormListener } from "./handlers/updateListing.mjs";
import { listingsTemplate } from "./templates/listings.mjs";
import { listingById } from "./templates/listing.mjs";
import { veiwlistingById } from "./templates/veiw.mjs";

const path = location.pathname;

if (path === "/profile/login/") {
  setLoginFormListener();
} else if (path === "/profile/register/") {
  setRegisterFormListener();
} else if (path === "/post/create/") {
  setCreateFormListener();
} else if (path === "/post/edit/") {
  setUpdateFormListener();
} else if (path === "/") {
  listingsTemplate();
} else if (path === "/post/") {
  listingById();
} else if (path === "/post/veiw/") {
  veiwlistingById();
}
