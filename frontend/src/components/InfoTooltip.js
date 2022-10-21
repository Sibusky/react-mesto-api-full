import React from 'react'

export default function InfoTooltip({ name, isOpen, onClose, caption, image }) {

    return (
        <div className={`popup popup_place_${name} ${isOpen ? 'popup_opened' : ' '}`}>
            <div className="popup__container">
                <img className="popop__infotooltip-img" alt={caption} src={image} />
                <h2 className="popup__caption">{caption}</h2>
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}>
                </button>
            </div>
        </div>
    )
}
