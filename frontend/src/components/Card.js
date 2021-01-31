import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {

    const сurrentUser = React.useContext(CurrentUserContext);
    const isOwn = props.owner._id === сurrentUser._id;   
    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_owner' : ''}`
      );
    
    const isLiked = props.likes.some(i => i._id  === сurrentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    ); 
    
    function handleClick() {
        props.onCardClick({link:props.link, name:props.name, alt:props.name});
      }

    function handleLikeClick(){
        //console.log(isLiked);
        props.onCardLike(props);
    }  

    function handleDeleteClick() {
        props.onCardDelete(props);
    }


    return(
        <li className="element">
            <article> 
                <button 
                    type="button" 
                    className={cardDeleteButtonClassName}
                    onClick={handleDeleteClick}
                ></button>
                <img className="element__image"  
                    src={props.link} 
                    alt={props.name} 
                    onClick={handleClick} 
                />
                <div className="element__items">
                    <h2 className="element__title">{props.name}</h2>
                    <div className="element__likes-box"> 
                        <button 
                            type="button" 
                            className={cardLikeButtonClassName}
                            onClick={handleLikeClick}
                            ></button>
                        <span className="element__count-likes">{props.likes.length}</span>
                    </div>
                </div>
            </article>
        </li>
    );
}

export default Card;