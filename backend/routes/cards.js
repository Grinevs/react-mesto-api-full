const bodyParser = require('body-parser');
const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

const jsonParser = bodyParser.json();

routerCards.get('/cards', getCards);
routerCards.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(/https?:\/\/?([\S]*\.[\S]*)*/i)),
  }).unknown(true),
}),
jsonParser, createCard);
routerCards.delete('/cards/:id', deleteCard);
routerCards.put('/cards/:id/likes', addLike);
routerCards.delete('/cards/:id/likes', removeLike);

module.exports = routerCards;
