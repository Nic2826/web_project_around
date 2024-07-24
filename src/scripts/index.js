import "../pages/index.css";
import logo from "../images/logo.svg";
import closeButton from "../images/close.png";
import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import Api from "./Api.js";

const imageLogo = document.querySelector(".header__logo");
imageLogo.src = logo;

const close = document.querySelectorAll(".popup__close-icon");
close.forEach(item =>{
  item.src = closeButton;
})

const placeInput = document.querySelector("#text-input-place");
const linkInput = document.querySelector("#url-input");
const nameInput = document.querySelector("#text-input-name");
const aboutInput = document.querySelector("#text-input-about");
const addButton = document.querySelector("#add-button");
const editButton = document.querySelector("#edit-button");
const fieldsetList = document.querySelector(".popup__container");

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_11",
  headers: {
    authorization: "96b4dc3c-0ccb-4f44-b22d-30d4ca64744f",
    "Content-Type": "application/json"
  }
});

//crea una instancia para abrir la imagen
const PopupImage = new PopupWithImage(".popup-card"); 

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

//crea una instancia de PopupWithForm para el Perfil
const popupProfile = new PopupWithForm(".popup-profile", (inputs)=>{
  console.log(inputs);
    //Guarda la info del usuario en el servidor
    api.updateUserInfo(inputs).then((result) => {
      const newUserInfo = new UserInfo({
        name: ".profile__info-name", 
        about: ".profile__info-description",
        avatar: ".profile__avatar"});
        newUserInfo.setUserInfo(result.name, result.about, result.avatar);
    });
}); 

//crea una instancia de PopupWithForm para los lugares
const popupPlace = new PopupWithForm(".popup-place", (inputs)=>{
  // Añadir Tarjeta nueva
api.postCards(inputs.name, inputs.link).then((result) => {
  const cardSection = new Section({
    items: result,
    renderer: (item) => {
      const card = new Card(item, "#cards-template", () => {
        PopupImage.open(item.name, item.link);
      }); 
      const cardElement = card.createCard();
      cardSection.addItem(cardElement);
    }
  }, ".cards");
  
  cardSection.renderItems();
  
});
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


//se trae la INFO del usuario
api.getUserInfo().then((result) => {
    console.log(result);

    const profileImage = document.querySelector(".profile__avatar");
    profileImage.src = result.avatar;

    const newUserInfo = new UserInfo({
      name: ".profile__info-name", 
      about: ".profile__info-description"});
      newUserInfo.setUserInfo(result.name, result.about);
  });

//Se traen las CARDS con la información que está en el servidor
  api.getInitialCards().then((result) => {
    console.log(result);
    const cardSection = new Section({
      items: result,
      renderer: (item) => {
        const card = new Card(item.name, item.link,"#cards-template", () => {
          PopupImage.open(item.name, item.link);
        }); 
        const cardElement = card.createCard();
        cardSection.addItem(cardElement);
      }
    }, ".cards");
    
    cardSection.renderItems();
  });


// function likeCounter(){
//   fetch("https://around.nomoreparties.co/v1/web_es_11/cards/likes", {
//     method: "GET",
//     headers: {
//       authorization: "96b4dc3c-0ccb-4f44-b22d-30d4ca64744f"
//     }
//   })
//     .then(res => res.json())
// }

// likeCounter();