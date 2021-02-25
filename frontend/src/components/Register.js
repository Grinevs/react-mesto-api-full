import React from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegisterUser({
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
      <section className="register">
        <PopupWithForm
          name = 'register'
          title = 'Регистрация'
          isOpen={props.isOpen}
          onSubmit={handleSubmit}>
        <input
          id="popup_register__email"
          type="text"
          name="email"
          placeholder="Email"
          required
          className="popup__edit register__edit"
          minLength={2}
          maxLength={40}
          onChange={handleChangeEmail}
          value={email || ''}
        />
        <span id="popup_profile__title-error" className="popup__input-error" />
        <input
          id="popup_register__password"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          className="popup__edit register__edit"
          minLength={2}
          maxLength={200}
          onChange={handleChangePassword}
          value={password || ''}
        />
        <span
          id="popup_profile__subtitle-error"
          className="popup__input-error"
        />
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
        </PopupWithForm>
        <Link to = '/sign-in' className = 'register__tip' >
        Уже зарегистрированы? Войти
        </Link>
      </section>
  );
}

export default Register;
