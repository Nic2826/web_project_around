export default class FormValidator {
    constructor(formConfig, formElement) {
        this._formSelector = formConfig.formSelector;
        this._inputSelector = formConfig.inputSelecto;
        this._submitButtonSelector = formConfig.submitButtonSelector; 
        this._inactiveButtonClass = formConfig.inactiveButtonClass;
        this._inputErrorClass = formConfig.inputErrorClass;
        this._errorClass = formConfig.errorClass;
        this._formElement = formElement;
    }

    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add("popup__input_type_error");
        errorElement.textContent = errorMessage;
        errorElement.classList.add("popup__input-error_active");
      };

      _hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove("popup__input_type_error");
        errorElement.classList.remove("popup__input-error_active");
        errorElement.textContent = "";
      };

      checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
          this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
          hideInputError(formElement, inputElement);
        }
      };

      _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
          //CONSOLE LOG OPCIONAL --------------------------------------//////////
          console.log(inputElement.validity.valid);
        });
      };

      _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
          buttonElement.classList.add("popup__button-save_inactive");
        } else {
          buttonElement.classList.remove("popup__button-save_inactive");
          buttonElement.disabled = false;
        }
      };

      _setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
        const buttonElement = formElement.querySelector(".popup__button-save");
          this._toggleButtonState(inputList, buttonElement);
          inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", function () {
              this._checkInputValidity(formElement, inputElement);
               this._toggleButtonState(inputList, buttonElement);
            });
          });
        };

        enableValidation = () => {
            const formList = Array.from(document.querySelectorAll(".popup__admin"));
            formList.forEach((formElement) => {
              this._formElement.addEventListener("submit", function (evt) {
                evt.preventDefault();
              });
          
              const fieldsetList = Array.from(this._formElement.querySelectorAll(".popup__container"));
          
              fieldsetList.forEach((fieldset) => {
                setEventListeners(fieldset);
              });
            });
          };    
}