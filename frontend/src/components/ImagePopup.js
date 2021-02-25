import React from 'react';

function ImagePopup(props) {
  const popupOpened = `${props.isOpen ? 'popup popup_photo popup_opened' : 'popup popup_photo'}`;
  return (
    <div className={popupOpened}>
      <div className="popup__container popup_photo__container">
        <img
          className="popup_photo__pic"
          alt={props.card ? props.card.alt : 'нет описания'}
          src={props.card ? props.card.link : '#'}
        />
        <h3 className="popup__title popup_photo__title">
          {props.card ? props.card.name : ''}
        </h3>
      </div>
      <button
        type="button"
        className="popup__close-icon popup_photo__close-icon"
        onClick={props.onClose}
      ></button>
    </div>
  );
}

export default ImagePopup;
