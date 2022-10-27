const { celebrate, Joi } = require('celebrate');

const validator = require('validator');

const regex = /^(https|http):\/\/(www\.)?[\w+\-._~:/?#[\]!$&'()*+,;=]+\.[a-z/]{2,}$/i;

const userSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const profileSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const movieSchemaValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regex),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Неверный формат');
    }),
    thumbnail: Joi.string().required().pattern(regex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieDeleteSchemaValidate = celebrate({
  params: Joi.object().keys({
    /* movieId: Joi.string().length(24).hex().required(), */
    movieId: Joi.string().required(),
  }),
});

module.exports = {
  userSchemaValidate,
  loginValidate,
  profileSchemaValidate,
  movieSchemaValidate,
  movieDeleteSchemaValidate,
  regex,
};
