const router = require('express').Router();
const { validateCard, validateId } = require('../middlewares/validateReq');
const {
  getCards, createCard, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:cardId', validateId, deleteCard);
router.put('/:cardId/likes', validateId, addLike);
router.delete('/:cardId/likes', validateId, deleteLike);

module.exports = router;
