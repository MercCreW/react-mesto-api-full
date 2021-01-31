const mongoose = require('mongoose');

const regExp = /^https?:\/\/(www\.)?[\wа-яё\-\\._~:\\/\\?#\\[\]@!$&'\\(\\)\\*\\+,;=]+#?$/gi;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        regExp.test(v);
      },
    },
    message: 'Вы ввели неправильную ссылку на аватар',
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
