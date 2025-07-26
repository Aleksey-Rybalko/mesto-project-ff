import { createCard } from "./card.js";
import { openPopup, closePopup, closeByLayout, closePopupBtn } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialUser,
  getInitialCards,
  patchUser,
  postCard,
  updateAvatar,
  deleteCardElement
} from "./api.js";
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
const profileImage = document.querySelector(".profile__image");
const btnUndateProfile = document.querySelector(".profile_edit-img");
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const formElementAvatar = document.forms["update-avatar"];
const popupDeleteCard = document.querySelector(".popup_delete_card");
const popupImage = document.querySelector(".popup__image");
const popuaImageCaption = document.querySelector(".popup__caption");
let profileID = "";
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//валидация
enableValidation(validationConfig);

//подключение анимации появления попапов
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

//загрузка данных профиля и карточек с сервера
Promise.all([getInitialUser(), getInitialCards()])
  .then(([userData, cardsData]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    profileID = userData._id;
    cardsData.forEach((item) => {
      placesList.append(loadCard(item, processImg, profileID));
    });
  })
  .catch((err) => {
    console.log("Ошибка загрузки данных:", err.message || err);
  });
  

//загрузка карточки
function loadCard(card, processImgClick, profileID) {
  const loadElementCard = createCard(card, processImgClick);
  const cardLikeCount = loadElementCard.querySelector(".card__like-count");
  const isLikeBtn = loadElementCard.querySelector(".card__like-button");
  cardLikeCount.textContent = card.likes.length;
  if (card.likes.some((obj) => obj._id === profileID)) {
    isLikeBtn.classList.add("card__like-button_is-active");
  }
  const btnDel = loadElementCard.querySelector(".card__delete-button");
  if (card.owner._id !== profileID) {
    btnDel.style.display = "none";
  } else {
    btnDel.addEventListener("click", () =>
      handleDeleteCard(card, loadElementCard)
    );
  }
  return loadElementCard;
}

function deleteCard(evt, card, cardElement){
    evt.preventDefault();
    deleteCardElement(card._id)
      .then(() => {
        cardElement.remove();
        closePopup(popupDeleteCard);
      })
      .catch((err) => {
        console.error("Ошибка удаления карточки:", err);
      });
}

//функционал удаления карточки
const handleDeleteCard = function (card, cardElement) {
  const formDeleteCard = document.forms["delete-card"];
  openPopup(popupDeleteCard);
  closeByLayout(popupDeleteCard);
  closePopupBtn(popupDeleteCard);
  formDeleteCard.onsubmit = (evt) => deleteCard(evt, card, cardElement);
};

// функция открытия попапа изображения места
function processImg(name, link) {
  popupImage.src = link;
  popuaImageCaption.textContent = name;
  popupImage.alt = `Фотография места: ${name}`;
  openPopup(popupTypeImage);
}
closeByLayout(popupTypeImage);
closePopupBtn(popupTypeImage);



// открытие/закрытие/очистка валидации попапа редактирования профиля
btnEditProfile.addEventListener("click", function (evt) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formElementProfile, validationConfig);
  openPopup(popupEdit);
});
closeByLayout(popupEdit);
closePopupBtn(popupEdit);

// открытие/закрытие/очистка валидации попапа создания карточки места
btnAddNewCard.addEventListener("click", function (evt) {
  formElementPlace.reset();
  clearValidation(formElementPlace, validationConfig);
  openPopup(popupNewCard);
});
closeByLayout(popupNewCard);
closePopupBtn(popupNewCard);

//Сохранение данных профиля - обработка сабмита
function handleFormSubmitProfile(evt) {
  const btnSave = evt.target.querySelector(".popup__button");
  btnSave.textContent = "Сохранение...";
  btnSave.disabled = true;
  evt.preventDefault();
  const form = evt.target;

  patchUser(form.elements["name"].value, form.elements["description"].value)
    .then(async (data) => {
      const profiledata = await data;
      profileName.textContent = profiledata.name;
      profileDescription.textContent = profiledata.about;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(`Ошибка сохранения: ${err}`);
    })
    .finally(() => {
      btnSave.textContent = "Сохранение";
      btnSave.disabled = false;
    });
}

//Сохранение данных карточки места - обработка сабмита
function handleFormSubmitPlace(evt) {
  const btnSave = evt.target.querySelector(".popup__button");
  btnSave.textContent = "Сохранение...";
  btnSave.disabled = true;
  evt.preventDefault();
  const form = evt.target;
  const newCard = {
    name: form.elements["place-name"].value,
    link: form.elements["link"].value,
  };
  postCard(newCard.name, newCard.link)
    .then(async (data) => {
      const card = await data;
      placesList.prepend(loadCard(card, processImg, profileID));
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
    .finally(() => {
      btnSave.textContent = "Сохранить";
      btnSave.disabled = false;
      clearValidation(formElementPlace, validationConfig);

    });
}

//слушатели сабмитов профиля и места
formElementProfile.addEventListener("submit", handleFormSubmitProfile);
formElementPlace.addEventListener("submit", handleFormSubmitPlace);

//вызов попапа смены аватара
btnUndateProfile.addEventListener("click", function (evt) {
  clearValidation(formElementAvatar, validationConfig);
  formElementAvatar.reset();
  openPopup(popupUpdateAvatar);
});
  closeByLayout(popupUpdateAvatar);
  closePopupBtn(popupUpdateAvatar);

//обработчик сабмита смены аватара
function handleFormSubmitAvatar(evt) {
  const btnSave = evt.target.querySelector(".popup__button");
  btnSave.textContent = "Сохранение...";
  btnSave.disabled = true;
  evt.preventDefault();
  const link = evt.target.elements["link"].value;

  updateAvatar(link)
    .then(async (data) => {
      const image = await data;
      profileImage.style.backgroundImage = `url(${image.avatar})`;
      closePopup(popupUpdateAvatar);
    })
    .catch((err) => {
      console.log("Ошибка загрузки аватара:", err);
    })
    .finally(() => {
      btnSave.textContent = "Сохранить";
      btnSave.disabled = false;

    });
}

//слушатель сабмита смены аватара
formElementAvatar.addEventListener("submit", handleFormSubmitAvatar);
