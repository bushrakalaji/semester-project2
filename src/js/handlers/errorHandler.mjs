/**
 * This function generates a string with an error message displayed in a div element with specific class names. If no message is passed as an argument, the default message is "undefined".
 * @param {string} message
 * @returns
 */
export function errorHandler(message = "undefined") {
  return `<div class="error text-secondary bg-primary">${message}</div>`;
}
/**
 * This function generates a string with an error message displayed in a div element with specific class names. If no message is passed as an argument, the default message is "Not Found".
 * @param {string} message
 * @returns
 */
export function profileErrorHandler(message = "Not Found") {
  return `<div class="error text-secondary bg-primary">${message}</div>`;
}
