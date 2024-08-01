import "../pages/index.css";
import logo from "../images/logo.svg";
import closeButton from "../images/close.png";
import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import Api from "./Api.js";

const imageLogo = document.querySelector(".header__logo");
imageLogo.src = logo;

const close = document.querySelectorAll(".popup__close-icon");
close.forEach(item => {
  item.src = closeButton;
})

//crea una instancia para abrir la imagen
const PopupImage = new PopupWithImage(".popup-card");

// const PopupConfirm = new PopupWithConfirmation(".popup-confirm");
// PopupConfirm.setEventListeners();


const placeInput = document.querySelector("#text-input-place");
const linkInput = document.querySelector("#url-input");
const addButton = document.querySelector("#add-button");
const editButton = document.querySelector("#edit-button");
const fieldsetList = document.querySelector(".popup__container");
const editAvatar = document.querySelector(".profile__avatar-edit");
const profileImage = document.querySelector(".profile__avatar");

const newUserInfo = new UserInfo({
  name: ".profile__info-name",
  about: ".profile__info-description",
  avatar: ".profile__avatar",
  userId: ""
});

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
const popupProfile = new PopupWithForm(".popup-profile", (inputs) => {
  //Guarda la info del NUEVO usuario en el servidor
  api.updateUserInfo(inputs).then((result) => {
    newUserInfo.setUserInfo(result.name, result.about, result.avatar, result.id);
    console.log("UPDATE user INFO------", result);
  });
});

//crea una instancia de PopupWithForm para los lugare

editButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  popupProfile.open();
});


api.getUserInfo().then((user) => {
  newUserInfo.setUserInfo(user.name, user.about, user.avatar, user._id);
  });

  editAvatar.addEventListener("click", (evt) => {
    //se trae la INFO del usuario
    evt.preventDefault();
    const popupAvatar = new PopupWithForm(".popup-avatar", ({data}) => {
    //  console.log(inputs);

     return api.updateAvatar(data).then((result) => {
      //  newUserInfo.getUserInfo().avatar = result.avatar;
      //  profileImage.src = result;
       console.log(profileImage.src);
       console.log("avatarnew", result);
     })
    })
    popupAvatar.open();
  })


  //Se traen las CARDS con la información que está en el servidor
  api.getInitialCards().then((initCards) => {
    const cardSection = new Section({
      items: initCards,
      renderer: (item) => {
        // cambiar el numero por el _id que si es--------------------------
        const card = new Card(item,
          "#cards-template",
          newUserInfo.getUserInfo().userId,
          () => { PopupImage.open(item.name, item.link); },
          () => { return api.deleteCard(item._id) },
          () => { return api.addLike(item._id) },
          () => { return api.deleteLike(item._id) });

        const cardElement = card.createCard();
        cardSection.addItem(cardElement);

      }
    }, ".cards");

    cardSection.renderItems();
  




    const popupCard = new PopupWithForm(".popup-place", (inputs)=>{
      // Añadir Tarjeta nueva
    api.postCards(inputs).then((result) => {
      const text = document.querySelectorAll(".popup__button-save")
      text.textContent = "Guardando...";
      
      const card = new Card(
        result,
        "#cards-template", 
        newUserInfo.getUserInfo().userId, 
        () => { PopupImage.open(result.name, result.link); },
        () => { api.deleteCard(result._id) },
        () => { return api.addLike(result._id) },
        () => { return api.deleteLike(result._id) });
      const cardElement = card.createCard();
      cardSection.addCard(cardElement);
      console.log("ADD CARD------", result);
    });
    });

  addButton.addEventListener("click", (evt) => {
    placeInput.value = "";
    linkInput.value = "";
    evt.preventDefault();
    popupCard.open();
  });
});
