import { listingBid } from "../api/listings/index.mjs";
/**
 * This function attaches an event listener to a form element that sends the form data and the listing ID to the listingBid function when a form submission event is triggered.
 */
export async function bidFormListener() {
  const form = document.querySelector("#bidForm");
  const url = new URL(location.href);
  new URLSearchParams();
  const id = url.searchParams.get("id");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const bidData = Object.fromEntries(formData.entries());
      bidData.id = id;
      //   Send it to API
      listingBid(id, Number(bidData.amount));
    });
  }
}
