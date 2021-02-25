import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function InfoTooltip(props) {
  const title = props.valid === '_valid'
    ? 'Вы успешно зарегистрировались!'
    : 'Что-то пошло не так! Попробуйте ещё раз.';
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <PopupWithForm
      title={title}
      name="popup_infotooltip"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit ={handleSubmit}
      valid = {props.valid}
    >
    </PopupWithForm>
  );
}
