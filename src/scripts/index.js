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
    "Content-Type": "application/json",
    'Cache-Control': 'no-cache'
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
const popupProfile = new PopupWithForm(".popup-profile", async (inputs) => {
  //Guarda la info del NUEVO usuario en el servidor
  const submitButton = document.querySelector(".popup__button-save-profile");
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Guardando...";

  try {
    const result = await api.updateUserInfo(inputs);
    newUserInfo.setUserInfo(result.name, result.about, result.avatar, result.id);
    popupProfile.close();
  }
  catch (error) {
    console.error("Error editing the user:", error);
  }
  finally {
    submitButton.textContent = originalButtonText;
  }
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
  const popupAvatar = new PopupWithForm(".popup-avatar", async (avatarData) => {
    const submitButton = document.querySelector(".popup__button-save-avatar");
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Guardando...";

    try {
      avatarData.avatar = avatarData.avatarLink;
      const result = await api.updateAvatar(avatarData);
      profileImage.src = result.avatar;

    }
    catch {

    }
    finally {
      popupAvatar.close();
      submitButton.textContent = originalButtonText;
    }
  })
  popupAvatar.open();
})

const PopupConfirm = new PopupWithConfirmation(".popup-confirm",
  async (item, handleDelete) => {
    const confirmButton = document.querySelector(".popup__button-save-confirm");
    const confirmButtonText = confirmButton.textContent;
    confirmButton.textContent = "Eliminando...";

    try {
      await api.deleteCard(item._id)
      handleDelete();
    }
    catch {
      console.error("Error deleting card:", error);
    }
    finally {
      PopupConfirm.close();
      confirmButton.textContent = confirmButtonText;
    }
  }
);

//Se traen las CARDS con la información que está en el servidor
api.getInitialCards().then((initCards) => {

  const cardSection = new Section({
    items: initCards,
    renderer: (item) => {
      const card = new Card(item,
        "#cards-template",
        newUserInfo.getUserInfo().userId,
        () => { PopupImage.open(item.name, item.link); },
        () => { PopupConfirm.open(item, card.removeCard); },
        () => { return api.addLike(item._id) },
        () => { return api.deleteLike(item._id) },
      );

      const cardElement = card.createCard();
      cardSection.addItem(cardElement);
    }
  }, ".cards");

  cardSection.renderItems();


  const popupCard = new PopupWithForm(".popup-place", async (inputs) => {
    console.log(submitButton);
    // evt.preventDefault();
    const submitButton = document.querySelector(".popup__button-save-place");
    const originalButtonText = submitButton.textContent;

    submitButton.textContent = "Guardando...";

    console.log(submitButton);

    try {
      const result = await api.postCards(inputs);
      const card = new Card(
        result,
        "#cards-template",
        newUserInfo.getUserInfo().userId,
        () => { PopupImage.open(result.name, result.link); },
        () => { PopupConfirm.open(result, card.removeCard); },
        () => { return api.addLike(result._id); },
        () => { return api.deleteLike(result._id); },
      );

      const cardElement = card.createCard();
      cardSection.addCard(cardElement);
      popupCard.close();

    } catch (error) {
      console.error("Error creating card:", error);
    }
    finally {
      submitButton.textContent = originalButtonText;
    }
  });

  addButton.addEventListener("click", (evt) => {
    placeInput.value = "";
    linkInput.value = "";
    evt.preventDefault();
    popupCard.open();

  });
});
