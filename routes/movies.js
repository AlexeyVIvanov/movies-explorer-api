const router = require('express').Router();

const { movieSchemaValidate, movieDeleteSchemaValidate } = require('../utils/celebrate/celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);
// создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/movies', movieSchemaValidate, createMovie);
// удаляет сохранённый фильм по id
router.delete('/movies/:movieId', movieDeleteSchemaValidate, deleteMovie);

module.exports = router;
