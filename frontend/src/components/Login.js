import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ handleLogin }) {

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
        handleLogin({ email, password });
    }

    return (
        <div className="login">
            <h3 className="login__title">Вход</h3>
            <form className="login__form" onSubmit={handleSubmit}>
                <fieldset className="login__form-fieldset">
                    <ul className="login__input-list">
                        <li className="login__input-item">
                            <input className="login__input"
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                required />
                            <span
                                id="error-login-email"
                                className="login__error">
                            </span>
                        </li>
                        <li className="login__input-item">
                            <input className="login__input"
                                type="password"
                                placeholder="Пароль"
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                required />
                            <span
                                id="error-login-email"
                                className="login__error">
                            </span>
                        </li>
                    </ul>
                </fieldset>
                <button className="login__submit-button" type="submit">Войти</button>
            </form>
            <p className="login__signup">Нет аккаунта? 
            <Link to="/signup" className="login__signup-link link">&nbsp;Зарегистрироваться</Link>
            </p>
        </div>
    )
}
