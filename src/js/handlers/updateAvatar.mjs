import { getListing, updateListing } from "../api/listings/index.mjs";
import { load } from "../storage/index.mjs";
import { getProfile, updateAvatar } from "../api/profile/index.mjs";
/**
 * This function attaches an event listener to a form element that sends the form data and the name and email of the logged-in user to the updateAvatar function when a form submission event is triggered. Before the event listener is attached, the function retrieves the profile data for the logged-in user and fills the form with the name, email, and avatar of the user
 */
export async function setUpdateAvatar() {
  const form = document.querySelector("#updateAvatar");

  if (form) {
    const { name, email } = load("profile");
    form.name.value = name;
    form.email.value = email;

    const button = form.querySelector("button");
    button.disabled = true;

    const profile = await getProfile(name);

    form.avatar.value = profile.avatar;

    console.log(profile);

    button.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      profile.name = name;
      profile.email = email;

      // Send it to API
      updateAvatar(profile);
    });
  }
}
