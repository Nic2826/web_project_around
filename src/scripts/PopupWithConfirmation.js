import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(selector, handleCardConfirm) {
        super(selector);
        this.handleCardConfirm = handleCardConfirm;
    }

    open() {
        super.open();
    }

    setEventListeners() {
        // super.open();
        const confirmButton = this._popupElement.querySelector(".popup__button-save-confirm");
        confirmButton.addEventListener("click", () => {
            super.close();
            console.log("CLICK");
        }
            
        );

    }

    confirm() {
        // evt.preventDefault();
        // console.log("aqui escucho el click del SI y lo cierro");
        // super.close();

    }
}