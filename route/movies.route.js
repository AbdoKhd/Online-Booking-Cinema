var express = require("express");
var router = express.Router();

const movies = require('../controllers/movies.controller');

router.get('/movies', movies.getMovies);
router.get('/movie', movies.getMovie);
router.get('/search', movies.getSearch);
router.get('/find', movies.getFind);
router.get('/pay', movies.getPay);

module.exports = router;