import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Cards(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onImgClick(props.card);
  }

  const isLiked = (props.card.likes.some((i) => i === currentUser._id));
  const isOwn = props.card.owner === currentUser._id;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <img
        className="element__img"
        src={props.card.link}
        alt={props.card.alt ? props.card.alt : props.card.name}
        onClick={handleClick}
      />
      <h3 className="element__title">{props.card.name}</h3>
      {(isOwn) ? (
        <button type="button"
        onClick = {handleDeleteClick}
        className="element__recyclebin"></button>
      ) : (
        <></>
      )}

      <button
        type="button"
        onClick={handleLikeClick}
        className={
          (isLiked)
            ? 'element__like-button element__like-button_active'
            : 'element__like-button'
        }
      ></button>
      <p className="element__likes">{(props.card.likes) ? props.card.likes.length : 0}</p>
    </li>
  );
}
