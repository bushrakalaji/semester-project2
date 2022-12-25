import { register } from "../api/auth/register.mjs";
/**
 * This function attaches an event listener to a register button that sends the form data to the register function when a form submission event is triggered.
 */
export function setRegisterFormListener() {
  const form = document.querySelector("#registerForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      // Send it to API
      register(profile);
    });
  }
}
