const routes = require('express').Router();

routes.use('/cards', require('./cards'));
routes.use('/users', require('./users'));

routes.all('*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = routes;
