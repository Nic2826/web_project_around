
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


