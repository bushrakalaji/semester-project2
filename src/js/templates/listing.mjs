import { API_AUCTION_URL } from "../api/constans.mjs";
import { authFetch } from "../api/authFetch.mjs";
import { bidFormListener } from "../handlers/bid.mjs";
import { mydateString } from "../handlers/time.mjs";
import { load } from "../storage/index.mjs";
import { errorHandler } from "../handlers/errorHandler.mjs";
import { deleteMe } from "../handlers/delete.mjs";

export async function listingById() {
  const resultById = document.querySelector(".listingID");
  const postBreadCrumbs = document.querySelector(".postBreadCrumbs");
  const bidders = document.querySelector("bidders");
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
    console.log(singleResult.bids.length);
    const seller = singleResult.seller.email;
    console.log(seller);
    const profile = load("profile");
    const currentAuther = profile.email;
    console.log(currentAuther);
    const dateObject = new Date(singleResult.endsAt);
    const dateString = dateObject.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    console.log(singleResult);

    let profileImage = `
    <img
    src="${singleResult.seller.avatar}"
    alt="${singleResult.seller.name}"
    class="prfl-img border border-light rounded-circle prfl-img sellerImg"
  />
  `;
    if (!profileImg) {
      profileImage = `
      <img
      src="https://i.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI"
      alt="${singleResult.seller.name}"
      class="prfl-img border border-light rounded-circle prfl-img sellerImg"
    />
    `;
    }

    let sortBids = singleResult.bids;
    sortBids.sort((b, a) => {
      // sort the array in descending order by created date
      return new Date(b.created) - new Date(a.created);
    });

    const lastItem = sortBids[sortBids.length - 1];

    let lastBid = `No bids yet`;

    if (sortBids.length > 0) {
      lastBid = `${lastItem.amount}`;
    }

    let myTime = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
  </svg>  <span>This listing is ended</span>`;

    if (mydateString < dateString) {
      myTime = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 16 16">
      <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
      <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
    </svg> ${dateString}`;
    }

    let image = `<img src="https://raw.githubusercontent.com/bushrakalaji/semester-project2/d7b5da7e9484a2d08218ca79c550dd7e3323a3c0/images/placeholder.jpg
      "class="card-img-top  rounded border  border-dark"
      id ="hei"
      alt="${singleResult.title}"/> `;

    if (singleResult.media[0]) {
      image = `<img
        src="${singleResult.media}"
        onerror = "src='https://raw.githubusercontent.com/bushrakalaji/semester-project2/d7b5da7e9484a2d08218ca79c550dd7e3323a3c0/images/placeholder.jpg'"
        class="card-img-top  rounded border border-dark "
        id ="hei"
        alt="${singleResult.title}"
      />`;
    }

    function myPosts() {
      resultById.innerHTML += `<div class="row container gap-5 mt-2 text-light">
  <div class="col-sm-4 p-0 1 listing-img">${image}</div>
  <div class="bg-primary text-light col-sm-6 position-relative">
    <div class="position-absolute top-0 start-100 translate-middle d-flex">
      <a href="/post/edit/?id=${singleResult.id}" class="text-secondary"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          /></svg
      ></a>
      <button class="bg-primary text-secondary border-0" id="delete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-trash3"
          viewBox="0 0 16 16"
        >
          <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
          />
        </svg>
      </button>
    </div>
    <h1 class="text-uppercase me-5 pWidth">${singleResult.title}</h1>
    <span class="text-secondary"> ${myTime}</span>
    <h4 class="text-success border-top mt-3 pt-3 border-dark">CURRENT BID</h4>
    <div class="d-flex gap-2">
      <h5 class="fw-light">${lastBid}</h5>
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
    <div class="mb-3 col-sm-12">
      <h4 class="mb-3 text-success mt-5 border-top mt-3 pt-3 border-dark">
        Description
      </h4>
      <p class="fw-light pWidth">${singleResult.description}</p>
    </div>
  </div>
</div>
`;
    }

    if (seller === currentAuther) {
      myPosts();
      deleteMe(id);
    } else {
      resultById.innerHTML += `
      <div class="row container gap-5 mt-2 text-light ">
      <div class="col-sm-6 p-0 1 listing-img">${image}</div>
      <div class="bg-primary text-light col-sm-5 "> 
       <h1 class="text-uppercase">${singleResult.title}</h1>
          <span class="text-secondary"> ${myTime}</span>
          <h4 class="text-success mt-5 border-top mt-3 pt-3 border-dark">CURRENT BID</h4>
          <div class="d-flex gap-2">
          <h5 class="fw-light">${lastBid}</h5>
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
          <h4 class="text-success border-top mt-3 pt-3 border-dark">Bid</h4>
          <form class="text-primary" id="bidForm">
            <div class="form-floating mb-3">
              <input type="number" name="amount" class="form-control" required />
              <label for="floatingInput" class="text-primary">Bid</label>
            </div>
    
            <button
              class="w-100 btn btn-lg btn-outline-primary rounded-pill"
              type="submit"
            >
              Place bid
            </button>
          </form>
        </div>
        <span id="liveAlertPlaceholder" class="text-secondary p-3"></span>
      </div>
       </div> 
       
        <div class="mb-3 col-sm-12">
            <h4 class="mb-3 text-success mt-5 border-top mt-3 pt-3 border-dark">Description</h4>
            <p class="fw-light pWidth text-light">${singleResult.description}</p>
          </div>
      <div class="col-sm-12 mb-4">
          <h4 class="mb-3 text-success border-top mt-3 pt-3 border-dark">Seller</h4>
          <div class="d-flex align-items-center gap-3">
          <div class="seller-img text-light rounded-circle">${profileImage}</div>
          <div class="text-light fs-5 d-flex flex-column fw-light">
              <span>Username : ${singleResult.seller.name}</span>
              <span>Email : ${singleResult.seller.email}</span>
              <span>Wins : ${singleResult.seller.wins.length}</span>
          </div>
          </div>
      </div>
  </div>`;
    }

    function postCrumbs() {
      postBreadCrumbs.innerHTML += `
      <a href="" class="text-secondary">${singleResult.title}</a>
      `;
    }
    postCrumbs();
  } catch (error) {
    resultById.innerHTML += errorHandler(
      "An error occurred when calling the API"
    );
  }
  bidFormListener();
}
