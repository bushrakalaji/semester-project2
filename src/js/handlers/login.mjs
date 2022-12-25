import { login } from "../api/auth/login.mjs";
/**
 * This function attaches an event listener to a "loginForm" form  that sends the form data to the login function when a form submission event is triggered.
 */
export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      // Send it to API
      login(profile);
    });
  }
}
