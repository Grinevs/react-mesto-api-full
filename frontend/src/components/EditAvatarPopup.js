import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const avatar = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popup_avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit ={handleSubmit}
    >
      <input
        ref={avatar}
        id="popup_avatar__src"
        type="url"
        placeholder="Ссылка на картинку"
        name="subtitle"
        required
        className="popup__edit popup_avatar__src"
      />
      <span id="popup_avatar__src-error" className="popup__input-error" />
      <button className="popup__button popup_avatar__button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}
