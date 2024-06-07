import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import { openProfileEdit, openPlaceEdit } from "./utils.js";

const popupPlace = document.querySelector(".popup-place");
const popupProfile = document.querySelector(".popup-profile");

const placeInput = document.querySelector("#text-input-place");
const linkInput = document.querySelector("#url-input");
const nameInput = document.querySelector("#text-input-name");
const aboutInput = document.querySelector("#text-input-about");
const profileName = document.querySelector(".profile__info-name");
const profileAbout = document.querySelector(".profile__info-description");
const addButton = document.querySelector("#add-button");
const editButton = document.querySelector("#edit-button");

const fieldsetList = document.querySelector(".popup__container");

const cardsContainer = document.querySelector(".cards");


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

initialCards.forEach((card) => {
  const newCard = new Card(card.placeName, card.link, "#cards-template");
  const cardElement = newCard.createCard();
  document.querySelector(".cards").append(cardElement);
});

const newValidation = new FormValidator(
  {
    formSelector: document.querySelector(".popup__admin"),
    inputSelector: document.querySelectorAll(".popup__input"),
    submitButtonSelector: document.querySelector(".popup__button-save"),
    inactiveButtonClass: document.querySelector("popup__button-save_disabled"),
    inputErrorClass: document.querySelector("popup__input_type_error"),
    errorClass: document.querySelector("popup__error_visible")
  },
  fieldsetList
);

newValidation.enableValidation();

editButton.addEventListener("click", openProfileEdit);

addButton.addEventListener("click", openPlaceEdit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popupProfile.classList.remove("popup_open");
}

popupProfile.addEventListener("submit", handleProfileFormSubmit);

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCard = new Card(placeInput.value, linkInput.value, "#cards-template");
  const cardElement = newCard.createCard();
  cardsContainer.prepend(cardElement);
  popupPlace.classList.remove("popup_open");
}

popupPlace.addEventListener("submit", handlePlaceFormSubmit);

