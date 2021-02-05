class Api {
	constructor(options) {
    	this._url = options.baseUrl;
    	this._headers = options.headers;
  	}
    
    // Отправить запрос
     _sendRequest(path, parameters) {
		return fetch(`${this._url}${path}`, parameters).then((res) => {
      		if (res.ok) {
        		return res.json();
      		}

      		return Promise.reject(res.status);
    	});
  	}

  	// Получить данные пользователя
  	getUserInfo() {
		const token = (localStorage.getItem('jwt'));

    	return this._sendRequest(`users/me`, {
			headers: {
				...this._headers,
				'authorization':`Bearer ${token}`},
    	});
	}

  	// Получить карточки из сервера 
	getInitialCards() {
		const token = (localStorage.getItem('jwt'));

		return this._sendRequest(`cards`, {
			headers: {
				...this._headers,
				'authorization':`Bearer ${token}`},
		});
	}

	// Обновить данные пользователя
	updateUserInfo(newUserInfo) {
		const token = (localStorage.getItem('jwt'));

		return this._sendRequest(`users/me`, {
			method: 'PATCH',
			headers: {
				...this._headers,
				'authorization':`Bearer ${token}`},
			body: JSON.stringify({
				name: newUserInfo.name,
				about: newUserInfo.about,
			}),
		});
	}

    // Обновить аватар
	updateUserAvatar(avatar) {
		const token = (localStorage.getItem('jwt'));

		return this._sendRequest(`users/me/avatar`, {
			method: 'PATCH',
			headers: {
				...this._headers,
				'authorization':`Bearer ${token}`},
			body: JSON.stringify({ avatar: avatar })
		});
	}

	// Добавить карточку
	addNewCard(newCard) {
		const token = (localStorage.getItem('jwt'));

		return this._sendRequest(`cards`, {
			method: 'POST',
			headers: {
				...this._headers,
				'authorization':`Bearer ${token}`},
			body: JSON.stringify({
				name: newCard.name,
				link: newCard.link
			}),
		});
	}

    // Удалить карточку 
	deleteCard(id) {
		const token = (localStorage.getItem('jwt'));

		return this._sendRequest(`cards/${id}`, {
			method: 'DELETE',
			headers: {
				...this._headers,
				'authorization':`Bearer ${token}`},
		});
	}
	
	// Поставить/убрать лайк
	changeLikeCardStatus(id, isLiked) {
		const token = (localStorage.getItem('jwt'));

		return this._sendRequest(`cards/${id}/likes`, {
			method: `${isLiked ? 'PUT' : 'DELETE'}`,
			headers: {
				...this._headers,
				'authorization':`Bearer ${token}`},
		});
	}

}

export const api  = new Api({
    //baseUrl: 'http://localhost:3000', 
    baseUrl:'https://api.iskandarov-project.students.nomoreparties.xyz/',  
    headers: {
		'Content-Type': 'application/json',
	}  
  });