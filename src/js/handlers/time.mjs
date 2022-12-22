var currentDate = new Date();

var day = currentDate.getDate();
var month = currentDate.getMonth() + 1; // January is 0, so we need to add 1
var year = currentDate.getFullYear();

var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
var ampm = hours >= 12 ? "PM" : "AM";

hours = hours % 12;
hours = hours == 0 ? 12 : hours; // Convert 0 to 12

minutes = ("0" + minutes).slice(-2); // Add leading 0 if needed

export var mydateString =
  month + "/" + day + "/" + year + ", " + hours + ":" + minutes + " " + ampm;

console.log(mydateString); // Outputs "12/06/2022, 11:22 AM"
