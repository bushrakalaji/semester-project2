import { deleteListing } from "../api/listings/delete.mjs";

export function deleteMe(id) {
  document.querySelector("#delete").addEventListener("click", () => {
    deleteListing(id);
  });
}
