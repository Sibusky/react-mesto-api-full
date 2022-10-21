import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ handleRegister }) {

    // Объявляю переменные состояния через хук useState
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    // Универсальный обработчик полей
    function handleChange(e) {
        const { name, value } = e.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // Обработчик формы
    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = values;
        handleRegister({ email, password });
    }

    return (
        <div className="register">
            <h3 className="register__title">Регистрация</h3>
            <form className="register__form" onSubmit={handleSubmit}>
                <fieldset className="register__form-fieldset">
                    <ul className="register__input-list">
                        <li className="register__input-item">
                            <input
                                className="register__input"
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                required />
                            <span
                                id="error-register-email"
                                className="register__error">
                            </span>
                        </li>
                        <li className="register__input-item">
                            <input
                                className="register__input"
                                type="password"
                                placeholder="Пароль"
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                required />
                            <span
                                id="error-register-email"
                                className="register__error">
                            </span>
                        </li>
                    </ul>
                </fieldset>
                <button className="register__submit-button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="register__signin">Уже зарегистрированы? 
            <Link to="/signin" className="register__signin-link link">&nbsp;Войти</Link>
            </p>
        </div>
    );
}
