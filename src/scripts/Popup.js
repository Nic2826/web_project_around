
export default class Popup{
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
        this.setEventListeners();
    }

    open(){
        this._popupElement.classList.add("popup_open");
        document.addEventListener("keydown", this._handleEscClose);   
    }

    close(){
        this._popupElement.classList.remove("popup_open");
        document.removeEventListener("keydown", this._handleEscClose);        
    }

    _handleEscClose = (evt)=> {
        //almacena la lógica para cerrar el popup al pulsar la tecla Esc.
            if (evt.key === "Escape") {
                this.close();
            }
    }

    setEventListeners() {
        //agrega un detector de eventos de click al icono cerrar del popup. La ventana modal también debe cerrarse cuando los usuarios hacen clic en el área sombreada del formulario.
        const closeButton = this._popupElement.querySelector(".popup__close-icon");
        
        closeButton.addEventListener("click", () =>{
            this.close()
        });

        const overlay = this._popupElement.querySelector(".popup__overlay");
        
        overlay.addEventListener("click", () =>{
            this.close()
        });

    }
}