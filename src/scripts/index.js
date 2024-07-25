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

//crea una instancia para abrir la imagen
const PopupImage = new PopupWithImage(".popup-card"); 

const placeInput = document.querySelector("#text-input-place");
const linkInput = document.querySelector("#url-input");
const addButton = document.querySelector("#add-button");
const editButton = document.querySelector("#edit-button");
const fieldsetList = document.querySelector(".popup__container");
const profileImage = document.querySelector(".profile__avatar");
const editAvatar = document.querySelector(".profile__avatar-edit");
const Confirmation = document.querySelector(".popup-confirm");

editAvatar.addEventListener("click", (evt)=>{
  evt.preventDefault();
  const popupAvatar = new PopupWithForm(".popup-avatar", (inputs)=>{
    console.log(inputs);
  })
  popupAvatar.open();
})

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_11",
  headers: {
    authorization: "96b4dc3c-0ccb-4f44-b22d-30d4ca64744f",
    "Content-Type": "application/json"
  }
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

//crea una instancia de PopupWithForm para el Perfil
const popupProfile = new PopupWithForm(".popup-profile", (inputs)=>{
  
    //Guarda la info del usuario en el servidor
    api.updateUserInfo(inputs).then((result) => {
      
      const newUserInfo = new UserInfo({
        name: ".profile__info-name", 
        about: ".profile__info-description",
        avatar: ".profile__avatar",
        id: result._id});
        newUserInfo.setUserInfo(result.name, result.about, result.avatar, result._id);
        console.log("update newUserInfo", newUserInfo);
    });
}); 

//crea una instancia de PopupWithForm para los lugares


editButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  popupProfile.open();
});




//se trae la INFO del usuario
api.getUserInfo().then((result) => {
    profileImage.src = result.avatar;

    const newUserInfo = new UserInfo({
      name: ".profile__info-name", 
      about: ".profile__info-description",
      avatar: ".profile__avatar",
      id: result._id});
      newUserInfo.setUserInfo(result.name, result.about, result.avatar, result._id);
      console.log("geet newUserInfo", newUserInfo);
  });

//Se traen las CARDS con la información que está en el servidor
  api.getInitialCards().then((result) => {
    console.log("INITIALS------", result);
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

    const popupCard = new PopupWithForm(".popup-place", (inputs)=>{
      // Añadir Tarjeta nueva
    api.postCards(inputs).then((result) => {
      const card = new Card(result, "#cards-template", () => {
      }); 
      const cardElement = card.createCard();
      cardSection.addCard(cardElement);
    });
    });

    addButton.addEventListener("click", (evt) => {
      placeInput.value = "";
      linkInput.value = "";
      evt.preventDefault();
      popupCard.open();
    });
  });
