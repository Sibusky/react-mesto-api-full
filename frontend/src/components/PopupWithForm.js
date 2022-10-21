import React from 'react'

export default function PopupWithForm({ name, title, isOpen, children, buttonText, onClose, onSubmit }) {
  return (
    <div>
        <div className={`popup popup_place_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <form className="popup__form popup__form_place_profile" name={name} onSubmit={onSubmit} >
            <h2 className="popup__title">{title}</h2>
            <fieldset className="popup__inputs">
              <ul className="popup__inputs-list">
                {children}
              </ul>
              <button className="popup__save-button"
                type="submit">{buttonText}</button>
            </fieldset>
          </form>
          <button className="popup__close-button" onClick={onClose} type="button"></button>
        </div>
      </div>
    </div>
  )
}