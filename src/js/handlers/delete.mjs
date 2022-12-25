import { deleteListing } from "../api/listings/delete.mjs";
/**
 * This function attaches an event listener to a "delete" button that sends the id to the deleteListing function when clicked.
 * @param {string} id
 */
export function deleteMe(id) {
  document.querySelector("#delete").addEventListener("click", () => {
    deleteListing(id);
  });
}
