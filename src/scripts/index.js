import { initialCards } from "./cards.js";
import { createCard, handleLike, deleteCard } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import "../pages/index.css";

const placesList = document.querySelector(".places__list");
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddNewCard = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElementProfile = document.forms["edit-profile"];
const formElementPlace = document.forms["new-place"];
const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

function processImg(name, link) {
  const popuaImage = document.querySelector(".popup__image");
  const popuaImageCaption = document.querySelector(".popup__caption");
  popuaImage.src = link;
  popuaImageCaption.textContent = name;
  popuaImage.alt = "Фотография места: ${name}";
  openPopup(popupTypeImage);
}

function closeByLayout(popup) {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}

function closePopupBtn(popup) {
  popup
    .querySelector(".popup__close")
    .addEventListener("click", () => closePopup(popup));
}

initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard, handleLike, processImg));
});

btnEditProfile.addEventListener("click", function (evt) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
});
closeByLayout(popupEdit);
closePopupBtn(popupEdit);

btnAddNewCard.addEventListener("click", function (evt) {
  openPopup(popupNewCard);
});
closeByLayout(popupNewCard);
closePopupBtn(popupNewCard);

closeByLayout(popupTypeImage);
closePopupBtn(popupTypeImage);

/* Сохранение данных из попапа */

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const form = evt.target;
  profileName.textContent = form.elements["name"].value;
  profileDescription.textContent = form.elements["description"].value;
  closePopup(popupEdit);
}

function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const form = evt.target;
  const newCard = {
    name: form.elements["place-name"].value,
    link: form.elements["link"].value,
  };
  placesList.prepend(createCard(newCard, deleteCard, handleLike, processImg));
  form.reset();
  closePopup(popupNewCard);
}

formElementProfile.addEventListener("submit", handleFormSubmitProfile);
formElementPlace.addEventListener("submit", handleFormSubmitPlace);
