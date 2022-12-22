// import *

// const mediaUrl = listing.media[0];
// export async function mediaStatus() {
//   let response;
//   try {
//     response = await fetch(mediaUrl);
//   } catch (error) {
//     console.error(error);
//   }

//   const status = response.status;

//   if (status >= 200 && status < 300) {
//     // The URL is valid and the image can be displayed
//     image = `<img src="${mediaUrl}" class="card-img-top crd-img-hover" alt="${listing.title}" />`;
//   } else {
//     // The URL is not valid, so display the placeholder image
//     image = `<img src="https://raw.githubusercontent.com/bushrakalaji/semester-project2/d7b5da7e9484a2d08218ca79c550dd7e3323a3c0/images/placeholder.jpg" class="card-img-top crd-img-hover" alt="${listing.title}" />`;
//   }
// }
