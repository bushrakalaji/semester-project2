import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import { setCreateFormListener } from "./handlers/createListing.mjs";
import { setUpdateAvatar } from "./handlers/updateAvatar.mjs";
import { setUpdateFormListener } from "./handlers/updateListing.mjs";
import { listingsTemplate } from "./templates/listings.mjs";
import { listingById } from "./templates/listing.mjs";
import { veiwlistingById } from "./templates/veiw.mjs";
import { myProfile } from "./templates/profile.mjs";
import { biddersList } from "./templates/bidders.mjs";
import { searchFonction } from "./handlers/search.mjs";
import { myProfileListings } from "./templates/profileListings.mjs";

const path = location.pathname;

if (path === "/profile/login/") {
  setLoginFormListener();
} else if (path === "/profile/register/") {
  setRegisterFormListener();
} else if (path === "/listing/create/") {
  setCreateFormListener();
} else if (path === "/listing/edit/") {
  setUpdateFormListener();
} else if (path === "/") {
  listingsTemplate();
  searchFonction();
} else if (path === "/listing/") {
  listingById();
  biddersList();
} else if (path === "/listing/guest/") {
  veiwlistingById();
  biddersList();
} else if (path === "/profile/edit/") {
  setUpdateAvatar();
} else if (path === "/profile/") {
  myProfile();
  myProfileListings();
}
