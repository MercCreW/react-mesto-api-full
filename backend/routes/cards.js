const router = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard, unlikeCard,
} = require('../controllers/card');
const { validateId } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', validateId, deleteCardById);
router.put('/:cardId/likes', validateId, likeCard);
router.delete('/:cardId/likes', validateId, unlikeCard);

module.exports = router;
