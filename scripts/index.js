// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplare = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const deleteCard = function (element) {
  element.remove();
}

const addCardElement = function (card, cardDel) {
  
  // клон темплейта
  const cardElement = cardTemplare
    .querySelector(".places__item")
    .cloneNode(true);

  // содержимое
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  // удаление
  const btnDel = cardElement.querySelector(".card__delete-button");
  btnDel.addEventListener("click", () => cardDel(cardElement));

  return cardElement;
};

// вызов
initialCards.forEach(item => placesList.append(addCardElement(item, deleteCard)))
