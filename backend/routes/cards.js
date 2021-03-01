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
routerCards.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).regex(/^[0-9a-f]+$/),
  }).unknown(true),
}), deleteCard);
routerCards.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).regex(/^[0-9a-f]+$/),
  }).unknown(true),
}), addLike);
routerCards.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).regex(/^[0-9a-f]+$/),
  }).unknown(true),
}), removeLike);

module.exports = routerCards;
