import React from 'react';
import editButton from '../images/profile__avatar-edit-button.png';
import Card from '../components/Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({cards, onEditAvatar,onEditProfile, onAddPlace, onCardLike, onCardDelete, handleCardClick}) {

    const currentUser = React.useContext(CurrentUserContext);

    return(
        <main className="content">
        <section className="profile">
            <div className ="profile__card">
                <img className="profile__avatar" src={currentUser.avatar} alt="Исследователь океана Жак Ив Кусто" />
                <img onClick={onEditAvatar} className="profile__avatar-edit-button" src={editButton} alt="Кнопка редактирования фотографии профиля" />
                <div className="profile__info">
                    <div className="profile__title-button">
                        <h1 className="profile__info-title">{currentUser.name}</h1>
                        <button type="button" onClick={onEditProfile} className="profile__edit-button" ></button>
                    </div>
                    <p className="profile__info-subtitle">{currentUser.about}</p>
                </div>
            </div>
            <button type="button" onClick={onAddPlace} className="profile__add-button"></button>
        </section>
        <section className = "gridImages">
            <ul className="elements">
                {cards && cards.map((card) => 
                    (<Card  key={card._id} 
                            {...card}
                            onCardClick={handleCardClick} 
                            onCardLike={(card) => onCardLike(card)}
                            onCardDelete={(card) => onCardDelete(card)}                            
                            />))}
            </ul>
        </section>
    </main>
    );
}

export default Main;
