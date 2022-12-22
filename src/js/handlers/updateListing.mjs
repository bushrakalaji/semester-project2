import { getListing, updateListing } from "../api/listings/index.mjs";

export async function setUpdateFormListener() {
  const form = document.querySelector("#updateListing");
  const url = new URL(location.href);
  new URLSearchParams();
  const id = url.searchParams.get("id");
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
      console.log(listing);
      listing.id = id;
      // Send it to API
      updateListing(listing);
    });
  }
}
