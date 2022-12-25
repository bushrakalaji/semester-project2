import { remove } from "../storage/index.mjs";
/**
 * This function attaches an event listener to a Logout button that clears the "profile" and "token" items from storage and refreshes the current page when clicked
 */
export function logout() {
  document.querySelector("#logout").addEventListener("click", function () {
    remove("profile");
    remove("token");
    window.location.reload();
  });
}
