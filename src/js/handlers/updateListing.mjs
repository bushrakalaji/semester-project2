import { getListing, updateListing } from "../api/listings/index.mjs";
/**
 * This function attaches an event listener to a form element that sends the form data and the ID of the listing to the updateListing function when a form submission event is triggered. Before the event listener is attached, the function retrieves the listing data for the specified ID and fills the form with the title, description, tags, and media of the listing.
 */
export async function setUpdateFormListener() {
  const form = document.querySelector("#updateListing");
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  if (form) {
    const listing = await getListing(id);

    form.title.value = listing.title;
    form.description.value = listing.description;
    form.tags.value = listing.tags;
    form.media.value = listing.media;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const listing = Object.fromEntries(formData.entries());
      listing.id = id;
      // Send it to API
      updateListing(listing);
    });
  }
}
