const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const routerUsers = require('express').Router();
const {
  findUserById,
  findAllUsers,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

const jsonParser = bodyParser.json();

routerUsers.get('/users', findAllUsers);
routerUsers.get('/users/me', getUserInfo);
routerUsers.get('/users/:id', findUserById);
routerUsers.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
  }).unknown(true),
}),
jsonParser, updateProfile);
routerUsers.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp(/https?:\/\/?([\S]*\.[\S]*)*/i)),
  }).unknown(true),
}),
jsonParser, updateAvatar);

module.exports = routerUsers;
