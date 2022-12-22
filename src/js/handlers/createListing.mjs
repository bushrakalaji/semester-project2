import { createListing } from "../api/listings/index.mjs";

export function setCreateFormListener() {
  const form = document.querySelector("#createListing");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const listing = Object.fromEntries(formData.entries());
      console.log(listing);

      // Send it to API
      createListing(listing);
    });
  }
}
