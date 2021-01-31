import React from 'react';

function ImagePopup({onClose, selectedCard}){
    

    return(
        <div className={`modal modal_type_img-big  ${selectedCard !== null ? 'modal_open' : ''}`} >
            <div className="modal__window-container">
                <button type="button" className="modal__close-button" onClick={onClose} ></button>
                <img className="modal__image" src={selectedCard !== null ? selectedCard.link : '#'} alt={selectedCard != null ? selectedCard.name : ''}/>
                <h2 className="modal__description" >{selectedCard !== null ? selectedCard.name : ''}</h2>
            </div> 
        </div>
    )
}

export default ImagePopup;