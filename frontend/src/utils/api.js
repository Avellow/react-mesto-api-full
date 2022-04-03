class Api {
    constructor({serverUrl, token}) {
        this._serverUrl = serverUrl;
        this._token = token;
    }

    setToken(jwt) {
        this._token = jwt;
    }

    _checkResult(res) {
        return res.ok
            ? res.json()
            : Promise.reject(`Ошибка: ${res.status} `);
    }

    getInitialCards() {
        return fetch(`${this._serverUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token,
            }
        })
            .then(this._checkResult);
    }

    postNewCard({name, link}) {
        return fetch(`${this._serverUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this._checkResult)
    }

    changeLikeCardStatus(id, isLiked) {
        const method = isLiked ? 'DELETE' : 'PUT';
        return fetch(`${this._serverUrl}/cards/${id}/likes`, {
            method,
            headers: {
                authorization: this._token
            },
        })
            .then(this._checkResult)
    }

    deleteCard(id) {
        return fetch(`${this._serverUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            },
        })
            .then(this._checkResult)
    }

    getUserInfo() {
        return fetch(`${this._serverUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkResult)
    }

    postUserInfo({ name, about }) {
        return fetch(`${this._serverUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(this._checkResult)
    }

    updateAvatar(avatar) {
        return fetch(`${this._serverUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar
            })
        })
            .then(this._checkResult)
    }
}

const api = new Api({
    serverUrl: 'http://127.0.0.1:3000',
    token: `Bearer ${localStorage.getItem('jwt')}`,
});

export {api};