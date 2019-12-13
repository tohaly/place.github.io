class Validation {
    constructor (element) {
        this.element = element;     
    }

    inputValid(input, message) {
        if(input.type === 'url' && !input.validity.valid) {
            message.textContent  = "Здесь должна быть ссылка";
            return false;
        } else {
            if(input.validity.tooShort || input.validity.tooLong) {
                message.textContent  = "Должно быть от 2 до 30 символов";
                return false;
            } else if(input.validity.valueMissing) {
                message.textContent  = "Это обязательное поле";
                return false;
            } else {
                message.textContent  = " ";
                return true;
            }
        }    
    }

    formValid(input) {
        if(input.type === 'url' && !input.validity.valid) {
            return false;
        } else {
            if(input.validity.tooShort || input.validity.tooLong) {
                return false;
            } else if(input.validity.valueMissing) {
                return false;
            } else {
                return true;
            }
        }    
    }

    switchButton() {
        const button =  document.querySelector('.popup__button');

        if (!this.formValid(this.element.elements[0]) || !this.formValid(this.element.elements[1])) {
            button.setAttribute('disabled', true);
            button.classList.remove('popup__button_active');
        } else {
            button.removeAttribute('disabled');
            button.classList.add('popup__button_active');
        }
    }

    render() {
        const firstMessage = this.element.querySelector('.popup__error-message_first');
        const secondMessage = this.element.querySelector('.popup__error-message_second');        
        
        this.element.elements[0].addEventListener('input', () => {
            this.inputValid(this.element.elements[0], firstMessage);            
        });
        this.element.elements[1].addEventListener('input', () => {
            this.inputValid(this.element.elements[1], secondMessage);            
        });
        document.forms[0].addEventListener('input', () => {
            this.switchButton();
        });
    }}