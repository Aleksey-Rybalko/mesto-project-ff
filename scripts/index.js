// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplare = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const cardDelete = function (element) {
  element.remove();
}

const cardElementAdd = function (card, cardDel) {
  
  // клон темплейта
  const cardElement = cardTemplare
    .querySelector(".places__item")
    .cloneNode(true);

  // содержимое
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;

  // вывод
  placesList.append(cardElement);

  // удаление
  const btnDel = cardElement.querySelector(".card__delete-button");
  btnDel.addEventListener("click", () => cardDel(cardElement));
};

// вызов
initialCards.forEach(item => cardElementAdd(item, cardDelete))

