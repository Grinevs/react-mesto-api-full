/* eslint-disable quote-props */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AlreadyExistError = require('../errors/already-exist-error');
const AuthError = require('../errors/auth-error');

const getUserInfo = (req, res, next) => {
  console.log('sdsds');
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError('Юзер не найден');
    })
    .catch((next));
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  User.findOne({ email }).then(() => {
    throw new AlreadyExistError('Пользователь уже существует');
  })
    .catch((next));
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.send({
      name, about, avatar, email,
    }))
    .catch((next));
};

const findAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((next));
};

const findUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError('Юзер не найден');
    })
    .catch((next));
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  // eslint-disable-next-line no-unused-expressions
  (name && about)
    ? User.findByIdAndUpdate(req.user._id, { name, about },
      {
        new: true,
        runValidators: true,
      })
      .then((user) => {
        if (user) {
          return res.send(user);
        }
        throw new NotFoundError('Юзер не найден');
      })
      .catch((next)) : res.status(400).send({ message: 'ошибка валидации' });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => res.send({ data: user }))
    .catch((next));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let userId;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new AuthError('Неправильные почта или пароль');
      }
      const token = jwt.sign(
        { _id: userId },
        'somekey',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((next));
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  updateProfile,
  updateAvatar,
  login,
  getUserInfo,
};
