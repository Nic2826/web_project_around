
const popupImage = document.querySelector("#image-popup");
const closeButton = document.querySelectorAll(".popup__close-icon");
const overlay = document.querySelectorAll(".popup__overlay");

const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-place");


export function openProfileEdit() {
  //popup del perfil para editar
  popupProfile.classList.add("popup_open");
}

export function openPlaceEdit(evt) {
  evt.preventDefault();
  //popup del lugar para editar
  popupCard.classList.add("popup_open");
}

// export function close() {
//   popupProfile.classList.remove("popup_open");
//   popupCard.classList.remove("popup_open");
//   popupImage.classList.remove("popup_open");
// }

// closeButton.forEach((item) => {
//   item.addEventListener("click", close);
// });

// overlay.forEach((item) => {
//   item.addEventListener("click", close);
// });

// document.addEventListener("keydown", function (evt) {
//   if (evt.key === "Escape") {
//     close();
//   }
// });

