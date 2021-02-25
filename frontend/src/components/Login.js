import React from 'react';
import { Redirect } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onLoginUser({
      email,
      password,
    });
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
      <section className="login">
        {props.loggedIn && <Redirect to="/" />}
        <PopupWithForm
          name = 'login'
          title = 'Вход'
          isOpen={props.isOpen}
          onSubmit={handleSubmit}>
        <input
          id="popup_login__email"
          type="text"
          name="email"
          placeholder="Email"
          required
          className="popup__edit login__edit"
          minLength={2}
          maxLength={40}
          onChange={handleChangeEmail}
          value={email || ''}
        />
        <span id="popup_login__title-error" className="popup__input-error" />
        <input
          id="popup_login__password"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          className="popup__edit login__edit"
          minLength={2}
          maxLength={200}
          onChange={handleChangePassword}
          value={password || ''}
        />
        <span
          id="popup_login__subtitle-error"
          className="popup__input-error"
        />
        <button className="login__button" type="submit">
          Войти
        </button>
        </PopupWithForm>
      </section>
  );
}
