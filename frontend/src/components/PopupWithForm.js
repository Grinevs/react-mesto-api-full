import React from 'react';

function PopupWithForm(props) {
  const popupOpened = `${props.isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={`popup ${props.name} ${popupOpened}`}>
      <button type="button" className={`popup__close-icon ${props.name}__close-icon`} onClick={props.onClose}/>
      <div className={`popup__container ${props.name}__container${props.valid || ''} ${props.valid && `${props.name}__container`}`}>
  <h3 className = {`popup__title ${props.name}__title`}>{props.title}</h3>
        <form className={`popup__form ${props.name}__form`} name={props.name} noValidate onSubmit={props.onSubmit}>
           {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
