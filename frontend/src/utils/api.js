/* eslint-disable no-else-return */
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._checkRequest(res));
  }

  getUserProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._checkRequest(res));
  }

  editUserProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._checkRequest(res));
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._checkRequest(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._checkRequest(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes/`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then((res) => this._checkRequest(res));
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes/`, {
        method: 'PUT',
        headers: this._headers,
      })
        .then((res) => this._checkRequest(res));
    }
  }

  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._checkRequest(res));
  }

  // eslint-disable-next-line class-methods-use-this
  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }
}

const configApi = {
  url: 'http://api.grinev.students.nomoredomains.icu',
  headers: { 'Content-Type': 'application/json' },
};

const api = new Api(configApi);
export default api;
