const routes = require('express').Router();
const NotFoundError = require('../errors/notFoundError');

routes.use('/cards', require('./cards'));
routes.use('/users', require('./users'));

routes.all('*', () => {
  throw new NotFoundError({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = routes;
