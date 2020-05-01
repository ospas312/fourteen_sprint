const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Cards not found' }));
};
module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Card not create' }));
};
module.exports.delCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: 'Not found card id' });
      }
    })
    .catch(() => res.status(404).send({ message: 'Card not id' }));
};

module.exports.addCardLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new Error();
    })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Card not id' }));
};

module.exports.delCardLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new Error();
    })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Card not id' }));
};
