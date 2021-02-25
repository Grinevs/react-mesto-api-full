import React from 'react';
import Cards from './Cards';
import Register from './Register';
import Login from './Login';
import Header from './Header';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      {props.type === 'main' && (
        <Header
        user={props.userEmail}
        linkTitle="Выйти"
        pushTo="/sign-in"
        loggedIn={props.loggedIn}
        clicKSignOut={props.clicKSignOut}
        />
      )}
      <main className="content">
            {props.type === 'sign-up' && (
              <Register
                isOpen
                onRegisterUser={props.onRegisterUser}
                loggedIn={props.loggedIn}
              />
            )}
            {props.type === 'sign-in' && (
              <Login
                isOpen
                onLoginUser={props.onLoginUser}
                loggedIn={props.loggedIn}
              />
            )}

        {props.type === 'main' && (
          <>
            <section className="profile">
              <div className="profile__overlay">
                <img
                  src={currentUser ? currentUser.avatar : ''}
                  alt="аватар"
                  className="profile__avatar"
                  onClick={props.onEditAvatar}
                />
              </div>
              <div className="profile__info">
                <div className="profile__title-edit">
                  <h2 className="profile__title">
                    {currentUser ? currentUser.name : ''}
                  </h2>
                  <button
                    type="button"
                    className="profile__edit-button"
                    onClick={props.onEditProfile}
                  />
                </div>
                <p className="profile__subtitle">
                  {currentUser ? currentUser.about : ''}
                </p>
              </div>
              <button
                type="button"
                className="profile__add-button"
                onClick={props.onAddPlace}
              />
            </section>
            <section className="elements">
              <ul className="elements__list">
                {props.cards.map((card) => (
                  <Cards
                    card={card}
                    key={card._id}
                    onImgClick={props.onImgClick}
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete}
                  />
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default Main;
