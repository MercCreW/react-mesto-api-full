import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}){
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);
 

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
      }

    function handleChangeAbout(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
      } 
    
    return(
        <PopupWithForm 
        nameForm={'edit-form'}
        name={'newProfile'}
        title={'Редактировать профиль' }
        idButton={'saveEditForm' }
        isOpen={isOpen} 
        onClose={onClose} 
        buttonText={'Сохранить'}
        onSubmit={handleSubmit}
        children={(
        <>
        <input 
            type="text"
            name="input-name"
            value={name}
            onChange={handleChangeName}
            className="modal__input modal__input_type_name"
            required
            minLength="2"
            maxLength="40" />
        <span className="modal__error" id="input-name-error"></span>
        <input
            type="text"
            name= "input-profession"
            value={description}
            onChange={handleChangeAbout}
            className="modal__input modal__input_type_about-myself"
            required 
            minLength="2"
            maxLength="200" />
        <span className="modal__error" id="input-profession-error"></span>
        </>
        )}
    />
    );
}

export default EditProfilePopup;