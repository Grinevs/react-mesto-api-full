import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import tempapi from '../utils/tempapi';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = React.useState();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [userEmail, setUserEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    // eslint-disable-next-line no-unused-expressions
    (token && loggedIn)
      && tempapi
        .getJWT(token)
        .then((data) => {
          api._headers = ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });
          setUserEmail(data.email);
          setLoggedIn(true);
          setCurrentUser(data);
          api
            .getInitialCards()
            .then((cardsInit) => {
              setCards(cardsInit);
            })
            .catch((err) => {
              console.log('Ошибка. Запрос не выполнен: ', err);
            });
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
  }, [loggedIn]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false,
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false,
  );
  const [isImgPopupOpen, setImgPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [isInfoToolTip, setInfoToolTip] = React.useState(false);
  const [infoTooltipValid, setInfoTooltipValid] = React.useState('_valid');

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImgClick() {
    setImgPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImgPopupOpen(false);
    setInfoToolTip(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    handleImgClick();
  }

  function handleUpdateUser(data) {
    api
      .editUserProfile(data)
      .then((user) => {
        closeAllPopups();
        setCurrentUser(user.data);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editUserAvatar(data)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((data) => {
        setCards([data.data, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  function handleRegisterUser(newUser) {
    tempapi
      .addUser(newUser)
      .then(() => {
        setInfoToolTip(true);
        setInfoTooltipValid('_valid');
        history.push('/sign-in');
      })
      .catch((err) => {
        setInfoToolTip(true);
        setInfoTooltipValid('_invalid');
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  function handleLoginUser(userData) {
    tempapi
      .authUser(userData)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setUserEmail(userData.email);
        history.push('/');
        setLoggedIn(true);
      })
      .catch((err) => {
        setInfoToolTip(true);
        setInfoTooltipValid('_invalid');
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
          <Switch>
          <Route exact path="/sign-in">
              <Header linkTitle="Регистрация" pushTo="/sign-up" />
              <Main
                type="sign-in"
                onLoginUser={handleLoginUser}
                loggedIn={loggedIn}
              />
            </Route>
            <Route exact path="/sign-up">
              <Header linkTitle="Войти" pushTo="/sign-in" />
              <Main
                type="sign-up"
                onRegisterUser={handleRegisterUser}
                loggedIn={loggedIn}
              />
            </Route>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onImgClick={handleCardClick}
              cards={cards || [{}]}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              type="main"
              userEmail={userEmail}
              clicKSignOut={signOut}
            />
          </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceCard={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="popup_delete"
          onClose={closeAllPopups}
        >
          <button className="popup__button popup_delete__button" type="submit">
            Да
          </button>
        </PopupWithForm>
        <InfoTooltip
          isOpen={isInfoToolTip}
          valid={infoTooltipValid}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImgPopupOpen}
          onClose={closeAllPopups}
        ></ImagePopup>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
