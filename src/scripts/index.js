import { initialCards } from "./cards.js";
import {
  addCardElement,
  activateLike,
  deleteCard,
} from "../components/card.js";
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

popupEdit.classList.add("popup_is-animated");
popupNewCard.classList.add("popup_is-animated");
popupTypeImage.classList.add("popup_is-animated");

function processImg(evt) {
  const popuaImage = document.querySelector(".popup__image");
  const popuaImageCaption = document.querySelector(".popup__caption");
  popuaImage.src = evt.target.src;
  popuaImageCaption.textContent = evt.target.alt;
  openPopup(popupTypeImage, closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
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

initialCards.forEach((item) =>
  placesList.append(
    addCardElement(
      item,
      deleteCard,
      popupTypeImage,
      activateLike,
      processImg,
      closeByLayout,
      closePopupBtn
    )
  )
);

btnEditProfile.addEventListener("click", function (evt) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit, closeByEscape);
});
closeByLayout(popupEdit);
closePopupBtn(popupEdit);

btnAddNewCard.addEventListener("click", function (evt) {
  openPopup(popupNewCard, closeByEscape);
});
closeByLayout(popupNewCard);
closePopupBtn(popupNewCard);

/* Сохранение данных из попапа */

function handleFormSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;

  if (form === formElementProfile) {
    profileName.textContent = form.elements["name"].value;
    profileDescription.textContent = form.elements["description"].value;
    closePopup(popupEdit);
  } else if (form === formElementPlace) {
    const newCard = {
      name: form.elements["place-name"].value,
      link: form.elements["link"].value,
    };
    placesList.prepend(
      addCardElement(
        newCard,
        deleteCard,
        popupTypeImage,
        activateLike,
        processImg,
        closeByLayout,
        closePopupBtn
      )
    );
    form.reset();
    closePopup(popupNewCard);
  }
}

formElementProfile.addEventListener("submit", handleFormSubmit);
formElementPlace.addEventListener("submit", handleFormSubmit);
