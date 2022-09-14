const Movie = require('../models/movie');

const NotFoundError = require('../utils/errors/not-found');

const ForbiddenError = require('../utils/errors/forbidden');

const BadRequestError = require('../utils/errors/bad-request');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (owner !== movie.owner._id.toString()) {
        throw new ForbiddenError('У вас нет прав на удаление карточки');
      }
      return Movie.deleteOne(movie)
        .then(() => {
          res.send({ data: movie });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный запрос'));
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверный запрос'));
      } else {
        next(err);
      }
    });
};
