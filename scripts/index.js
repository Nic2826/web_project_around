import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

const placeInput = document.querySelector("#text-input-place");
const linkInput = document.querySelector("#url-input");
const nameInput = document.querySelector("#text-input-name");
const aboutInput = document.querySelector("#text-input-about");
const addButton = document.querySelector("#add-button");
const editButton = document.querySelector("#edit-button");

const fieldsetList = document.querySelector(".popup__container");

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

const newUserInfo = new UserInfo({
  name: ".profile__info-name", 
  about: ".profile__info-description"});
  newUserInfo.setUserInfo("Jacques Costeau", "Explorador");

const PopupImage = new PopupWithImage(".popup-card");

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.placeName, item.link, "#cards-template", () => {
      PopupImage.open(item.placeName, item.link);
    }); 
    const cardElement = card.createCard();
    cardSection.addItem(cardElement);
  }
}, ".cards");

cardSection.renderItems();

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

//crea una instancia de PopupWithForm
const popupPlace = new PopupWithForm(".popup-place", ({title,link})=>{
  const newCard = new Card(title, link, "#cards-template", function handleCardClick(){
    PopupImage.open(title, link);
  });
  const cardElement = newCard.createCard();
  document.querySelector(".cards").prepend(cardElement);
  placeInput.textContent = title;
  linkInput.textContent = link;
});


const popupProfile = new PopupWithForm(".popup-profile", ({name,about})=>{
  console.log(name, about);
  nameInput.textContent = name;
  aboutInput.textContent = about;
newUserInfo.setUserInfo(name, about);

});

editButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  popupProfile.open();
});

addButton.addEventListener("click", (evt) => {
  placeInput.value = "";
  linkInput.value = "";
  evt.preventDefault();
  popupPlace.open();
});




