import React from 'react';
import {Route, Redirect, Switch, useHistory, useLocation} from 'react-router-dom';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Footer from './Footer';
import '../index.css';
import api from '../utils/Api';
import * as auth from '../utils/auth';

import accessiblePath from '../images/access.svg';
import notAccessiblePath from '../images/denied.svg';
import loading from '../images/loading.svg';



function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);

    const [currentUser, setCurrentUser] = React.useState({name:'', about:'', avatar:''});

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [isAuthInfoOpened, setAuthInfoOpened] = React.useState(false);
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [message, setMessage] = React.useState({
        iconPath: loading,
        text: ''
      });

    const history = useHistory();
    const location = useLocation();


    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    React.useEffect(()=>{
        Promise.all([api.getInitialCards(), api.getUserInfo()])  
        .then(([cards, res]) => {
            setCards(cards);
            setCurrentUser(res);
        })
        .catch((err) => console.log(err));
    },[]);

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt)
            .then((res) => {
                setLoggedIn(true);
                setEmail(res.data.email);
                history.push('/');
            })
            .catch(err => console.log(err));
        }
    }, [history]);

    function handleRegister(password, email) {
        auth.register(escape(password), email)
          .then(() => {
            setMessage({ iconPath: accessiblePath, text: 'Вы успешно зарегистрировались!' });
            history.push('/sign-in');
          })
          .catch((err) => setMessage({ iconPath: notAccessiblePath, text: err.message }));
        setInfoTooltipOpen(true);
      }

    function handleLogin(password, email) {
        auth.authorize(escape(password), email)
            .then((data) => {
            auth.getContent(data)
                .then((res) => {
                setEmail(res.data.email);
                })
                .catch(err => console.log(err));
            setLoggedIn(true);
            setMessage({ iconPath: accessiblePath, text: 'Вы успешно вошли в приложение!' });
            history.push('/');
            })
            .catch((err) => setMessage({ iconPath: notAccessiblePath, text: err.message }))
        setInfoTooltipOpen(true);
        }

     
    function handleSignOut() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        setEmail('');
        history.push('/sign-in');
    }

    function handleUpdateUser(data){
        api.setUserInfo(data)
        .then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((error) => console.log('Ошибка при редактировании данных пользователя', error));
    }

    function handleUpdateAvatar(link){
        api.patchNewAvatar(link)
        .then((link)=>{
            setCurrentUser(link);
            closeAllPopups();
        })
        .catch((error) => console.log(error));
    }

    function handleAddPlaceSubmit(data){
        api.addNewCard(data)
          .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
          });
      }

    function handleCardLike(card){
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.addLikeDislikeCard(card._id, !isLiked)
          .then((newCard) => {
              console.log(newCard)
            const newCards = cards.map((item) => item._id === card._id ? newCard : item);
            setCards(newCards);
          })
          .catch((error) => console.log(error));
      }


    function handleDeleteCard(card){
        api.deleteCard(card._id)
        .then(()=>{
            const newCards = cards.filter((currentCard)=> currentCard._id !== card._id);
            setCards(newCards);
            closeAllPopups();
        })
        .catch((error) => console.log(error));
    }

    const closeAllPopups = () =>{
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setInfoTooltipOpen(false);
    
        setSelectedCard(null);
    }

return (
    <CurrentUserContext.Provider value={currentUser} >
        <Header 
            loggedIn={loggedIn}
            locaction={location}
            email={email}
            signOut={handleSignOut}
            isAuthInfoOpened={isAuthInfoOpened}  
        />
        <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            handleCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
         
            cards={cards}
            setCards={setCards}
            onClose={closeAllPopups}
            />
            
            <Route exact path ="/sign-in">
                <Login onLogin={handleLogin} />
            </Route>
       
            <Route path='/sign-up'>
                <Register onRegister={handleRegister} />
            </Route>
            <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
        </Switch>
        <Footer />

    <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        loggedIn={loggedIn}
        message={message}
        infoTooltip={true}
    />

    <PopupWithForm 
        name='confirm' 
        title='Вы уверены?' 
        idButton='delete' 
        buttonText='Сохранить'
    />
    
    <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
    /> 
    
    <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} 
    /> 

    <AddPlacePopup
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
    />

    <ImagePopup 
        onClose={closeAllPopups}
        selectedCard={selectedCard}
    />  
    </CurrentUserContext.Provider>
  );
}

export default App;
