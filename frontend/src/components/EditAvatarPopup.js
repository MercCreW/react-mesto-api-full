import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
    const refAvatar = React.useRef();


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: refAvatar.current.value,
        });
      } 

    return(
        <PopupWithForm
        onSubmit={handleSubmit}
        name='edit-avatar'
        title='Обновить аватар'
        idButton='loadAvatar' 
        isOpen={isOpen} 
        onClose={onClose} 
        buttonText='Сохранить'
        >
            <input
                type="url"
                name= "input-avatar"
                ref={refAvatar}
                className="modal__input modal__input_type_link"
                placeholder="Ссылка на картинку"
                required 
            />
            <span className="modal__error" id="input-avatar-error"></span>
            </PopupWithForm>
    );
}

export default EditAvatarPopup;
