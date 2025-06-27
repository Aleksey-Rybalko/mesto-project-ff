const cardTemplate = document.querySelector("#card-template").content;

const createCard = function (card, cardDel, handleLike, processImgClick) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardImage.addEventListener("click", () =>
    processImgClick(cardImage.alt, cardImage.src)
  );
  const btnDel = cardElement.querySelector(".card__delete-button");
  btnDel.addEventListener("click", () => cardDel(cardElement));
  const isLikeBtn = cardElement.querySelector(".card__like-button");
  isLikeBtn.addEventListener("click", handleLike);
  return cardElement;
};

function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

const deleteCard = function (element) {
  element.remove();
};

export { createCard, handleLike, deleteCard };
