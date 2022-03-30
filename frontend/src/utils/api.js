class Api {
    constructor({serverUrl, token, groupId}) {
        this._serverUrl = serverUrl;
        this._token = token;
        this._groupId = groupId;
    }

    _checkResult(res) {
        return res.ok
            ? res.json()
            : Promise.reject(`Ошибка: ${res.status} `);
    }

    getInitialCards() {
        return fetch(`${this._serverUrl}/${this._groupId}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token,
            }
        })
            .then(this._checkResult);
    }

    postNewCard({name, link}) {
        return fetch(`${this._serverUrl}/${this._groupId}/cards`, {
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
        return fetch(`${this._serverUrl}/${this._groupId}/cards/${id}/likes`, {
            method,
            headers: {
                authorization: this._token
            },
        })
            .then(this._checkResult)
    }

    likeCard(id) { //to delete
        return fetch(`${this._serverUrl}/${this._groupId}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            },
        })
            .then(this._checkResult)
    }

    dislikeCard(id) { // to delete
        return fetch(`${this._serverUrl}/${this._groupId}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            },
        })
            .then(this._checkResult)
    }

    deleteCard(id) {
        return fetch(`${this._serverUrl}/${this._groupId}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            },
        })
            .then(this._checkResult)
    }

    getUserInfo() {
        return fetch(`${this._serverUrl}/${this._groupId}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkResult)
    }

    postUserInfo({ name, about }) {
        return fetch(`${this._serverUrl}/${this._groupId}/users/me`, {
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
        return fetch(`${this._serverUrl}/${this._groupId}/users/me/avatar`, {
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
    serverUrl: 'https://mesto.nomoreparties.co/v1',
    token: '56783857-c2a8-4fa7-a04b-c7f5824d8c44',
    groupId: 'cohort-32'
});

export {api};