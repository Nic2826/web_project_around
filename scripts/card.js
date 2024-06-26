
export default class Card {
  //Se inicializan las variables
  constructor(placeName, link, templateSelector, _handleCardClick) {
    this._placeName = placeName;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = _handleCardClick;
  }

  //se trae el nodo del template que esta en html (el marcado)
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);

    return cardTemplate;
  }

  createCard() {
    this._element = this._getTemplate();

    //
    this._element.querySelector(".cards__item-image").src = this._link;
    this._element.querySelector(".cards__footer-name").textContent = this._placeName;
    this._element.querySelector(".cards__item-image").alt = "Foto de " + this._placeName;

    //detector de evento para cuando se da click al botón de like
    this._element.querySelector(".cards__footer-fav-button").addEventListener("click", () => this._like());

    //detector de evento para cuando se da click al botón de eliminar
    this._element.querySelector(".cards__delete").addEventListener("click", () => this._delete());


//esto funciona aquí pero no en PopupWithImage-----------------------------------------------------------
    //detector de evento para cuando se da click a una imagen
    this._element.querySelector(".cards__item-image").addEventListener("click", () => {
      
      console.log("se abre la imagen");
      this._handleCardClick()});

    return this._element;
  }

  _like() {
    const activeLike = this._element.querySelector(".cards__footer-fav-button");
    activeLike.classList.toggle("cards__footer-fav-button_active");
  }

  _delete() {
    const deleteButton = this._element.querySelector(".cards__delete");
    deleteButton.closest(".cards__item").remove();
  }
}

