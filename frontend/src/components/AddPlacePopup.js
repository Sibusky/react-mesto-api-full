import React, { useState, } from 'react'
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    // Стейт, в котором содержатся значение инпутов
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    // Обработчик изменения инпута названия обновляет стейт
    function handleNameChange(e) {
        setName(e.target.value);
    };

    // Обработчик изменения инпута ссылки обновляет стейт
    function handleLinkChange(e) {
        setLink(e.target.value);
    };

    // Обнуляю инпуты во время открытия окна
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    // Обработчик формы
    function handleSubmit(e) {
        // Запрещаю браузеру обновлять страницу
        e.preventDefault();

        // Передаю значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name: name,
            link: link
        });
    }

    return (
        <div>
            <PopupWithForm
                name="card"
                title="Новое место"
                formName="cards-add-form"
                buttonText="Создать"
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}>

                <li className="popup__inputs-list-item">
                    <input
                        className="popup__input popup__input_type_place-name"
                        type="text"
                        placeholder="Название"
                        name="placename-input"
                        required minLength="2"
                        maxLength="30"
                        onChange={handleNameChange}
                        value={name} />
                    <span className="popup__input-error placename-input-error"></span>
                </li>
                <li className="popup__inputs-list-item">
                    <input
                        className="popup__input popup__input_type_link"
                        type="url"
                        placeholder="Ссылка на картинку"
                        name="picturelink-input"
                        required
                        onChange={handleLinkChange}
                        value={link} />
                    <span className="popup__input-error picturelink-input-error"></span>
                </li>
            </PopupWithForm>
        </div>
    )
}
