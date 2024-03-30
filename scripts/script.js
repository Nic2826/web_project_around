const cards = document.querySelectorAll(".cards__item");
const popupPlace = document.querySelector(".popup-place");
const addButton = document.querySelector("#add-button");
const placeInput = document.querySelector("#text-input-place");
const linkInput = document.querySelector("#url-input");
const placeName = document.querySelector(".cards__footer-name");
const linkUrl = document.querySelector(".cards__item-image");

const editButton = document.querySelector("#edit-button");
const nameInput = document.querySelector("#text-input-name");
const aboutInput = document.querySelector("#text-input-about");
const profileName = document.querySelector(".profile__info-name");
const profileAbout = document.querySelector(".profile__info-description");
const popupProfile = document.querySelector(".popup-profile");

const popupImage = document.querySelector("#image-popup");
const cardsContainer = document.querySelector(".cards");

const closeButton = document.querySelectorAll(".popup__close-icon");

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

function createCards(placeName, link) {
  const cardTemplate = document.querySelector("#cards-template").content;
  const cardElement = cardTemplate
    .querySelector(".cards__item")
    .cloneNode(true);

  cardElement.querySelector(".cards__item-image").src = link;
  cardElement.querySelector(".cards__footer-name").textContent = placeName;
  cardElement.querySelector(".cards__item-image").alt = "Foto de " + placeName;

  cardElement
    .querySelector(".cards__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".cards__item").remove();
    });

  const likeButton = cardElement.querySelector(".cards__footer-fav-button");
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("cards__footer-fav-button_active");
  });

  cardElement
    .querySelector(".cards__item-image")
    .addEventListener("click", function (evt) {
      evt.preventDefault();
      popupImage.classList.add("popup_open");
      popupImage.querySelector(".popup__image").src = link;
      popupImage.querySelector(".popup__title").textContent = placeName;
      popupImage.querySelector(".popup__image").alt = placeName;
    });

  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCards(item.placeName, item.link);
  cardsContainer.append(cardElement);
});

closeButton.forEach((item) => {
  item.addEventListener("click", function close() {
    popupProfile.classList.remove("popup_open");
    popupPlace.classList.remove("popup_open");
    popupImage.classList.remove("popup_open");
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  if (nameInput.value === "" || aboutInput.value === "") {
    alert("Por favor, rellene todos los campos");
    return;
  }

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popupProfile.classList.remove("popup_open");
}

popupProfile.addEventListener("submit", handleProfileFormSubmit);

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCards(placeInput.value, linkInput.value);
  if (placeInput.value === "" || linkInput.value === "") {
    alert("Por favor, rellene todos los campos");
    return;
  }
  cardsContainer.prepend(cardElement);
  popupPlace.classList.remove("popup_open");

  placeInput.value = "";
  linkInput.value = "";
}

popupPlace.addEventListener("submit", handlePlaceFormSubmit);
