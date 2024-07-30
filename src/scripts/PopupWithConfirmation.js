import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(selector, handleConfirmation) {
        super(selector); 
        this._handleConfirmation = handleConfirmation;
    }

    setEventListeners() { 
        super.setEventListeners();
        const confirmButton =  this._popupElement.querySelector(".popup__button-save-confirm");
        if (confirmButton) {
            confirmButton.addEventListener("click", (evt) => {
                evt.preventDefault();
                console.log("aqui escucho el click del boton delete y lo cierro");
                this._handleConfirmation();
                    super.close();
       
            });
        } else {
            
            console.error("Confirm button not found.");
        }
  }

  handleConfirmation() {
    console.log("hndleConfirm");
  }
}