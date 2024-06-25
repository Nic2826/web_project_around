
export default class Popup{
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
    }

    open(){
        this._popupElement.classList.add("popup_open");
        //por qué tenog que llamar a aquí a this._handleEscClose() ???????????
        this._handleEscClose();
        this.setEventListeners();
        console.log("hola");
    }

    close(){
        this._popupElement.classList.remove("popup_open");
        this._handleEscClose();
        this.setEventListeners();
        console.log("adios");
        
    }

    _handleEscClose(evt) {
        //almacena la lógica para cerrar el popup al pulsar la tecla Esc.
        document.addEventListener("keydown", (evt) => {
            if (evt.key === "Escape") {
                this.close();
            }
        });
    }

//de aqui pa abajo no me funciona
    setEventListeners() {
        //agrega un detector de eventos de click al icono cerrar del popup. La ventana modal también debe cerrarse cuando los usuarios hacen clic en el área sombreada del formulario.
        const closeButton = document.querySelectorAll(".popup__close-icon");
        const overlay = document.querySelectorAll(".popup__overlay");

        closeButton.forEach((item) => {
            item.addEventListener("click", this.close);
          });
          
          overlay.forEach((item) => {
            item.addEventListener("click", this.close);
          });

    }
}