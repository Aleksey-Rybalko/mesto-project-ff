function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

//закрытие попапа при клике за его пределами
function closeByLayout(popup) {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}

//назначение обработчика кнопке закрытия попапа
function closePopupBtn(popup) {
  popup
    .querySelector(".popup__close")
    .addEventListener("click", () => closePopup(popup));
}

export { openPopup, closePopup, closeByLayout, closePopupBtn };
