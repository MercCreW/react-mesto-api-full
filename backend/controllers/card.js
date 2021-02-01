const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.deleteCardById = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    Card.findById(req.params.id)

      .then((card) => {
        if (!card) {
          throw new NotFoundError(`Карточка с id: ${req.params.cardId} отсутствует`);
        }
        if (card.owner.toString() !== req.user._id) {
          throw new ForbiddenError({ message: 'Отсутствуют права на совершение действия' });
        }

        Card.deleteOne(req.params._id)
          .then((removedCard) => res.send(removedCard));
      })
      .catch(next);
  }
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Переданы некорректные данные в методы создания карточки');
      }

      return res.send(card);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          throw new NotFoundError(`Карточка с id: ${req.params.cardId} отсутствует`);
        }
        return res.send(card);
      })
      .catch(next);
  }
};

module.exports.unlikeCard = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
      .then((card) => {
        if (!card) {
          throw new NotFoundError(`Карточка с id: ${req.params.cardId} отсутствует`);
        }
        return res.send(card);
      })
      .catch(next);
  }
};
