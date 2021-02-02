const cors = require('cors');

const { Joi, celebrate } = require('celebrate');
const { errors } = require('celebrate');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { corsConfig } = require('./middlewares/cors');
const routes = require('./routes');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/user');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('*', cors(corsConfig));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(/https?:\/\/\S+\.\S+/m),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(auth);
app.use('/', routes);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode, message } = err;

  if (statusCode) {
    return res.status(statusCode).send({ message });
  }

  return next();
});

app.use((req, res) => res.status(500).send({ message: 'Технические проблеме на сервере.' }));

app.listen(PORT, () => {

});
