import PopupWithConfirmation from "./PopupWithConfirmation.js";
export default class Card {
  //Se inicializan las variables
  constructor(item, templateSelector, userId, _handleCardClick, handleCardDelete, handleAddLike, handleDeleteLike) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this.owner = item.owner;
    this._cardId = item._id;
    this.userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = _handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
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

    this._element.querySelector(".cards__item-image").src = this._link;
    this._element.querySelector(".cards__footer-name").textContent = this._name;
    this._element.querySelector(".cards__item-image").alt = "Foto de " + this._name;
    this._element.querySelector(".cards__footer-likes-number").textContent = this._likes.length;

    //detector de evento para cuando se da click al botón de like
    this._element.querySelector(".cards__footer-fav-button").addEventListener("click", () => this._like());

    //detector de evento para cuando se da click al botón de eliminar-------------------
    this._element.querySelector(".cards__delete").addEventListener("click", () =>{ 
      console.log(this._cardId)
      const popupConfirm = new PopupWithConfirmation(".popup-confirm", () => {this._deleteCard()});
      popupConfirm.open();     
      });



const hasUserLiked = this._likes.some((like) => like._id === this.userId);
if (hasUserLiked){
  this._handleDeleteLike(this._cardId);
  this._like();
} else {
  this._handleAddLike(this._cardId);
}



    //detector de evento para cuando se da click a una imagen
    this._element.querySelector(".cards__item-image").addEventListener("click", () => {
      this._handleCardClick()});

      //Comparing ID's
      // console.log("id",this.userId, "owner", this.owner._id)
      if(this.userId !== this.owner._id){
        this._element.querySelector(".cards__delete").remove();
      }

    return this._element;
  }

  _like() {
    const activeLike = this._element.querySelector(".cards__footer-fav-button");
    activeLike.classList.toggle("cards__footer-fav-button_active");
  }

  _likeCounter(){
    
  }

  _deleteCard() {
    this._element.remove();
  }

}