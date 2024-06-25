import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(placeName, link) {
        //añadir una imagen al popup y el correspondiente atributo de imagen src junto con una leyenda para la imagen.
        super.open();

        
        const popupImage = this._popupElement;

        popupImage.querySelector(".popup__image").setAttribute("alt", placeName);
        popupImage.querySelector(".popup__image").setAttribute("src", link);        
        popupImage.querySelector(".popup__title").textContent = placeName;
    }

    setEventListeners() {
        super.setEventListeners();
      }

}
