const EditButton = document.querySelector("#edit-button");
const NameInput = document.querySelector("#text-input-name");
const AboutInput = document.querySelector("#text-input-about");
const popUpProfile = document.querySelector(".form-profile");
const formContainer = document.querySelector(".form__admin");

const ProfileName = document.querySelector(".profile__info-name");
const ProfileAbout = document.querySelector(".profile__info-description");

const popUpPlace = document.querySelector(".form__container-place");
const AddButton = document.querySelector("#add-button");

const CloseButtons = document.querySelectorAll(".form__close-icon");

EditButton.addEventListener("click", function openProfileEdit() {
  popUpProfile.classList.add("popup_open");
  NameInput.value.value = ProfileName.textContent;
  AboutInput.value = ProfileAbout.textContent;
});

AddButton.addEventListener("click", function openPlaceEdit() {
  popUpPlace.classList.add("popup_open");
});

CloseButtons.forEach((item) => {
  item.addEventListener("click", function close() {
    popUpProfile.classList.remove("popup_open");
    popUpPlace.classList.remove("popup_open");
  });
});


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  ProfileName.textContent = NameInput.value;
  ProfileAbout.textContent = AboutInput.value;
  popUpProfile.classList.remove("popup_open");
}

formContainer.addEventListener("submit", handleProfileFormSubmit);
