import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(selector, handleCardConfirm) {
        super(selector);
        this.handleCardConfirm = handleCardConfirm;
    }

    open(item, handleDelete) {
        this.item = item;
        this.handleDelete = handleDelete;
        super.open();
    }

    setEventListeners() {
        // super.open();
        const confirmButton = this._popupElement.querySelector(".popup__button-save-confirm");
        confirmButton.addEventListener("click", () => {
            // super.close();
            this.handleCardConfirm(this.item, this.handleDelete, super.close());
        }
            
        );

    }
}