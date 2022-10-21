import React from 'react'

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_place_image ${card ? "popup_opened" : " "}`}>
      <figure className="popup__image-container">
        <figcaption className="popup__image-title">{card?.name}</figcaption>
        <img className="popup__image"
        // Использую опциональную цепочку для более лаконичной записи:
        // src={props.card ? props.card.link : " "}
          src={card?.link}
          alt={card?.name} />
        <button className="popup__close-button popup__close-button_place_image button"
          onClick={onClose}
          type="button"></button>
      </figure>
    </div>
  )
}