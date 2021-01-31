import React from 'react';

function PopupWithForm(props){
    //console.log(props);
    return(
        <div onSubmit={props.onSubmit} className={`modal modal_type_${props.nameForm} ${props.isOpen ? 'modal_open' : ''}`}>
        <div className="modal__container">
            <button className="modal__close-button" onClick={props.onClose}></button>
            <h2 className="modal__title">{props.title}</h2>
            <form className="modal__edit-form">
                {props.children}
                {!props.infoTooltip ? (
                <button id={props.idButton} className="modal__save-button" type="submit" >{props.buttonText}</button>
                ):(
                    <></>
                )}
            </form>
        </div>
    </div>
    )
}

export default PopupWithForm;