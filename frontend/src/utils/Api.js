class Api{
    constructor({baseUrl, headers, сredentials }){
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._сredentials = сredentials;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkStatus)
    }
    
    getUserInfo() {
        return fetch(
            `${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkStatus)
    }

    setUserInfo(userInfo) {
        console.log(userInfo)
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userInfo)
        }
        )
        .then(this._checkStatus)
    }

    editUserInfo(editName, editInfo){
        return fetch(
            `${this._baseUrl}/users/me`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: editName,
                    about: editInfo
                })
            }
        )
            .then(this._checkStatus)    
    }

    addNewCard(data){
        return fetch(
            `${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._checkStatus)
    }

    addLikeDislikeCard(cardId, isLike) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method:  isLike ? 'PUT' : 'DELETE',
            headers: this._headers
        })
            .then(this._checkStatus);
    }

    patchNewAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify(link)
        })
            .then(this._checkStatus);
    }

    deleteCard(itemId) {
        return fetch(`${this._baseUrl}/cards/${itemId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkStatus);
    }
}

const api = new Api({
    baseUrl: 'https://api.iskandarov-project.students.nomoreparties.xyz',
    headers: {
      'Content-Type': 'application/json',
    },
    сredentials: 'include',
  });

export default api;