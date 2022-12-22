import { remove } from "../storage/index.mjs";

export function logout() {
  document.querySelector("#logout").addEventListener("click", function () {
    remove("profile");
    remove("token");
    window.location.reload();
  });
}
