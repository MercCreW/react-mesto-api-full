import BadRequestError from '../errors/BadRequestError';
import UnauthorizedError from '../errors/notAuthorizedError';

// export const base_url = 'https://localhost:3001';
export const base_url = 'https://api.iskandarov-project.students.nomoreparties.xyz';

export const registration = (password, email) => fetch(`${base_url}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(res.status);
        })
        .catch((err) => {
            throw new BadRequestError(err.message);
        });       

export const login = (password, email) => fetch(`${base_url}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(res.status);
        })
        .then((res) => {
            if (res.token) {
                localStorage.setItem('jwt', res.token);
    
                return res;
            }
        })
        .catch(err => {
            if (err.status === 400) {
                throw new BadRequestError('Не передано одно из полей');
            } else if (err.status === 401) {
                throw new UnauthorizedError('Пользователь не найден');
            }
        
            throw Error(`Произошла ошибка: ${err.status}`);
        });

          
export const checkedToken = (token) => fetch(`${base_url}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization':`Bearer ${token}`
        },
    })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(new Error(`Произошла ошибка: ${res.status}`))
    })
    .catch((err) => {
        throw new UnauthorizedError(err.message)
    });

