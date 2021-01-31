const { Joi, celebrate } = require('celebrate');
const { errors } = require('celebrate');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/user');

const { PORT = 3000 } = process.env;
const app = express();

const allowedCors = [
  'https://iskandarov-project.students.nomoreparties.xyz',
  'http://iskandarov-project.students.nomoreparties.xyz',
  'https://www.iskandarov-project.students.nomoreparties.xyz',
  'http://www.iskandarov-project.students.nomoreparties.xyz'
];

app.use(function(req, res, next) {

  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS');
  }

  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next()
  }
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(/https?:\/\/\S+\.\S+/m),
    email: Joi.string().required().email(),
    password: Joi.string().min(8),
  }),
}), createUser); 

app.use(auth);
app.use('/', auth, routes);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные ' });
  }
  if (err.name === 'CastError') {
    return res.status(404).send({ message: 'Запрашиваемый объект не найден' });
  }
  if (err.name === 'NotFoundError') {
    return res.status(404).send({message: 'Запрашиваемый ресурс не найден'});
  }
  return res.status(500).send({ message: `'Ошибка': ${err}` });
});

app.listen(PORT, () => {

});
