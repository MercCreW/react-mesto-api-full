import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup({isOpen, onClose, onAddPlace}){
    const refCardName = React.useRef();
    const refCardLink = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({ 
            name: refCardName.current.value,
            link: refCardLink.current.value
        });
    }

    return(
        <PopupWithForm 
        name='add-card' 
        title='Новое место' 
        idButton='saveButtonAddCard' 
        onSubmit={handleSubmit}
        isOpen={isOpen} 
        onClose={onClose}
        buttonText='Добавить'
    >
        <input
            type="text"
            name="input-tittle"
            ref={refCardName}
            className="modal__input modal__input_type_title"
            placeholder="Название"
            required
            minLength="1"
            maxLength="30" />
        <span className="modal__error" id="input-tittle-error"></span>
        <input
            type="url"
            name= "input-link"
            ref={refCardLink}
            className="modal__input modal__input_type_link"
            placeholder="Ссылка на картинку"
            required />
        <span className="modal__error" id="input-link-error"></span>
    </PopupWithForm>
    )
}

export default AddPlacePopup;