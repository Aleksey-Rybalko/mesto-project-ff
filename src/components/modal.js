function openPopup(popup, closeByEscape) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup, closeByEscape) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

export { openPopup, closePopup };
