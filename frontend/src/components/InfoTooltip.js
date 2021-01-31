import React from 'react';
import PopupWithForm from './PopupWithForm';

function InfoTooltip({ isOpen, onClose, loggedIn, message,infoTooltip }) {
  
  return (
    <PopupWithForm
      formName='infoTooltip'
      noConfirm={true}
      isOpen={isOpen}
      onClose={onClose}
      loggedIn={loggedIn}
      isModalUp={true}
      infoTooltip={infoTooltip}
    >
      <img src={message.iconPath} alt='Изображение авторизации' className='modal__icon' />
      <p className='modal__text'>{message.text}</p>

    </PopupWithForm >
  );
}

export default InfoTooltip;