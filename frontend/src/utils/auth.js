export const BASE_URL = 'https://auth.nomoreparties.co';



// Отправляем запрос на регистрацию
export const register = (password, email) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status} `));
  });

// Отправляем запрос на авторизацию
export const authorize = (password, email) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status} `));
    })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data.token;
    }
  });

// Отправляем запрос на получение токена
export const getContent = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status} ....`));
  })
  .then((data) => data);