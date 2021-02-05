const router = require('express').Router();
const routersCards = require('./cards.js');
const routersUsers = require('./users.js');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', routersUsers);
router.use('/cards', routersCards);
router.use('/*', (req, res, next) => {
  const error = new NotFoundError('Запрашиваемый ресурс не найден');
  next(error);
});

module.exports = router;
