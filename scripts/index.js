import Card from "./card.js";
import FormValidator from "./FormValidator.js";

const popupPlace = document.querySelector(".popup-place");
const addButton = document.querySelector("#add-button");
const placeInput = document.querySelector("#text-input-place");
const linkInput = document.querySelector("#url-input");

const editButton = document.querySelector("#edit-button");
const nameInput = document.querySelector("#text-input-name");
const aboutInput = document.querySelector("#text-input-about");
const profileName = document.querySelector(".profile__info-name");
const profileAbout = document.querySelector(".profile__info-description");
const popupProfile = document.querySelector(".popup-profile");

const popupImage = document.querySelector("#image-popup");
const cardsContainer = document.querySelector(".cards");

const closeButton = document.querySelectorAll(".popup__close-icon");

const overlay = document.querySelectorAll(".popup__overlay");


editButton.addEventListener("click", function openProfileEdit() {
  popupProfile.classList.add("popup_open");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

 const initialCards = [
  {
    placeName: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    placeName: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    placeName: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    placeName: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    placeName: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    placeName: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

addButton.addEventListener("click", function openPlaceEdit(evt) {
  evt.preventDefault();
  popupPlace.classList.add("popup_open");
});


initialCards.forEach((card) => {
  const newCard = new Card(card.placeName, card.link, "#cards-template");
  const cardElement = newCard.createCard();
  document.querySelector(".cards").append(cardElement);
});





function close() {
  popupProfile.classList.remove("popup_open");
  popupPlace.classList.remove("popup_open");
  popupImage.classList.remove("popup_open");
}

closeButton.forEach((item) => {
  item.addEventListener("click", close);
});

overlay.forEach((item) => {
  item.addEventListener("click", close);
});

document.addEventListener("keydown", function (evt) {
  if(evt.key === "Escape"){
     close();
  }
});


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popupProfile.classList.remove("popup_open");
}

popupProfile.addEventListener("submit", handleProfileFormSubmit);

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCards(placeInput.value, linkInput.value);
  cardsContainer.prepend(cardElement);
  popupPlace.classList.remove("popup_open");

}

popupPlace.addEventListener("submit", handlePlaceFormSubmit);

