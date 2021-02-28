const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const routerUsers = require('./routes/users.js');
const routerCards = require('./routes/cards.js');
const auth = require('./middlewares/auth.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  createUser,
  login,
} = require('./controllers/users');

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

const app = express();

const urls = ['http://ggg.students.nomoredomains.icu', 'http://www.ggg.students.nomoredomains.icu', 'http://localhost:3000'];

app.use(cors({
  origin: urls,
  credentials: true,
}));

const jsonParser = bodyParser.json();

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }).unknown(true),
}),
jsonParser, createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }).unknown(true),
}),
jsonParser, login);

app.use('/', auth, routerUsers);
app.use('/', auth, routerCards);

app.use(errorLogger);

app.use((req, res, next) => {
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден',
    url: req.url,
  });
  next();
});

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log('слушаем http://localhost:3000');
});
