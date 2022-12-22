import { API_AUCTION_URL } from "../api/constans.mjs";
import { authFetch } from "../api/authFetch.mjs";
import { bidFormListener } from "../handlers/bid.mjs";
import { mydateString } from "../handlers/time.mjs";
import { load } from "../storage/index.mjs";

export async function veiwlistingById() {
  const resultById = document.querySelector(".veiwListingID");
  try {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    const singleUrl =
      API_AUCTION_URL + "/listings/" + id + "?_seller=true&_bids=true";
    const response = await authFetch(singleUrl);
    const singleResult = await response.json();
    const chekBid = singleResult.bids.length;
    const profileImg = singleResult.seller.avatar;
    const seller = singleResult.seller.email;
    console.log(seller);
    const dateObject = new Date(singleResult.endsAt);
    const dateString = dateObject.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    let profileImage = `${profileImg}`;
    if (!profileImg) {
      profileImage = `
      <img
      src="https://i.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ"
      alt=""
      class="prfl-img border border-light rounded-circle"
    />
    `;
    }

    let lastBid = `${chekBid}`;
    if (chekBid === 0) {
      lastBid = `No bids yet`;
    }

    let myTime = "This listing is ended";

    if (mydateString < dateString) {
      myTime = `${dateString}`;
    }

    console.log(singleResult);
    let image = `<img src="https://raw.githubusercontent.com/bushrakalaji/semester-project2/d7b5da7e9484a2d08218ca79c550dd7e3323a3c0/images/placeholder.jpg
      "class="card-img-top crd-img-hover "
      id ="hei"
      alt="${singleResult.title}"/> `;

    if (singleResult.media[0]) {
      image = `<img
        src="${singleResult.media}"
        onerror = "src='https://raw.githubusercontent.com/bushrakalaji/semester-project2/d7b5da7e9484a2d08218ca79c550dd7e3323a3c0/images/placeholder.jpg'"
        class="card-img-top crd-img-hover"
        id ="hei"
        alt="${singleResult.title}"
      />`;
    }

    resultById.innerHTML += `
    <div class="row container gap-3 mt-5">
      <div class="col-sm-6 p-0">
       ${image}
      </div>
      <div class="bg-primary text-light col-sm-5">
        <div class="mb-5">
          <h1>${singleResult.title}</h1>
          <span class="text-secondary">Ends At : ${myTime}</span>
        </div>

        <span class="text-success">CURRENT BID </span>
        <div class="d-flex gap-2">
          <span>${lastBid} </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-coin"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"
            />
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            />
          </svg>
        </div>
        <div class="mt-5">
          <h5>Bidder</h5>

          <span>${
            singleResult.bids[singleResult.bids.length - 1].bidderName
          }</span>
          <div>
            <span>Amount : ${
              singleResult.bids[singleResult.bids.length - 1].amount
            } </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-coin"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"
              />
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-primary text-light mt-5 d-flex justify-content-evenly align-items-start gap-3 p-5 flex-wrap"
    >
      <div class="mb-3 pt-5">
        <h4 class="mb-3">Description</h4>
        <p>
       ${singleResult.description}
        </p>
      </div>
      <div>
        <h4 class="mb-3 pt-5">Seller</h4>
        <div class="d-flex align-items-center gap-3">
          <div
            class="seller-img text-light position-relative rounded-circle"
          >
           
              ${profileImage}
             
          </div>
          <div class="text-light fs-5 d-flex flex-column">
            <span>Username : ${singleResult.seller.name}</span>
            <span>Email : ${singleResult.seller.email}</span>
            <span>Wins : ${singleResult.seller.wins.length}</span>
          </div>
        </div>
      </div>
    </div>
  
    `;
  } catch {
    console.log("error");
  }
}
