const mongoose = require('mongoose');

const { regex } = require('../utils/celebrate/celebrate');

const { ObjectId } = mongoose.Schema;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regex.test(v),
      message: 'Неверный формат',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regex.test(v),
      message: 'Неверный формат',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regex.test(v),
      message: 'Неверный формат',
    },
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
