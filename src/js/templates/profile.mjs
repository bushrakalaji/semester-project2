import { getProfile } from "../api/profile/index.mjs";
import { load } from "../storage/index.mjs";
import { errorHandler } from "../handlers/errorHandler.mjs";
import { profileErrorHandler } from "../handlers/errorHandler.mjs";

export async function myProfile() {
  const profileContainer = document.querySelector(".myProfile");
  const { name } = load("profile");
  const profileData = await getProfile(name);
  const profileImage = profileData.avatar;

  console.log(profileImage);
  profileData.name = name;

  let userAvatar = ` 
    <img
        src="${profileData.avatar}"
        alt="${profileData.name}"
        class="prfl-img border border-light rounded-circle"
        />`;

  if (profileImage === null) {
    userAvatar = `<img
  src="https://i.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI"
  alt="${profileData.name}"
  class="prfl-img border border-light rounded-circle"
  />`;
  }

  try {
    profileContainer.innerHTML += `
    <div class="d-flex align-items-center gap-5 flex-wrap justify-content-center">
      <div class="profile-img text-light position-relative rounded-circle">
       ${userAvatar}
        <a
        href="/profile/edit/"
        class="text-light bi bi-pencil-square position-absolute top-50 start-100 translate-middle border-0 editAvatar bg-primary rounded"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class=""
            viewBox="0 0 16 16"
        >
            <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            />
            <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
        </svg>
        </a>
    </div>
    <div class="text-light fs-3">
        <span>${profileData.name}</span>
        <div>
        <span>Credits : ${profileData.credits}</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
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
    `;
  } catch (error) {
    profileContainer.innerHTML += profileErrorHandler(
      "An error occurred when calling the API"
    );
  }
}
