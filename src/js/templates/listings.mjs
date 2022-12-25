import * as listingsData from "../api/listings/index.mjs";
import { listingById } from "./listing.mjs";
import { mydateString } from "../handlers/time.mjs";
import { load } from "../storage/index.mjs";
import { logout } from "../handlers/logout.mjs";
import { errorHandler } from "../handlers/errorHandler.mjs";
/**
 * This function displays a list of listings.
 */
export async function listingsTemplate() {
  const container = document.querySelector(".listings");
  const changes = document.querySelector(".navChange");
  const ctaChange = document.querySelector(".cta");
  const homeInfo = document.querySelector(".homeInfo");
  const goButton = document.querySelector(".goButton");
  const loggedIn = load("token");
  try {
    const listings = await listingsData.getListings();
    container.innerHTML += "";
    listings.forEach(function (listing) {
      const dateObject = new Date(listing.endsAt);
      const dateString = dateObject.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // If the user is logged in, the link will be to the page for viewing the listing with the given ID. If the user is not logged in, the link will be to the page for viewing the listing as a guest with the given ID.

      let myLink = `/listing/?id=${listing.id}`;
      if (!loggedIn) {
        myLink = `/listing/guest/?id=${listing.id}`;
      }

      // checks whether the current date and time is less than the date and time when the listing ends.

      let myTime = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
      <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
    </svg> <span>This listing is ended</span>`;

      if (mydateString < dateString) {
        myTime = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 16 16">
        <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
        <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
      </svg> ${dateString}`;
      }

      // sets the src and alt attributes of an image element based on the media property of the singleResult object

      let image = `<img src="https://raw.githubusercontent.com/bushrakalaji/semester-project2/d7b5da7e9484a2d08218ca79c550dd7e3323a3c0/images/placeholder.jpg
      "class="card-img-top imgSize"
      alt="${listing.title}"/> `;

      if (listing.media[0]) {
        image = `<img
        src="${listing.media}"
        onerror = "src='https://raw.githubusercontent.com/bushrakalaji/semester-project2/d7b5da7e9484a2d08218ca79c550dd7e3323a3c0/images/placeholder.jpg'"
        class="card-img-top imgSize"
        alt="${listing.title}"
      />`;
      }

      container.innerHTML += `
        <div class="col">
        <div class="card bg-primary text-light border-primary rounded">
            <div class="imgDiv">${image}</div>
            <div class="card-body d-flex justify-content-between position-relative">
            <h5 class="card-title mb-0 text-uppercase">${listing.title}</h5>
            <div class="goButton">
                <a
                href="${myLink}"
                class="btn btn-outline-primary me-2 rounded-pill ps-3 pe-3 pt-1 pb-1"
                >
                Go Now!
                </a>
            </div>
            <span
                class="position-absolute bottom-100 start-0 bg-primary text-secondary rounded-top p-2"
                >${myTime}
            </span>
            </div>
        </div>
        </div>
        
      `;
    });

    if (loggedIn) {
      loggedInNav();
      logout();
      loggedInCta();
      loggedInfo();
    }

    function loggedInNav() {
      changes.innerHTML = `
    
    <a  href="/profile/"
            class="btn btn-outline-primary me-2 rounded-pill ps-3 pe-3 pt-1 pb-1"
          >
            Profile
          </a>
          <button
          class="btn btn-outline-primary rounded-pill me-3 ps-3 pe-3 pt-1 pb-1"
          id="logout"
        >
         logout 
        </button>
    `;
    }

    function loggedInCta() {
      ctaChange.innerHTML = `
      
    
    <a
            href="/listing/create/"
            class="btn btn-outline-primary rounded-pill ps-4 pe-4 pt-2 pb-2 "
          >
            Create listing
          </a>
      `;
    }

    function loggedInfo() {
      homeInfo.innerHTML = `
        <div class="text-uppercase fs-1">
            <span class="text-secondary">start an auction or</span>
            <span class="text-success">win</span>
            <span class="text-secondary">a bid</span>
          </div>

          <h1 class="text-uppercase fs-3">Welcome to Art-Part</h1>
          <div class="text-uppercase fs-4">
            <span>Now you can create your own</span>
            <span class="text-secondary">listings</span>
            <span>or</span>
            <span class="text-success">win</span>
            
            <span>unmissable deals.</span>
          </div>
     
        `;
    }

    // function veiwButton() {

    //     goButton.innerHTML = `

    //     <a href="${myLink}"  class="btn btn-outline-primary me-2 rounded-pill ps-3 pe-3 pt-1 pb-1">
    //     Go Now!
    //    </a>

    //     `

    // }
  } catch (error) {
    container.innerHTML += errorHandler(
      "An error occurred when calling the API"
    );
  }
}
