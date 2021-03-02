const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then(((data) => res.send(data)))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карта не найдена!');
      }
      if (String(req.user._id) === String(card.owner)) {
        Card.findByIdAndDelete(req.params.id)
          .then((delcard) => {
            if (delcard) {
              return res.send(delcard);
            }
            throw new NotFoundError('Карта не найдена!');
          })
          .catch(next);
      } else {
        throw new ForbiddenError('нет доступа!');
      }
    })
    .catch((next));
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      throw new NotFoundError('Карта не найдена');
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      throw new NotFoundError('Карта не найдена');
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
