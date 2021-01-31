const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUserById = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: `Пользователь c id: ${req.params.id} не найден` });
        res.status(200).json({ data: user });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  } else {
    res.status(400).json({ message: 'Переданы некорректные данные' });
  }
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send( user ))
    .catch((err) => {
      if (err) {
        return next(err);
      }
    });
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).json({ data: user }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(200).json({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(400).json({ message: 'Переданы некорректные данные в методы создания пользователя' });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.updateProfileUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (!user) return res.status(404).send({ message: `Пользователь c id: ${req.user._id} не найден` });
      res.status(200).json({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidatorError' || err.name === 'CastError') {
        res.status(400).json({ message: 'Переданы некорректные данные в методы обновления профиля' });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (!user) return res.status(404).send({ message: `Пользователь c id: ${req.user._id} не найден` });
      res.status(200).json({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidatorError' || err.name === 'CastError') {
        res.status(400).json({ message: 'Переданы некорректные данные в методы обновления профиля' });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

  module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
  
    return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
          .send({
            name: user.name, about: user.about, avatar: user.avatar, email: user.email, token,
          });
      })
      .catch((err) => {
        res.status(401).send({message: err})
      });
  };
  
  userSchema.statics.findUserByCredentials = function(email, password) {
    return this.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new Error('Неправильные почта или пароль'));
            }
            return user;
          });
      });
};
