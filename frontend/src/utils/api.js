class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status))) // Если ответ пришёл, получаем .json, если нет, идём в .catch
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      })
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  }

  // // Функции добавлени и удаления лайка по отдельности
  // deleteLike(id) {
  //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //       method: "DELETE",
  //       headers: this._headers,        
  //     })
  //       .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  // }

  // addLike(id) {
  //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //       method: "PUT",
  //       headers: this._headers,        
  //     })
  //       .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  // }

  // Объединённая функция добавлени у даления лайка
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  }


  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar  // Этот параметр должен быть ссылкой
      })
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  }

}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "d376e762-1130-4acf-8b0e-4370f7856fb8",
    "Content-Type": "application/json",
  },
});
