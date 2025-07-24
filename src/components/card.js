import {
  addCardLike,
  removeCardLike,
} from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

//создание карточки
const createCard = function (card, processImgClick) {
  //создание темплейты
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeCount = cardElement.querySelector(".card__like-count");
  const isLikeBtn = cardElement.querySelector(".card__like-button");
  //Создание карточки
  cardImage.src = card.link;
  cardImage.alt = card.name;
  //создание события открытия попапа при нажатии на рисунок
  cardElement.querySelector(".card__title").textContent = card.name;
  cardImage.addEventListener("click", () =>
    processImgClick(cardImage.alt, cardImage.src)
  );
  //слушатель установки/снятия лайка
  isLikeBtn.addEventListener("click", (evt) => {
    handleLike(evt, card._id, cardLikeCount);
  });
  return cardElement;
};

//функционал снятия/установки лайка
function handleLike(evt, id, cardLikeCount) {
  const isActive = evt.target.classList.contains("card__like-button_is-active");
  evt.target.disabled = true;
  const apiCall = isActive ? removeCardLike(id) : addCardLike(id);
  apiCall
    .then((data) => {
      cardLikeCount.textContent = data.likes.length;
      evt.target.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.error("Ошибка при обновлении лайка:", err);
    })
    .finally(() => {
      evt.target.disabled = false;
    });
  //раскраска лайка
  
}



export { createCard };
