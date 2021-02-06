const router = require('express').Router();
const { validateCard, validateId } = require('../middlewares/validateReq');
const {
  getCards, createCard, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:_id', validateId, deleteCard);
router.put('/:_id/likes', validateId, addLike);
router.delete('/:_id/likes', validateId, deleteLike);

module.exports = router;
