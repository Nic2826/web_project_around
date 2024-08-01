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

    //detector de evento para cuando se da click al botón de LIKE
    const activeLike = this._element.querySelector(".cards__footer-fav-button")
        activeLike.addEventListener("click", () => { this._handleLikes() });

   

    //detector de evento para cuando se da click al botón de eliminar-------------------
    this._element.querySelector(".cards__delete").addEventListener("click", () => {
      console.log(this._cardId)
      const popupConfirm = new PopupWithConfirmation(".popup-confirm", () => { this._deleteCard() });
      popupConfirm.open();
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

    return this._element;

  }




  _handleLikes() {
    
    const hasUserLiked = this._likes.some((like) => like._id === this.userId);
    // console.log(this.userId, this._likes, hasUserLiked);
    //  console.log("le di click al boton like de la card:", this._cardId);
    // this._element.querySelector(".cards__footer-fav-button").classList.toggle("cards__footer-fav-button_active");
  

    if (hasUserLiked) {
      
      // console.log("la card tenía un LIKe mio:");
    return this._handleDeleteLike(this._cardId).then((result) => {
     
      
      console.log("se QUITA mi like", result.likes);
      this._element.querySelector(".cards__footer-likes-number").textContent = result.likes.length;
      this._element.querySelector(".cards__footer-fav-button").classList.remove("cards__footer-fav-button_active");
      
    })

    }else{
      console.log("NO hay like");
      this._handleAddLike(this._cardId).then((result) => {
        console.log("se AGREGA mi like",result.likes);
        this._element.querySelector(".cards__footer-likes-number").textContent = result.likes.length;
        console.log("ahora SI hay like"); 
        this._element.querySelector(".cards__footer-fav-button").classList.add("cards__footer-fav-button_active");
      
        });
    }
  }



  _deleteCard() {
    this._element.remove();
    this._handleCardDelete(this._cardId).then((result) => {
      // document.querySelector(".popup__button-save").textContent = "Guardando...";
      console.log("se ELIMINA la card:", result);
     
    })
  }

}