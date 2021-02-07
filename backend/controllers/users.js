const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/ConflictError');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

// получение всех юзеров
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const checkToken = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new AuthError('Вы не авторизированы'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: 'Нет пользователя с таким id' });
    })
    .then((user) => res.send(user))
    .catch(next);
};
  
//     .then((user) => {
//       if (!user) {
//         throw new NotFoundError('Пользователь не найден');
//       } return res.status(200).send(user);
//     })
//     .catch((error) => {
//       if (error.kind === 'ObjectId') {
//         throw new ValidationError('Нет корректного id');
//       }
//       next(error);
//     });
// };

// создание пользователя
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(200).send({ message: `Пользователь ${user} создан` });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Введены некорректные данные');
      }
      if (err.code === 11000 && err.name === 'MongoError') {
        throw new ConflictError('Данный email уже зарегистрирован');
      }
      throw err;
    })
    .catch(next);
};

// логин пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
      console.log(token);
    })
    .catch(next);
};

// обновление аватара
const editAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => new NotFoundError({ message: 'Нет пользователя с таким id' }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new ValidationError({ message: `Указаны некорректные данные: ${err.message}` });
    })
    .then((userAvatar) => {
      res.send((userAvatar));
    })
    // .catch((error) => {
    //   if (error.name === 'ValidationError') {
    //     throw new ValidationError('Введены некорректные денные');
    //   }
    //   throw error;
    // })
    .catch(next);
};

// обновление данных пользователя
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => new NotFoundError({ message: 'Нет пользователя с таким id' }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new ValidationError({ message: `Указаны некорректные данные: ${err.message}` });
    })
    .then((user) => {
      res.status(200).send((user));
    })
    // .catch((error) => {
    //   if (error.name === 'ValidationError') {
    //     throw new ValidationError('Введены некорректные денные');
    //   }
    //   throw error;
    // })
    .catch(next);
};

module.exports = {
  getUsers,
  createUser,
  login,
  editAvatar,
  updateProfile,
  getUserById,
  checkToken,
};
