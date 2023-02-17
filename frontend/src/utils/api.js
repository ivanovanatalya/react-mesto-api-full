class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._authToken = options.headers.authorization;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: { authorization: this._authToken },
    })
      .then(res => this._getResponseData(res));
  }

  setUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    })
      .then(res => this._getResponseData(res));
  }

  getCardList() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: { authorization: this._authToken },
    })
      .then(res => this._getResponseData(res));
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
      .then(res => this._getResponseData(res));
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
      },
    })
      .then(res => this._getResponseData(res));
  }

  _setCardLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authToken,
      },
    })
      .then(res => this._getResponseData(res));
  }

  _deleteCardLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
      },
    })
      .then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(cardID, isLiked) {
    return isLiked ? this._deleteCardLike(cardID) : this._setCardLike(cardID);
  }

  setUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar })
    })
      .then(res => this._getResponseData(res));
  }
}

const api_token = '504d9f32-34cb-46c5-b423-b7576f09dbc5';

export const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  baseUrl: 'https://api.mesto.ivanovann.nomoredomains.work',
  headers: {
    authorization: api_token,
    'Content-Type': 'application/json'
  }
});

export default Api;