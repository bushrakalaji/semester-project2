import * as listingsData from "../api/listings/index.mjs";
import { mydateString } from "./time.mjs";
import { load } from "../storage/index.mjs";
import { errorHandler } from "./errorHandler.mjs";
/**
 * This function attaches an event listener to a search bar element that filters a list of listings based on the value of the search bar, generates HTML elements with the filtered results, and inserts them into the DOM when a keyup event is triggered.
 */
export async function searchFonction() {
  const container = document.querySelector(".listings");
  try {
    const loggedIn = load("token");
    const listings = await listingsData.getListings();
    const searchBar = document.querySelector(".searchBar");
    searchBar.addEventListener("keyup", handelNameControlInput);
    function handelNameControlInput(event) {
      const inputValue = event.currentTarget.value.toLowerCase();
      const filteredResult = listings.filter(({ title }) => {
        return title.toLowerCase().includes(inputValue);
      });

      container.innerHTML = "";
      filteredResult.forEach(function (filterdListings) {
        const dateObject = new Date(filterdListings.endsAt);
        const dateString = dateObject.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        let myLink = `/listing/?id=${filterdListings.id}`;
        if (!loggedIn) {
          myLink = `/listing/guest/?id=${filterdListings.id}`;
        }

        let myTime = "This listing is ended";
        if (mydateString < dateString) {
          myTime = `${dateString}`;
        }

        let image = `<img src="https://raw.githubusercontent.com/bushrakalaji/semester-project2/d7b5da7e9484a2d08218ca79c550dd7e3323a3c0/images/placeholder.jpg
      "class="card-img-top crd-img-hover imgSize"
      alt="${filterdListings.title}"/> `;

        if (filterdListings.media[0]) {
          image = `<img
        src="${filterdListings.media}"
        onerror = "src='https://raw.githubusercontent.com/bushrakalaji/semester-project2/d7b5da7e9484a2d08218ca79c550dd7e3323a3c0/images/placeholder.jpg'"
        class="card-img-top crd-img-hover imgSize"
        alt="${filterdListings.title}"
      />`;
        }

        container.innerHTML += `

      <div class="col">
      <div
        class="card bg-primary text-light rounded-0 border-primary shadow crd-shdw"
      >
      <div class="imgDiv"> ${image} </div>
        <div
            class="card-body d-flex justify-content-between position-relative"
            >
            <h5 class="card-title mb-0">${filterdListings.title}</h5>
            <div class="goButton">
            <a href="${myLink}"  class="btn btn-outline-primary me-2 rounded-pill ps-3 pe-3 pt-1 pb-1">
                Go Now!
               </a></div>
            <span
                class="position-absolute bottom-100 start-0 bg-primary text-secondary rounded-top p-2"
                >Ends At : ${myTime} </span>
            </div>
      </div>
    </div>
      
      `;
      });
    }
  } catch (error) {
    container.innerHTML += errorHandler(
      "An error occurred when calling the API"
    );
  }
}
