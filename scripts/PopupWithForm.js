import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".popup__admin");
    this._inputList = this._formElement.querySelectorAll(".popup__input ");
    this._handleFormSubmit = handleFormSubmit;  
}

getInputValues(){
this.formValues = {};
this._inputList.forEach((input)=>{
    this.formValues[input.name] = input.value;
});
return this.formValues;  
}


setEventListeners(){
    super.setEventListeners();

    this._popupElement.querySelector(".popup__admin").addEventListener("submit", (evt)=>{
        evt.preventDefault;
        this._handleFormSubmit(this.getInputValues());
        super.close();
    });
}

close(){
    super.close();
    this._formElement.reset();
}

}