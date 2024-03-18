const editButton = document.querySelector("#edit-button");
const nameInput = document.querySelector("#text-input-name");
const aboutInput = document.querySelector("#text-input-about");
const popupProfile = document.querySelector(".form-profile");
const formContainer = document.querySelector(".form__admin");

const profileName = document.querySelector(".profile__info-name");
const profileAbout = document.querySelector(".profile__info-description");

const popupPlace = document.querySelector(".form-place");
const addButton = document.querySelector("#add-button");

const closeButton = document.querySelectorAll(".form__close-icon");

editButton.addEventListener("click", function openProfileEdit() {
  popupProfile.classList.add("popup_open");
  nameInput.value.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

addButton.addEventListener("click", function openPlaceEdit() {
  popupPlace.classList.add("popup_open");
});

closeButton.forEach((item) => {
  item.addEventListener("click", function close() {
    popupProfile.classList.remove("popup_open");
    popupPlace.classList.remove("popup_open");
  });
});


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popupProfile.classList.remove("popup_open");
}

formContainer.addEventListener("submit", handleProfileFormSubmit);
