import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../context/CurrentUserContext';


export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

    const { currentUser } = React.useContext(CurrentUserContext); // Подписываюсь на контекст CurrentUserContext

    return (
        <main className="container">
            <section className="profile">
                <div className="profile__avatar-container">
                    <div className="profile__avatar-hover" onClick={onEditAvatar}></div>
                    <img className="profile__avatar"
                        alt="Аватар профиля"
                        src={currentUser.avatar}
                    />
                </div>

                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button button" onClick={onEditProfile} type="button"
                            aria-label="Редактировать профиль"></button>
                    </div>
                    <p className="profile__bio">{currentUser.about}</p>
                </div>
                <button className="profile__add-button button" onClick={onAddPlace} type="button"></button>
            </section>

            <section className="elements">
                <ul className="elements__list">

                    {/* Вставляю карточки */}
                    {
                        cards.map((item) => (
                            <Card onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} card={item} key={item._id} />
                        ))
                    }

                </ul>
            </section>

        </main>
    )
}