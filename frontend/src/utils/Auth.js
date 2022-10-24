export const BASE_URL = 'http://api.asmirnov.students.nomoredomains.icu';

// Проверяю ответ сервера
function checkResponse(res) {
    return res.ok
        ? res.json()
        : Promise.reject(`Ошибка...: ${res.status}: ${res.message}`);
};

// Функция регистрации пользователя
export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse)
};

// Функция авторизации пользователя
export function authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse)
};

// Получаю информацию о текущем пользователе
export function getContent(token) {
    console.log('отправленный токен getContent:', token)
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(checkResponse)
}