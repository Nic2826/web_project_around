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
    this.removeCard = this.removeCard.bind(this);
    
    // this._handleCardConfirm = handleCardConfirm;
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

    //detector de evento para cuando se da click al botón de eliminar-------------------
    this._element.querySelector(".cards__delete").addEventListener("click", () => {
      this._deleteCard();
    });

    //detector de evento para cuando se da click a una imagen
    this._element.querySelector(".cards__item-image").addEventListener("click", () => {
      this._handleCardClick()
    });

    //Comparing ID's
    // console.log("id",this.userId, "owner", this.owner._id);
    if (this.userId !== this.owner._id) {
      this._element.querySelector(".cards__delete").remove();
    }


    //Contador de likes, si no hay likes no muestra numero
    this._element.querySelector(".cards__footer-likes-number").textContent = this._likes.length;

    //detector de evento para cuando se da click al botón de LIKE
    const activeLike = this.heartToggle();
        activeLike.addEventListener("click", () => { this._handleLikes() });

    const hasUserLiked = this.hasLike();

    if (hasUserLiked) {
      activeLike.classList.add("cards__footer-fav-button_active");
    }

    return this._element;
  }

  _handleLikes() {

    const hasUserLiked = this.hasLike();

    if (hasUserLiked) {
      return this._handleDeleteLike(this._cardId).then((result) => {
        // console.log("se QUITA mi like", result.likes);
        this.heartToggle().classList.toggle("cards__footer-fav-button_active");
        this._element.querySelector(".cards__footer-likes-number").textContent = result.likes.length;
        this._likes = result.likes;
      })

    } else {
      this._handleAddLike(this._cardId).then((result) => {
        // console.log("se AGREGA mi like", result.likes);
        this.heartToggle().classList.toggle("cards__footer-fav-button_active");
        this._element.querySelector(".cards__footer-likes-number").textContent = result.likes.length;        
        this._likes = result.likes;
        
      });
    }
  }

  _deleteCard() {
    this._handleCardDelete(this._cardId);  
  }

  hasLike() {
    return this._likes.some((like) => like._id === this.userId);

  }

  heartToggle() {
    return this._element.querySelector(".cards__footer-fav-button");
  }

  removeCard() {
    this._element.remove();
  }

}