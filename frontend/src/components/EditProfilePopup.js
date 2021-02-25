import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName((currentUser) ? currentUser.name : '');
    setDescription((currentUser) ? currentUser.about : '');
  }, [currentUser]);

  function handleChangeAuthor(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
        title="Редактировать профиль"
        name="popup_profile"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit ={handleSubmit}
      >
        <input
          id="popup_profile__title"
          type="text"
          name="title"
          placeholder="Имя"
          required
          className="popup__edit popup_profile__title"
          minLength={2}
          maxLength={40}
          onChange={handleChangeAuthor}
          value={name || ''}
        />
        <span id="popup_profile__title-error" className="popup__input-error" />
        <input
          id="popup_profile__subtitle"
          type="text"
          name="subtitle"
          placeholder="Профессия"
          required
          className="popup__edit popup_profile__subtitle"
          minLength={2}
          maxLength={200}
          onChange={handleChangeDescription}
          value={description || ''}
        />
        <span
          id="popup_profile__subtitle-error"
          className="popup__input-error"
        />
        <button className="popup__button popup_profile__button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
  );
}
