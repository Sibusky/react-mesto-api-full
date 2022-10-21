import React from 'react'
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    // Записываю объект, возвращаемый хуком, в переменную
    const avatarRef = React.useRef();

    // Обработчик формы
    function handleSubmit(e) {
        // Запрещаю браузеру обновлять страницу
        e.preventDefault();

        // Передаю значение инпута, полученное с помощью рефа
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    // Обнуляю инпут во время открытия окна
    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            formName="avatar-edit-form"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <li className="popup__inputs-list-item">
                <input
                    className="popup__input popup__input_type_link"
                    type="url"
                    placeholder="Ссылка на аватар"
                    name="avatarlink-input"
                    required
                    ref={avatarRef} />
                <span className="popup__input-error avatarlink-input-error"></span>
            </li>

        </PopupWithForm>
    )
}
