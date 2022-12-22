import * as listingsData from "../api/listings/index.mjs";
import { listingById } from "./listing.mjs";
import { mydateString } from "../handlers/time.mjs";
import { load } from "../storage/index.mjs";
import { logout } from "../handlers/logout.mjs";

export async function listingsTemplate() {
  const container = document.querySelector(".listings");
  const changes = document.querySelector(".navChange");
  const ctaChange = document.querySelector(".cta");
  const loggedIn = load("token");
  try {
    const listings = await listingsData.getListings();
    console.log(listings);
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

      let myLink = `/post/?id=${listing.id}`;
      if (!loggedIn) {
        myLink = `/post/veiw/?id=${listing.id}`;
      }

      let myTime = "This listing is ended";

      if (mydateString < dateString) {
        myTime = `${dateString}`;
      }

      let image = `<img src="https://raw.githubusercontent.com/bushrakalaji/semester-project2/d7b5da7e9484a2d08218ca79c550dd7e3323a3c0/images/placeholder.jpg
      "class="card-img-top crd-img-hover "
      alt="${listing.title}"/> `;

      if (listing.media[0]) {
        image = `<img
        src="${listing.media}"
        onerror = "src='https://raw.githubusercontent.com/bushrakalaji/semester-project2/d7b5da7e9484a2d08218ca79c550dd7e3323a3c0/images/placeholder.jpg'"
        class="card-img-top crd-img-hover "
        alt="${listing.title}"
      />`;
      }

      container.innerHTML += `

      <div class="col">
      <div
        class="card bg-primary text-light rounded-0 border-primary shadow crd-shdw"
      >
      <div>  ${image}  </div>
        <div
            class="card-body d-flex justify-content-between position-relative"
            >
            <h5 class="card-title mb-0">${listing.title}</h5>
            <a href="${myLink}"  class="btn btn-outline-primary me-2 rounded-pill ps-3 pe-3 pt-1 pb-1">
                Go Now!
               </a>
            <span
                class="position-absolute bottom-100 start-0 bg-primary text-secondary rounded-top p-2"
                >Ends At : ${myTime} </span>
            </div>
      </div>
    </div>
      
      `;
    });

    if (loggedIn) {
      loggedInNav();
      logout();
      loggedInCta();
    }

    function loggedInNav() {
      changes.innerHTML = `
    
    <a
            href="/profile/"
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
            href="/post/create/"
            class="btn btn-outline-primary rounded-pill ps-4 pe-4 pt-2 pb-2 "
          >
            Create listing
          </a>
      `;
    }
  } catch {}
}
