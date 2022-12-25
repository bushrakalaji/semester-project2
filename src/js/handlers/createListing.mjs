import { createListing } from "../api/listings/index.mjs";
/**
 * This function attaches an event listener to a form element that sends the form data to the createListing function when a form submission event is triggered.
 */
export function setCreateFormListener() {
  const form = document.querySelector("#createListing");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const listing = Object.fromEntries(formData.entries());

      // Send it to API
      createListing(listing);
    });
  }
}
