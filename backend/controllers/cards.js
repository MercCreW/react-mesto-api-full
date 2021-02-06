const Card = require('../models/cards');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

// gполучение всех карточек
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

// создание карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationError('Validation data FAIL!');
      }
      next(error);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав');
      }
      Card.findByIdAndRemove(req.params._id)
        .then((newCardData) => {
          res.send({ data: newCardData });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    })
    .catch(next);
};

// добавление лайка
const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(new NotFoundError('Такой карточки с таким id нет'))
    .then((like) => {
      res.send((like));
    })
    .catch(next);
};

// удаление лайка
const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Такой карточки с таким id нет'))
    .then((unlike) => {
      res.send((unlike));
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
