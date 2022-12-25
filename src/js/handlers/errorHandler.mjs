export function errorHandler(message = "undefined") {
  return `<div class="error text-secondary bg-primary">${message}</div>`;
}
export function profileErrorHandler(message = "Not Found") {
  return `<div class="error text-secondary bg-primary">${message}</div>`;
}
