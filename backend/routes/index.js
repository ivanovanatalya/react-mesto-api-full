// routes/cards.js
// это файл маршрутов
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { NotFoundError, URL_REGEX } = require('../middlewares/errors');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_REGEX),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.all('*', (req, res, next) => next(new NotFoundError('Неверный путь')));

module.exports = router;
