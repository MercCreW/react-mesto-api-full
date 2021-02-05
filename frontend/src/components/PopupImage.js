import React from 'react'

function PopupImage({card, onClose}) {
    return (
      <div className={`popup popup-image ${card && 'popup_opened'}`}>
      <div className="popup-image__container">
        <button className="popup__close-button" type="button" aria-label="Close" onClick={onClose}>
        </button>
        <figure className="popup-image__figure">
            <img className="popup-image__frame" src={card && card.link} alt={card && card.name}/>
            <figcaption className="popup-image__title">{card && card.name}</figcaption>
        </figure>

      </div>
    </div>
    )
}

export default PopupImage;