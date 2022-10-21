import React from 'react'
import { CurrentUserContext } from '../context/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  // Подписываюсь на контекст CurrentUserContext
  const { currentUser } = React.useContext(CurrentUserContext);

  // Определяю, являюсь ли я владельцем текущей карточки
  const isOwn = card.owner._id === currentUser.id;

  // Создаю переменную, которую после задам в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `elements__delete-card-button ${isOwn ? ' ' : 'elements__delete-card-button_hidden'}`
  );

  // Определяю, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser.id);

  // Создаю переменную, которую после задам в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `elements__like ${isLiked ? 'elements__like_active' : ' '}`
  );

  // Функция для открытия полной фотографии карточки
  function handleClick() {
    onCardClick(card);
  }

  // Функция для установки лайка
  function handleLikeClick() {
    onCardLike(card)
  }

  // Функция для удаления карточки
  function handleDelete() {
    onCardDelete(card)
  }

  return (
    <li className="elements__item">
      <img className="elements__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick} />
      <div className="elements__title">
        <h3 className="elements__name">{card.name}</h3>
        <div className="elements__like-counter">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}>
          </button>
          <span className="elements__counter">{card.likes.length}</span>
        </div>
      </div>
      <button className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDelete}></button>
    </li>
  )
}